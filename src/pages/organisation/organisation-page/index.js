import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Authorize from '../../../components/LayoutComponents/Authorize'
import PaymentCard from '../../../components/CleanUIComponents/PaymentCard'
import { getApprovalRequests } from '../../../ethereumConnections/web3'
import { getPublicProfileForOthers } from '../../../ethereumConnections/3BoxHelper'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   14-02-2020, 16:28
 */

// amount, approved(boolean), 3boxKey,campaignId,from
// TODO - add campaign link
// TODO - add purpose
function OrganisationPage({ dispatch, loading }) {
  const [approvals, setapprovals] = useState([])
  console.log(approvals, setapprovals)
  useEffect(() => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isOrganisationPage',
        value: true,
      },
    })
  }, [])

  useEffect(() => {
    if (!loading) {
      const tempApprovals = approvals
      getApprovalRequests(approval => {
        getPublicProfileForOthers(approval.senderAddress).then(profile => {
          approval.name = profile.name
          tempApprovals.push(approval)
          setapprovals([...tempApprovals])
        })
        console.log(approval)
      })
    }
  }, [loading])

  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <div className="utils__title utils__title--flat mb-3">
        <strong className="text-uppercase font-size-16">Your Requests ({approvals.length})</strong>
        {/*<Button className="ml-3">View All</Button>*/}
      </div>
      <div className="row">
        {approvals.map(({ amount, senderAddress, approved, requestId, extraDataOn3Box, name }) => {
          return (
            <div className="col-lg-4" key={requestId.toString()}>
              <PaymentCard
                requestId={requestId}
                icon="lnr lnr-bookmark"
                name={name}
                number={senderAddress}
                approved={approved}
                // type="VISA"
                footer={
                  <p>
                    Purpose: <br /> {extraDataOn3Box || '_'}
                  </p>
                }
                sum={`${amount} DAI`}
              />
            </div>
          )
        })}
      </div>
    </Authorize>
  )
}
const mapStateToProps = ({ dispatch, user }) => ({ dispatch, loading: user.loading })
export default connect(mapStateToProps)(OrganisationPage)
