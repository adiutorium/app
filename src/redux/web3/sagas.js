import { all, call, put } from 'redux-saga/effects'
import { getCampaigns, initiateEthereumConnection } from '../../ethereumConnections/web3'
// import { notification } from 'antd'

// function* ADD_CAMPAIGN_TO_LIST_FOR_USER(campaign){
//   console.log("camp ==============",campaign)
//   yield put({
//     type: "campaigns/ADD_CAMPAIGN_TO_LIST_FOR_USER",
//     payload: {campaign}
//   })
// }

export function* CONNECT_WEB3() {
  yield put({
    type: 'campaigns/SET_STATE',
    payload: { loading: true },
  })
  yield call(initiateEthereumConnection, [true])
  // TODO - add campaigns one by one using callback
  const campaignList = yield call(getCampaigns, x => console.log(x))
  yield put({
    type: 'campaigns/SET_CAMPAIGNS_FOR_USER',
    payload: { campaignList },
  })
  yield put({
    type: 'campaigns/SET_STATE',
    payload: { loading: false },
  })
  yield put({
    type: 'user/LOAD_CURRENT_ACCOUNT',
  })
}

export default function* rootSaga() {
  yield all([CONNECT_WEB3()])
}
