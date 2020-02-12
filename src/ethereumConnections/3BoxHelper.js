/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */
import Box from '3box'
import { BoxAppName } from './config'

let BOX
let SPACE

export const get3BoxProfileForAddress = (address, ethereumProvider) => {
  return new Promise((resolve, reject) => {
    Box.openBox(address, ethereumProvider)
      .then(_box => {
        BOX = _box
        return BOX.syncDone
      })
      .then(() => {
        return BOX.openSpace(BoxAppName)
      })
      .then(_space => {
        SPACE = _space
        return SPACE.syncDone
      })
      .then(() => resolve())
      .catch(reject)
  })
}

export const addPublicProfileDataForSelf = (key, value) => {
  value = JSON.stringify(value)
  return new Promise((resolve, reject) => {
    BOX.public
      .set(key, value)
      .then(resolve)
      .catch(reject)
  })
}

export const addPrivateProfileDataForSelf = (key, value) => {
  value = JSON.stringify(value)
  return new Promise((resolve, reject) => {
    BOX.private
      .set(key, value)
      .then(resolve)
      .catch(reject)
  })
}

export const addPublicAppDataForSelf = (key, value) => {
  return new Promise((resolve, reject) => {
    value = JSON.stringify(value)
    SPACE.public
      .set(key, value)
      .then(resolve)
      .catch(reject)
  })
}

export const addPrivateAppDataForSelf = (key, value) => {
  return new Promise((resolve, reject) => {
    value = JSON.stringify(value)
    SPACE.private
      .set(key, value)
      .then(resolve)
      .catch(reject)
  })
}

export const getPublicProfileDataForSelf = key => {
  return new Promise((resolve, reject) => {
    BOX.public
      .get(key)
      .then(value => resolve(JSON.parse(value)))
      .catch(reject)
  })
}

export const getPrivateProfileDataForSelf = key => {
  return new Promise((resolve, reject) => {
    BOX.private
      .get(key)
      .then(value => resolve(JSON.parse(value)))
      .catch(reject)
  })
}

export const getPublicAppDataForSelf = key => {
  return new Promise((resolve, reject) => {
    SPACE.public
      .get(key)
      .then(value => resolve(JSON.parse(value)))
      .catch(reject)
  })
}

export const getPrivateAppDataForSelf = key => {
  return new Promise((resolve, reject) => {
    SPACE.private
      .get(key)
      .then(value => resolve(JSON.parse(value)))
      .catch(reject)
  })
}

export const getAllPrivateProfileDataForSelf = () => {
  return new Promise((resolve, reject) => {
    BOX.private
      .all()
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}

export const getAllPublicProfileDataForSelf = () => {
  return new Promise((resolve, reject) => {
    BOX.public
      .all()
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}

export const getAllPrivateAppDataForSelf = () => {
  return new Promise((resolve, reject) => {
    SPACE.private
      .all()
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}

export const getAllPublicAppDataForSelf = () => {
  return new Promise((resolve, reject) => {
    SPACE.public
      .all()
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}

export const getPublicProfileForOthers = ethereumAddress => {
  return new Promise((resolve, reject) => {
    BOX.getProfile(ethereumAddress)
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}

export const getPublicAppForOthers = ethereumAddress => {
  return new Promise((resolve, reject) => {
    BOX.getSpace(ethereumAddress, BoxAppName)
      .then(data => {
        delete data.proof_did
        const dataKeys = Object.keys(data)
        const rv = {}
        dataKeys.forEach(key => {
          rv[key] = JSON.parse(data[key])
        })
        resolve(rv)
      })
      .catch(reject)
  })
}
