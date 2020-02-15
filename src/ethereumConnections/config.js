/**
 * Created by Arvind Kalra (https://github.com/arvindkalra) on 12/02/20
 */

export const GO_FUND_ME_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'getTotalApprovalRequests',
    outputs: [{ name: 'total', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
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
      { name: 'totalDonations', type: 'uint256[4]' },
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
    constant: false,
    inputs: [{ name: 'toAdd', type: 'address' }],
    name: 'addVerifiedAccount',
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
      { name: 'isOpen', type: 'bool' },
    ],
    name: 'getSpendingDetail',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'receipt', type: 'string' },
      { name: 'timestamp', type: 'uint256' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: 'id', type: 'uint256' }],
    name: 'getApprovalRequestDetail',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'approved', type: 'bool' },
      { name: 'spendReceipt', type: 'string' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: 'apporvalRequestId', type: 'uint256' }],
    name: 'approveExpense',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
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
    constant: true,
    inputs: [],
    name: 'getVerifiedAccounts',
    outputs: [{ name: 'organisations', type: 'address[]' }],
    payable: false,
    stateMutability: 'view',
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

export const GO_FUND_ME_CONTRACT_ADDRESS = '0xa83AE184763b2fF9A1ED575F57C2F0765ad7E172'

export const TOKEN_CONTRACT_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'spender',
        type: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'sender',
        type: 'address',
      },
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transferFrom',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'recipient',
        type: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'spender',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'symbol',
        type: 'string',
      },
      {
        name: 'decimals',
        type: 'uint8',
      },
      {
        name: 'totalSupply',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'from',
        type: 'address',
      },
      {
        indexed: true,
        name: 'to',
        type: 'address',
      },
      {
        indexed: false,
        name: 'value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
]

export const TOKEN_CONTRACT_ADDRESS = '0xaf6d060a29e3dfdcdd3e09c9518e5e74ece8ed26'

export const BoxAppName = 'GoFundMeTrial'
