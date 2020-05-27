/* tslint:disable:no-var-requires */
import {init} from '../init'
const { app } = require('electron')
import appConfig from '../../../../../../configs/debug'

init(app, appConfig, () => `http://192.168.0.102:${appConfig.sapper.port}/app/`)
