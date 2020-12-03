import {IObservable, ISubject, Subject} from 'webrain'
import {
	IApi,
	IApiRequest,
	IApiRequestArgs,
	IApiResponse,
	INetworkEvent,
	NetworkEventType,
} from './contracts/api'
import {HttpDataType, IHttpClient, NetworkErrorType} from './contracts/http'
import {toFormData, toFormUrlEncoded} from './helpers'
import {NetworkError} from './NetworkError'
import urlJoin from 'url-join'

export interface IApiConstructorArgs {
	urlBase?: string,
	httpClient: IHttpClient,
}

export class Api<TError> implements IApi<TError> {
	public readonly urlBase: string
	public readonly httpClient: IHttpClient
	public timeout: number

	constructor({
		urlBase,
		httpClient,
	}: IApiConstructorArgs) {
		this.urlBase = urlBase
		this.httpClient = httpClient
	}

	private _isBadConnection: boolean = false
	public get isBadConnection(): boolean {
		return this._isBadConnection
	}
	public set isBadConnection(value: boolean) {
		if (this._isBadConnection === value) {
			return
		}
		this._isBadConnection = value
	}

	// region networkEventObservable

	private _networkEventSubject: ISubject<INetworkEvent> = new Subject()

	public get networkEventObservable(): IObservable<INetworkEvent> {
		return this._networkEventSubject
	}

	// endregion

	protected prepareRequest(request: IApiRequest): void {
		if (request.method !== 'GET' && (request.data || request.dataType)) {
			switch (request.dataType) {
				case HttpDataType.FormUrlEncoded:
					request.data = toFormUrlEncoded(request.data)
					request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
					break
				case HttpDataType.MultipartFormData:
					request.data = toFormData(request.data)
					// request.headers['Content-Type']
					// 	= 'multipart/form-data; boundary="d0987012-5c8b-471d-b79b-81fabac23628"'
					break
				case HttpDataType.Json:
					request.data = JSON.stringify(request.data)
					request.headers['Content-Type'] = 'application/json; charset=UTF-8'
					break
				default:
					throw new Error('Unknown dataType: ' + request.dataType)
			}
		}

		switch (request.responseDataType) {
			case HttpDataType.String:
				request.headers.Accept = 'text/plain'
				break
			case HttpDataType.Json:
				request.headers.Accept = 'application/json'
				break
			default:
				throw new Error('Unknown dataType: ' + request.responseDataType)
		}

		if (this.urlBase) {
			request.url = urlJoin(this.urlBase, request.url)
		}
	}

	public async sendRequest<TResult>({
		request,
		errorHandler,
		resultHandler,
	}: IApiRequestArgs<TResult, TError>): Promise<IApiResponse<TResult, TError>> {
		let response
		try {
			request = {
				...request,
				headers: {},
			}
			this.prepareRequest(request)

			response = await this.httpClient.sendRequest(request)

			this.isBadConnection = false

			if (response.statusCode !== 200) {
				throw new NetworkError({
					message: `statusCode(${response.statusCode}) !== 200`,
					request,
					response,
				})
			}

			this._networkEventSubject.emit({
				type: NetworkEventType.Success,
				data: {
					fromBaseUrl: request.url.toLowerCase().startsWith((this.urlBase || '').toLowerCase()),
					request,
					response,
				},
			})

			let result
			// eslint-disable-next-line default-case
			switch (request.responseDataType) {
				case HttpDataType.Json:
					result = JSON.parse(response.data)
					break
			}

			const apiResult = {
				result,
			}

			if (resultHandler) {
				resultHandler(apiResult)
			}

			return apiResult
		} catch (err) {
			if (!(err instanceof NetworkError)) {
				console.error('Api unknown error', err, request, response)
				throw err
			}

			if (err.errorType === NetworkErrorType.BadConnection) {
				this.isBadConnection = true

				const apiError = {
					networkError: err,
				}

				const errorHandled = errorHandler && errorHandler(apiError)
				if (errorHandled !== true) {
					// console.error('Api error', err, request)
					// tslint:disable-next-line:no-collapsible-if
					if (errorHandled == null) {
						this._networkEventSubject.emit({
							type: NetworkEventType.Error,
							data: err,
						})
					}
				}

				return {
					error: apiError,
				}
			}

			this.isBadConnection = false

			let data = err.response && err.response.data
			if (typeof data === 'string') {
				try {
					data = JSON.parse(data)
				} catch {
					// empty
				}
			}

			{
				const apiError = {
					apiError    : data,
					networkError: err,
				}

				const errorHandled = errorHandler && errorHandler(apiError)
				if (errorHandled !== true) {
					console.error('Api error', err, request)
					if (errorHandled == null) {
						this._networkEventSubject.emit({
							type: NetworkEventType.Error,
							data: err,
						})
					}
				}

				return {
					error: apiError,
				}
			}
		}
	}
}
