import React from 'react'
import { Steps } from 'antd'

function CampaignSteps({ current }) {
  const { Step } = Steps
  return (
    <div className="mt-1">
      <Steps current={current}>
        <Step title="About" />
        <Step title="Details" />
        <Step title="Dates" />
      </Steps>
    </div>
  )
}

export default CampaignSteps
