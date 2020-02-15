import React, { useEffect, useState } from 'react'
import moment from 'moment'
import PaymentTransaction from '../../CleanUIComponents/PaymentTransaction'
import { getSpending } from '../../../ethereumConnections/web3'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 0:43
 */

function CampaignLedger({ campaignId }) {
  const [spendings, setSpendings] = useState([])
  useEffect(() => {
    getSpending(campaignId).then(expenses => {
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
          footer="Sent To DigitalOcean Cloud Hosting, Winna, LA"
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
