import React from 'react'
import { Helmet } from 'react-helmet/es/Helmet'
import { withRouter } from 'react-router'
import Authorize from '../../components/LayoutComponents/Authorize'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   10-02-2020, 12:7
 */

function CampaignPage({ match }) {
  console.log(match)
  const {
    params: { campaign },
  } = match
  console.log(campaign)
  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <Helmet title={campaign} />
      <div className="row">hello world</div>
    </Authorize>
  )
}

export default withRouter(CampaignPage)
