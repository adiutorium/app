import React from 'react'
import { Button } from 'antd'
import { donateTokens } from '../../ethereumConnections/web3'
// import { donateTokens } from '../../ethereumConnections/web3'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   14-02-2020, 15:6
 */

function MetaMaskDonate({ id, amount, isOpen }) {
  console.log('asdfasdf', isOpen)
  const handleClick = e => {
    e.preventDefault()
    donateTokens(id, amount, isOpen)
  }
  return <Button onClick={handleClick}>Donate Using MetaMask</Button>
}

export default MetaMaskDonate
