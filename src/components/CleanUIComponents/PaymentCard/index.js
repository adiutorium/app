import React, { useState } from 'react'
import styles from './style.module.scss'
import { approveToGetTokens } from '../../../ethereumConnections/web3'

function PaymentCard({ number, footer, sum, approved, requestId }) {
  const [isApproved, setIsApproved] = useState(approved)
  const handleClick = e => {
    e.preventDefault()
    approveToGetTokens(requestId, txHash => {
      console.log(txHash)
      setIsApproved(true)
    })
  }

  return (
    <a href="/" className={`card card--withShadow ${styles.paymentCard}`} onClick={handleClick}>
      {sum && <span className={styles.sum}>{sum}</span>}
      {/*{icon && (*/}
      {/*  <div className={styles.icon}>*/}
      {/*    <i className={icon} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <p className="text-muted text-center mb-0">Sent By:</p>
      {/*{name && <span className={styles.name}>{name}</span>}*/}
      {number && <span className={styles.number}>{number}</span>}
      {isApproved ? (
        <span className={`${styles.type} text-success`}>Approved</span>
      ) : (
        <span className={`${styles.type} text-warning`}>Approve</span>
      )}
      {/*{type && <span className={styles.type}>{type}</span>}*/}
      {footer && <div className={styles.footer}>{footer}</div>}
    </a>
  )
}

export default PaymentCard
