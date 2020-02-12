import React from 'react'
import { Steps } from 'antd'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   12-02-2020, 14:44
 */

function DonorSteps(props) {
  const { Step } = Steps
  return (
    <Steps {...props}>
      <Step title="Dontaion Details" />
      <Step title="Donate Now" />
    </Steps>
  )
}

export default DonorSteps
