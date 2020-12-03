import {
	CalcObjectBuilder,
	calcPropertyFactory,
	connectorFactory,
	deepSubscriber,
	IDeSerializeValue,
	IObservable,
	ISerializable,
	ISerializedObject,
	ISerializeValue,
	ISubscriber,
	IUnsubscribe,
	ObservableClass,
	registerSerializable,
	resolvePath,
} from 'webrain'
import {IBrain} from './contracts'
import {MainWindow} from './view/MainWindow'

export class Brain extends ObservableClass implements IBrain, ISerializable {
	// region readable

	public readonly mainWindow: MainWindow

	// endregion

	// region writable

	// endregion

	// region calculable

	// endregion

	// region ISerializable

	public static uuid: string = '17a06236d0804f5eaf55dcad8e9a0628'

	public serialize(serialize: ISerializeValue): ISerializedObject {
		return {
			// auth: serialize(this.auth, { objectKeepUndefined: false }),
		}
	}

	public deSerialize(
		deSerialize: IDeSerializeValue,
		serializedValue: ISerializedObject,
	) {
		// deSerialize(serializedValue.auth, null, {
		// 	valueFactory: () => this.auth,
		// })
	}

	// endregion
}

registerSerializable(Brain)

new CalcObjectBuilder(Brain.prototype)
	.readable('mainWindow', {
		factory() { return new MainWindow() },
	})
