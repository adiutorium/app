/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */

export const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [{ name: 'index', type: 'uint256' }],
    name: 'getNumberOfSpendings',
    outputs: [{ name: 'numSpendings', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
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
      { name: 'totalDonation', type: 'uint256' },
      { name: 'donationEndTime', type: 'uint256' },
      { name: 'spendingEndTime', type: 'uint256' },
      { name: 'campaignType', type: 'string' },
      { name: 'requiredDonation', type: 'uint256' },
      { name: 'donors', type: 'address[]' },
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
    constant: true,
    inputs: [
      { name: 'campaignIndex', type: 'uint256' },
      { name: 'spendingIndex', type: 'uint256' },
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
      { name: 'index', type: 'uint256' },
      { name: 'donor', type: 'address' },
    ],
    name: 'getDonation',
    outputs: [{ name: 'amount', type: 'uint256' }],
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
    constant: false,
    inputs: [
      { name: 'index', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'receipt', type: 'string' },
    ],
    name: 'spendDonations',
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

export const CONTRACT_ADDRESS = '0x81981ba52ffcab402f08da33a834d16cad272f15'

export const BoxAppName = 'GoFundMeTrial'
