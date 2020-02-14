import { all, call } from 'redux-saga/effects'
import { getCampaigns, initiateEthereumConnection } from '../../ethereumConnections/web3'
// import { notification } from 'antd'

export function* CONNECT_WEB3() {
  yield call(initiateEthereumConnection, [true])
  const y = yield call(getCampaigns, x => console.log(x))
  console.log(y)
}

export default function* rootSaga() {
  yield all([CONNECT_WEB3()])
}
