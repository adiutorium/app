import { all, call } from 'redux-saga/effects'
import { initiateEthereumConnection } from '../../ethereumConnections/web3'
// import { notification } from 'antd'

export function* CONNECT_WEB3() {
  yield call(initiateEthereumConnection, [true])
}

export default function* rootSaga() {
  yield all([CONNECT_WEB3()])
}
