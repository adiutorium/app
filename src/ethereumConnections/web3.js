/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */
import Web3 from 'web3'
import { get3BoxProfileForAddress } from './3BoxHelper'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config'

let web3
let OWN_ADDRESS
let CONTRACT

// Token Contract 0xc2c65e3a70be4576e97938c944719ebc4f1569b4

export function connectToMetamask() {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      window.ethereum
        .enable()
        .then(address => {
          // eslint-disable-next-line prefer-destructuring
          OWN_ADDRESS = address[0]
          web3 = new Web3(window.ethereum)
          return get3BoxProfileForAddress(OWN_ADDRESS, window.ethereum)
        })
        .then(() => {
          connectToContracts(resolve)
        })
        .catch(reject)
    } else if (!window.web3) {
      alert('Install Metamask')
      reject()
    } else if (window.web3.accounts[0].length !== 0) {
      web3 = new Web3(window.web3.currentProvider)
      // eslint-disable-next-line prefer-destructuring
      OWN_ADDRESS = web3.accounts[0]
      get3BoxProfileForAddress(OWN_ADDRESS, window.web3.currentProvider).then(() => {
        connectToContracts(resolve)
      })
    }
  })
}

const connectToContracts = resolve => {
  CONTRACT = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
  console.log(CONTRACT)
  resolve()
}

export const sendTransaction = (functionName, txHashCallBack, ...args) => {
  return new Promise((resolve, reject) => {
    CONTRACT.methods[functionName](...args)
      .send({ from: OWN_ADDRESS })
      .on('transactionHash', function(hash) {
        txHashCallBack(hash)
      })
      .on('receipt', function(receipt) {
        resolve(receipt)
      })
      .on('error', reject)
  })
}

export const callTransaction = (functionName, ...args) => {
  return new Promise((resolve, reject) => {
    CONTRACT.methods[functionName](...args)
      .call({ from: OWN_ADDRESS })
      .then(resolve)
      .catch(reject)
  })
}
