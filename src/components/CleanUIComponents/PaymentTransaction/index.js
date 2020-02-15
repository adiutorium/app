import React from 'react'
import styles from './style.module.scss'

class PaymentTransaction extends React.Component {
  state = {
    approved: false,
    amount: '',
    info: '',
    footer: '',
    date: '',
  }

  componentWillMount() {
    this.getParams()
  }

  getParams = () => {
    const params = this.props
    this.setState({
      ...params,
    })
  }

  render() {
    const { approved, amount, footer, info, date } = this.state

    return (
      <a
        href="/"
        className={`${styles.paymentTransaction} card card--withShadow ${
          approved ? styles.income : ''
        }`}
      >
        <div className={styles.icon}>
          {approved ? (
            <span className={styles.green}>Approved</span>
          ) : (
            <span className="text-warning">Pending Approval</span>
          )}
        </div>
        {amount && (
          <div>
            <span className={styles.amount}>{amount}</span>
            {info && <sup className={styles.info}>{info}</sup>}
          </div>
        )}
        {footer && (
          <div className={styles.footer}>
            {footer} {date && <span className="float-right"> Transaction Date: {date}</span>}
          </div>
        )}
      </a>
    )
  }
}

export default PaymentTransaction
