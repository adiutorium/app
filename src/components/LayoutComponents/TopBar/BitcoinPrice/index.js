import React from 'react'
import { Line } from 'peity-react'
import style from './style.module.scss'
import { getBalance } from '../../../../ethereumConnections/web3'

class BitcoinPrice extends React.Component {
  state = {
    chartsData: [5, 3, 9, 6, 5, 9, 7, 3, 5, 2],
    balance: 0,
  }

  componentDidMount() {
    getBalance().then(_balance => {
      this.setState({ balance: _balance })
    })
  }

  render() {
    const { chartsData, balance } = this.state
    return (
      <div className={style.bitcoinPrice}>
        {/*<FormattedMessage id="topBar.bitcoin" />:*/}
        <span style={{ margin: '0 8px', position: 'relative', top: '3px' }}>
          <Line values={chartsData} />
        </span>
        Current Account Balance: <span style={{ color: '#b68900' }}>{balance} DAI</span>
      </div>
    )
  }
}

export default BitcoinPrice
