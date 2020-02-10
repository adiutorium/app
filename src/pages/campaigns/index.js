import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from '../../components/LayoutComponents/Authorize'
import CampaignCard from '../../components/CampaignComponents/CampaignCard'

/**
 * @author https://github.com/pranav-singhal
 * @createdOn   10-02-2020, 10:41
 */

function AllCampaigns() {
  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <Helmet title="User Campaigns" />
      <div className="utils__title utils__title--flat mb-3">
        <strong className="text-uppercase font-size-16">Your campaigns</strong>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-12">
              <CampaignCard />
            </div>
          </div>
        </div>
      </div>
    </Authorize>
  )
}

export default AllCampaigns
