/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */

export const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'getNumberOfSpendings',
    outputs: [
      { name: 'numSpendings', type: 'uint256' },
      { name: 'numSpendingsOpen', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'index', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'receipt', type: 'string' },
      { name: 'isOpen', type: 'bool' },
    ],
    name: 'spendDonations',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'getCampaign',
    outputs: [
      { name: 'campaignName', type: 'string' },
      { name: 'owner', type: 'address' },
      { name: 'supportingDocuments', type: 'string' },
      { name: 'totalDonations', type: 'uint256[2]' },
      { name: 'times', type: 'uint256[2]' },
      { name: 'campaignType', type: 'string' },
      { name: 'requiredDonation', type: 'uint256' },
      { name: 'donors', type: 'address[]' },
      { name: 'donorsOpen', type: 'address[]' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: 'index', type: 'uint256' },
      { name: 'amount', type: 'uint256' },
      { name: 'isOpen', type: 'bool' },
    ],
    name: 'donateTokens',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'getPendingShareBack',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_donationTime', type: 'uint256' },
      { name: '_spendTime', type: 'uint256' },
      { name: '_requiredDonation', type: 'uint256' },
      { name: '_supportingDocuments', type: 'string' },
      { name: '_campaignType', type: 'string' },
      { name: '_campaignName', type: 'string' },
    ],
    name: 'startCampaign',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getMyCampaigns',
    outputs: [{ name: 'indices', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: 'campaignIndex', type: 'uint256' },
      { name: 'spendingIndex', type: 'uint256' },
      { name: 'isOpen', type: 'bool' },
    ],
    name: 'getSpendingDetail',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'receipt', type: 'string' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: 'index', type: 'uint256' },
      { name: 'donor', type: 'address' },
    ],
    name: 'getDonation',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'amountOpen', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'endCampaign',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'erc20Address', type: 'address' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'creator', type: 'address' },
      { indexed: false, name: 'campaignName', type: 'string' },
      { indexed: false, name: 'index', type: 'uint256' },
      { indexed: false, name: 'requiredDonation', type: 'uint256' },
    ],
    name: 'CampaignCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: 'index', type: 'uint256' },
      { indexed: false, name: 'amount', type: 'uint256' },
      { indexed: false, name: 'donor', type: 'address' },
    ],
    name: 'TokensDonated',
    type: 'event',
  },
]

export const CONTRACT_ADDRESS = '0xBE1545a8CCe7319DD9ff0938Ff375b92cc770d92'

export const BoxAppName = 'GoFundMeTrial'
