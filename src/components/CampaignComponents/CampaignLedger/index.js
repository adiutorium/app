import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PaymentTransaction from '../../CleanUIComponents/PaymentTransaction'
import { getSpending } from '../../../ethereumConnections/web3'
import { getPublicProfileForOthers } from '../../../ethereumConnections/3BoxHelper'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 0:43
 */

function CampaignLedger({ campaignId }) {
  const [spendings, setSpendings] = useState([])
  useEffect(() => {
    let expenses
    getSpending(campaignId)
      .then(_expenses => {
        expenses = _expenses
        const promises = expenses.map(e => getPublicProfileForOthers(e.toAddress))
        return Promise.all(promises)
      })
      .then(organisationNames => {
        expenses = expenses.map((e, index) => {
          e.toName =
            (organisationNames[index] && organisationNames[index].name) || 'Unknown Address'
          return e
        })
        setSpendings([...expenses])
      })
  }, [campaignId])
  return (
    <div>
      {/*<h1 className={styles.borderBottom}>*/}

      {/*</h1>*/}
      {spendings.map(spending => (
        <PaymentTransaction
          key={spending.index}
          approved={spending.timestamp !== '0'}
          amount={`${spending.amount} DAI`}
          info={spending.toAddress}
          footer={`Sent To ${spending.toName}`}
          date={
            spending.timestamp !== '0'
              ? moment.unix(spending.timestamp).format('D MMM YYYY')
              : false
          }
        />
      ))}
    </div>
  )
}

export default CampaignLedger
