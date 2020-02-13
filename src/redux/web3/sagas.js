import { all, call } from 'redux-saga/effects'
import { initiateEthereumConnection } from '../../ethereumConnections/web3'
// import { notification } from 'antd'

export function* CONNECT_WEB3() {
  yield call(initiateEthereumConnection())
}

// export function* LOGOUT() {
//   yield call(logout)
//   yield put({
//     type: 'user/SET_STATE',
//     payload: {
//       id: '',
//       name: '',
//       role: '',
//       email: '',
//       avatar: '',
//       authorized: false,
//       loading: false,
//     },
//   })
// }

export default function* rootSaga() {
  yield all([
    // takeEvery(actions.LOGIN, LOGIN),
    // takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    // takeEvery(actions.LOGOUT, LOGOUT),
    // LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
