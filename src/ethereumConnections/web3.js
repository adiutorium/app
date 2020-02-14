/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { get3BoxProfileForAddress } from './3BoxHelper'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './config'

let web3
let OWN_ADDRESS
let CONTRACT

// Token Contract 0xc2c65e3a70be4576e97938c944719ebc4f1569b4

export function initiateEthereumConnection(isMetamask) {
  return new Promise((resolve, reject) => {
    if (isMetamask) {
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
    } else {
      connectToWalletConnect()
        .then(walletConnectWeb3 => {
          web3 = walletConnectWeb3
          return web3.eth.getAccounts()
        })
        .then(accounts => {
          // eslint-disable-next-line prefer-destructuring
          OWN_ADDRESS = accounts[0]
          return get3BoxProfileForAddress(OWN_ADDRESS, web3.currentProvider)
        })
        .catch(e => console.log(e))
        .then(() => {
          console.log('here')
          connectToContracts(resolve)
        })
        .catch(e => console.log(e))
    }
  })
}

const connectToWalletConnect = async () => {
  //  Create WalletConnect Provider
  const provider = new WalletConnectProvider({
    infuraId: 'ZWXhYfP2uIvdg1yKuQNY',
  })

  //  Enable session (triggers QR Code modal)
  await provider.enable()

  //  Create Web3
  const innerWeb3 = new Web3(provider)

  watchEvents(provider)
  return innerWeb3
}

const watchEvents = provider => {
  // Subscribe to accounts change
  provider.on('accountsChanged', accounts => {
    console.log(accounts)
  })

  // Subscribe to chainId change
  provider.on('chainChanged', chainId => {
    console.log(chainId)
  })

  // Subscribe to networkId change
  provider.on('networkChanged', networkId => {
    console.log(networkId)
  })

  // Subscribe to session connection/open
  provider.on('open', () => {
    console.log('open')
  })

  // Subscribe to session disconnection/close
  provider.on('close', (code, reason) => {
    console.log(code, reason)
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

export const startCampaign = (
  donationTimeinSeconds,
  spendTimeInSeconds,
  requiredDonationAmount,
  supportingDocumentsKey,
  campaignType,
  campaignName,
  transactionHashCallBack,
) => {
  return sendTransaction(
    'startCampaign',
    transactionHashCallBack,
    donationTimeinSeconds,
    spendTimeInSeconds,
    requiredDonationAmount,
    supportingDocumentsKey,
    campaignType,
    campaignName,
  )
}

export const getCampaigns = campaignFoundCallback => {
  return new Promise((resolve, reject) => {
    console.log(campaignFoundCallback)
    callTransaction('getMyCampaigns')
      .then(campaignIds => {
        const promises = []
        const retValArray = []
        campaignIds = campaignIds.map(e => parseInt(e, 10))
        campaignIds.forEach(id => {
          promises.push(
            callTransaction('getCampaign', id)
              .then(campaignDetail => {
                const retValObject = {
                  campaignName: campaignDetail.campaignName,
                  ownerAddress: campaignDetail.owner,
                  supportingDocumentsKey: campaignDetail.supportingDocuments,
                  totalDonationSpecific: parseInt(campaignDetail.totalDonations[0], 10),
                  totalDonationOpen: parseInt(campaignDetail.totalDonations[1], 10),
                  donationEndTime: parseInt(campaignDetail.times[0], 10),
                  spendingEndTime: parseInt(campaignDetail.times[1], 10),
                  requiredDonation: parseInt(campaignDetail.requiredDonation, 10),
                  campaignType: campaignDetail.campaignType,
                  donorAddressesOpen: campaignDetail.donorsOpen,
                  donorAddressesSpecific: campaignDetail.donors,
                }
                retValArray.push(retValObject)
                campaignFoundCallback(retValObject)
              })
              .catch(reject),
          )
        })
        Promise.all(promises)
          .then(() => resolve(retValArray))
          .catch(reject)
      })
      .catch(reject)
  })
}
