/* tslint:disable:no-var-requires */
import {init} from '../init'
const { app } = require('electron')
import appConfig from '../../../../../../configs/debug'
import path from 'path'

init(app, appConfig, () => path.join(`http://192.168.0.102:${appConfig.sapper.port}/`, appConfig.sapper.baseUrl))
