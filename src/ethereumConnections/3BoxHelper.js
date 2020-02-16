/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */
import Box from '3box'
import { BoxAppName } from './config'

let BOX
let SPACE

export const get3BoxProfileForAddress = async (address, ethereumProvider) => {
  BOX = await Box.openBox(address, ethereumProvider);
  await BOX.syncDone;
  SPACE = await BOX.openSpace(BoxAppName);
  await SPACE.syncDone;
  return true;
}

// export const get3BoxProfileForAddress = async (address, ethereumProvider) => {
//   return new Promise((resolve, reject) => {
//     Box.openBox(address, ethereumProvider)
//       .then(_box => {
//         console.log(address,ethereumProvider, "abcedfgh")
//         BOX = _box
//         return BOX.syncDone
//       })
//       .then(() => {
//         return BOX.openSpace(BoxAppName)
//       })
//       .then(_space => {
//         SPACE = _space
//         return SPACE.syncDone
//       })
//       .then(resolve)
//       .catch(reject)
//   })
// }

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
  // campaign_<campaign_name>_<file-number>
  // campaign_<campaign_name>
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
      .then(value => {
        resolve(JSON.parse(value))
      })
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

export const getPublicAppDataWithKey = (ethereumAddress, key) => {
  return new Promise((resolve, reject) => {
    Box.getSpace(ethereumAddress, BoxAppName)
      .then(data => {
        if (data[key]) {
          resolve(JSON.parse(data[key]))
        } else {
          resolve({})
        }
      })
      .catch(reject)
  })
}

export const getPublicProfileForOthers = ethereumAddress => {
  console.log("inside getPublicProfileForOthers", ethereumAddress)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Box.getProfile(ethereumAddress)
        .then(data => {
          resolve(data)
        })
        .catch(reject)
    }, 2000)

    // BOX.onSyncDone(syncDone =>{
    //   console.log(syncDone)
    //
    // })
  })
}

export const getPublicAppForOthers = ethereumAddress => {
  return new Promise((resolve, reject) => {
    Box.getSpace(ethereumAddress, BoxAppName)
      .then(data => {
        resolve(data)
      })
      .catch(reject)
  })
}

export const addPublicAppFile = (key, file) => {
  return readFileDataAsBase64(file).then(url => {
    console.log('url====', url)
    return addPublicAppDataForSelf(key, url)
  })
}

function readFileDataAsBase64(e) {
  const file = e

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      resolve(event.target.result)
    }
    reader.onerror = err => {
      reject(err)
    }
    reader.readAsDataURL(file)
  })
}

export function getBox() {
  return BOX
}

export function getSpace() {
  return SPACE
}
