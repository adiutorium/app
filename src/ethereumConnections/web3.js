/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { get3BoxProfileForAddress } from './3BoxHelper'
import {
  GO_FUND_ME_CONTRACT_ABI,
  GO_FUND_ME_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ABI,
  TOKEN_CONTRACT_ADDRESS,
} from './config'

let web3
let OWN_ADDRESS
let GO_FUND_ME_CONTRACT
let TOKEN_CONTRACT

// Token Contract 0xaf6d060a29e3dfdcdd3e09c9518e5e74ece8ed26

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
            console.log(
              'initiateEthereumConnection initiateEthereumConnection initiateEthereumConnection',
            )
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
  GO_FUND_ME_CONTRACT = new web3.eth.Contract(GO_FUND_ME_CONTRACT_ABI, GO_FUND_ME_CONTRACT_ADDRESS)
  TOKEN_CONTRACT = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS)
  resolve()
}

export const sendTransactionGoFundMe = (functionName, txHashCallBack, ...args) => {
  return new Promise((resolve, reject) => {
    GO_FUND_ME_CONTRACT.methods[functionName](...args)
      .send({ from: OWN_ADDRESS, gas: 0 })
      .on('transactionHash', function(hash) {
        if (txHashCallBack) {
          txHashCallBack(hash)
        }
      })
      .on('receipt', function(receipt) {
        resolve(receipt)
      })
      .on('error', reject)
  })
}

export const callTransactionGoFundMe = (functionName, ...args) => {
  return new Promise((resolve, reject) => {
    GO_FUND_ME_CONTRACT.methods[functionName](...args)
      .call({ from: OWN_ADDRESS })
      .then(resolve)
      .catch(reject)
  })
}

export const sendTransactionTokenContract = (functionName, txHashCallBack, ...args) => {
  return new Promise((resolve, reject) => {
    TOKEN_CONTRACT.methods[functionName](...args)
      .send({ from: OWN_ADDRESS, gas: 0 })
      .on('transactionHash', function(hash) {
        if (txHashCallBack) {
          txHashCallBack(hash)
        }
      })
      .on('receipt', function(receipt) {
        resolve(receipt)
      })
      .on('error', reject)
  })
}

export const callTransactionTokenContract = (functionName, ...args) => {
  return new Promise((resolve, reject) => {
    TOKEN_CONTRACT.methods[functionName](...args)
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
  return sendTransactionGoFundMe(
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
    callTransactionGoFundMe('getMyCampaigns')
      .then(campaignIds => {
        const promises = []
        const retValArray = []
        campaignIds = campaignIds.map(e => parseInt(e, 10))
        campaignIds.forEach(id => {
          promises.push(
            callTransactionGoFundMe('getCampaign', id)
              .then(campaignDetail => {
                const retValObject = {
                  campaignName: campaignDetail.campaignName,
                  ownerAddress: campaignDetail.owner,
                  supportingDocumentsKey: campaignDetail.supportingDocuments,
                  totalDonationSpecific: parseInt(campaignDetail.totalDonations[0], 10),
                  totalDonationOpen: parseInt(campaignDetail.totalDonations[1], 10),
                  totalSpentSpecific: parseInt(campaignDetail.totalDonations[2], 10),
                  totalSpentOpen: parseInt(campaignDetail.totalDonations[3], 10),
                  donationEndTime: parseInt(campaignDetail.times[0], 10),
                  spendingEndTime: parseInt(campaignDetail.times[1], 10),
                  requiredDonation: parseInt(campaignDetail.requiredDonation, 10),
                  campaignType: campaignDetail.campaignType,
                  donorAddressesOpen: campaignDetail.donorsOpen,
                  donorAddressesSpecific: campaignDetail.donors,
                  id,
                }
                retValArray.push(retValObject)
                if (campaignFoundCallback) {
                  campaignFoundCallback(retValObject)
                }
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

export const getCampaignDetails = campaignIndex => {
  return new Promise((resolve, reject) => {
    callTransactionGoFundMe('getCampaign', campaignIndex)
      .then(campaignDetail => {
        const retValObject = {
          campaignName: campaignDetail.campaignName,
          ownerAddress: campaignDetail.owner,
          supportingDocumentsKey: campaignDetail.supportingDocuments,
          totalDonationSpecific: parseInt(campaignDetail.totalDonations[0], 10),
          totalDonationOpen: parseInt(campaignDetail.totalDonations[1], 10),
          totalSpentSpecific: parseInt(campaignDetail.totalDonations[2], 10),
          totalSpentOpen: parseInt(campaignDetail.totalDonations[3], 10),
          donationEndTime: parseInt(campaignDetail.times[0], 10),
          spendingEndTime: parseInt(campaignDetail.times[1], 10),
          requiredDonation: parseInt(campaignDetail.requiredDonation, 10),
          campaignType: campaignDetail.campaignType,
          donorAddressesOpen: campaignDetail.donorsOpen,
          donorAddressesSpecific: campaignDetail.donors,
        }
        resolve(retValObject)
      })
      .catch(reject)
  })
}

export const donateTokens = (campaignIndex, amount, isOpen, transactionHashCallback) => {
  return new Promise((resolve, reject) => {
    console.log(amount)
    callTransactionTokenContract('allowance', OWN_ADDRESS, GO_FUND_ME_CONTRACT_ADDRESS)
      .then(allowance => {
        let promise
        if (allowance >= amount) {
          promise = Promise.resolve()
        } else {
          promise = sendTransactionTokenContract(
            'approve',
            () => {},
            GO_FUND_ME_CONTRACT_ADDRESS,
            amount,
          )
        }
        return promise
      })
      .then(() => {
        return sendTransactionGoFundMe(
          'donateTokens',
          transactionHashCallback,
          campaignIndex,
          amount,
          isOpen,
        )
      })
      .then(resolve)
      .catch(reject)
  })
}

export const getDonation = (campaignIndex, donorAddress) => {
  return new Promise((resolve, reject) => {
    callTransactionGoFundMe('getDonation', campaignIndex, donorAddress || OWN_ADDRESS)
      .then(donationAmounts => {
        resolve({
          openDonation: donationAmounts.amountOpen,
          specificDonation: donationAmounts.amount,
        })
      })
      .catch(reject)
  })
}

export const spendDonations = (
  campaignIndex,
  toAddress,
  amount,
  extraDataOn3Box,
  isOpen,
  txHashCallback,
) => {
  console.log(campaignIndex, toAddress, amount, extraDataOn3Box, isOpen)
  return sendTransactionGoFundMe(
    'spendDonations',
    txHashCallback,
    campaignIndex,
    toAddress,
    amount,
    extraDataOn3Box,
    isOpen,
  )
}

export const getOrganisationAddresses = () => {
  return callTransactionGoFundMe('getVerifiedAccounts')
}

export const getApprovalRequests = approvalRequestCallback => {
  return new Promise((resolve, reject) => {
    const rv = []
    callTransactionGoFundMe('getTotalApprovalRequests')
      .then(numberOfRequests => {
        const promises = []
        for (let i = numberOfRequests - 1; i >= 0; i -= 1) {
          promises.push(
            callTransactionGoFundMe('getApprovalRequestDetail', i).then(detail => {
              const rvObject = {
                amount: detail.amount,
                approved: detail.approved,
                extraDataOn3Box: detail.spendReceipt,
                campaignId: detail.campaignId,
                senderAddress: detail.senderAddress,
                requestId: i,
              }
              rv.push(rvObject)
              if (approvalRequestCallback) {
                approvalRequestCallback(rvObject)
              }
            }),
          )
        }
        return Promise.all(promises)
      })
      .then(() => {
        resolve(rv)
      })
      .catch(reject)
  })
}

export const approveToGetTokens = (approvalRequestId, txHashCallBack) => {
  return sendTransactionGoFundMe('approveExpense', txHashCallBack, approvalRequestId)
}

export const getSpending = campaignId => {
  return new Promise((resolve, reject) => {
    const types = []
    callTransactionGoFundMe('getNumberOfSpendings', campaignId)
      .then(spendings => {
        const numSpecificSpent = spendings.numSpendings
        const numOpenSpent = spendings.numSpendingsOpen
        const promises = []
        for (let i = 0; i < numOpenSpent; i += 1) {
          types.push(true)
          promises.push(callTransactionGoFundMe('getSpendingDetail', campaignId, i, true))
        }
        for (let i = 0; i < numSpecificSpent; i += 1) {
          types.push(false)
          promises.push(callTransactionGoFundMe('getSpendingDetail', campaignId, i, false))
        }
        return Promise.all(promises)
      })
      .then(spendingDetails => {
        spendingDetails = spendingDetails.map((spending, index) => {
          return {
            index,
            amount: spending.amount,
            toAddress: spending.to,
            keyFrom3Box: spending.receipt,
            timestamp: spending.timestamp,
            isOpen: types[index],
          }
        })
        resolve(spendingDetails)
      })
      .catch(reject)
  })
}

export const getBalance = () => {
  return new Promise((resolve, reject) => {
    callTransactionTokenContract('balanceOf', OWN_ADDRESS)
      .then(balance => {
        resolve(balance)
      })
      .catch(reject)
  })
}

// eslint-disable-next-line no-extend-native
Array.prototype.union = function(y) {
  const x = this
  console.log(x)
  return [...new Set([...x, ...y])]
}

export const getUserAddress = () => {
  return OWN_ADDRESS
}
