import actions from './actions'

const initialState = {
  campaignList: []
}

const addCampaignToList = (state, campaign) => {
  console.log('addCampaignToList=====>', campaign)
  const tempCampaignList = state.campaignList
  tempCampaignList.push(campaign)
  return { ...state, campaignList: tempCampaignList }
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_CAMPAIGNS_FOR_USER:
      return { ...state, ...action.payload }
    case actions.ADD_CAMPAIGN_TO_LIST_FOR_USER:
      return addCampaignToList(state, action.payload.campaign)
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
