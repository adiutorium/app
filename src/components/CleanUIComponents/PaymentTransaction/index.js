import React from 'react'
import styles from './style.module.scss'

class PaymentTransaction extends React.Component {
  state = {
    income: false,
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
    const { income, amount, footer, info, date } = this.state

    return (
      <a
        href="/"
        className={`${styles.paymentTransaction} card card--withShadow ${
          income ? styles.income : ''
        }`}
      >
        <div className={styles.icon}>
          <i className={income ? 'lnr lnr-arrow-left' : 'lnr lnr-arrow-right'} />
        </div>
        {amount && (
          <div>
            <span className={styles.amount}>{amount}</span>
            {info && <sup className={styles.info}>{info}</sup>}
          </div>
        )}
        {footer && (
          <div className={styles.footer}>
            {footer} <span className="float-right"> Transaction Date: {date}</span>{' '}
          </div>
        )}
      </a>
    )
  }
}

export default PaymentTransaction
