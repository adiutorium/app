import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import { Button } from 'antd'
import Authorize from '../../../components/LayoutComponents/Authorize'
import PaymentCard from '../../../components/CleanUIComponents/PaymentCard'
import { getApprovalRequests } from '../../../ethereumConnections/web3'

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
      getApprovalRequests(approval => {
        setapprovals([...approvals, approval])
        console.log(approval)
      })
    }
  }, [loading])

  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <div className="utils__title utils__title--flat mb-3">
        <strong className="text-uppercase font-size-16">Your Requests (3)</strong>
        {/*<Button className="ml-3">View All</Button>*/}
      </div>
      <div className="row">
        <div className="col-lg-4">
          {approvals.map(({ amount, senderAddress, approved, requestId }) => {
            return (
              <PaymentCard
                key={requestId.toString()}
                requestId={requestId}
                icon="lnr lnr-bookmark"
                name={senderAddress}
                number={senderAddress}
                approved={approved}
                // type="VISA"
                footer={
                  <p>
                    Purpose: <br /> Medical Expenses for John&apos;s heart surgery
                  </p>
                }
                sum={`${amount} DAI`}
              />
            )
          })}
        </div>
      </div>
    </Authorize>
  )
}
const mapStateToProps = ({ dispatch, campaigns }) => ({ dispatch, loading: campaigns.loading })
export default connect(mapStateToProps)(OrganisationPage)
