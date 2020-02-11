import React from 'react'
import PaymentTransaction from '../../CleanUIComponents/PaymentTransaction'
import styles from './style.module.scss'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 0:43
 */

function CampaignLedger() {
  return (
    <div>
      {/*<h1 className={styles.borderBottom}>*/}

      {/*</h1>*/}
      <div className="utils__title utils__title--flat mb-5">
        <strong className="text-uppercase font-size-16 "> All Transactions</strong>
        <span className="float-right">
          <span className={`${styles.dai} font-size-16`}>500</span>{' '}
          <span className="text-muted font-size-10"> of 1000 Dai spent</span>
        </span>
      </div>
      <PaymentTransaction
        income={false}
        amount="-100.00 DAI"
        info="0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c"
        footer="Spent at AMAZON Corp, NY, 1756"
        date="15 Feb 2019"
      />
      <PaymentTransaction
        income
        amount="+27,080.00 DAI"
        info="0x5a0b54d5dc17e0aadc383d2db43b0a0d3e029c4c"
        footer="Received From DigitalOcean Cloud Hosting, Winna, LA"
        date="15 Feb 2019"
      />
    </div>
  )
}

export default CampaignLedger
