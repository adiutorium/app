import { all, takeEvery, put, call } from 'redux-saga/effects'
import { notification } from 'antd'
// import { logout } from 'services/user'
import actions from './actions'
import {
  getPublicAppForOthers,
  getPublicProfileForOthers,
} from '../../ethereumConnections/3BoxHelper'
import { getUserAddress } from '../../ethereumConnections/web3'

// import { Redirect } from 'react-router-dom'

export function* LOGIN({ payload }) {
  const { name } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  // const success = yield call(login, email, password)
  if (name) {
    notification.success({
      message: 'Logged In',
      description: 'You have successfully logged in using 3Box',
    })

    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
  }
}


export function* LOAD_CURRENT_ACCOUNT() {
  console.log("LOAD_CURRENT_ACCOUNT called ========================================")
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })

  const currentUserAddr = yield call(getUserAddress)
  const profile = yield call(getPublicProfileForOthers, currentUserAddr)
  const appData = yield call(getPublicAppForOthers, currentUserAddr)
  console.log(profile)
  if (profile.name) {

    console.log(profile)
    const payload = {
      id: profile.name,
      avatar: `https://ipfs.io/ipfs/${profile.image[0].contentUrl['/']}` || '',
      name: profile.name,
      role: 'admin',
      userType: appData.userType,
      authorized: true,
    }

    yield put({
      type: 'user/SET_STATE',
      payload,
    })
  } else {
    yield put({
      type: 'user/SET_STATE',
      payload: { authorized: false },
    })
  }

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    // LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
  ])
}
