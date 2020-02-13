import React from 'react'
import { Helmet } from 'react-helmet'
import Authorize from 'components/LayoutComponents/Authorize'
import { connectToMetamask } from '../../../ethereumConnections/web3'
import { addPublicProfileDataForSelf } from '../../../ethereumConnections/3BoxHelper'

class DashboardAlpha extends React.Component {
  componentDidMount() {
    connectToMetamask(false).then(() => {
      addPublicProfileDataForSelf('name', 'ArvindAcc2').then(() => {
        console.log('stored')
      })
    })
  }

  render() {
    return (
      <Authorize roles={['admin']} redirect to="/dashboard/beta">
        <Helmet title="Dashboard Alpha" />
        <div className="utils__title utils__title--flat mb-3">
          <strong className="text-uppercase font-size-16">Empty Page</strong>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">[src\pages\dashboard\alpha\index.js]</div>
            </div>
          </div>
        </div>
      </Authorize>
    )
  }
}

export default DashboardAlpha
