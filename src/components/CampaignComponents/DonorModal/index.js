import React, { useState } from 'react'
import { Button, Checkbox, Form, Modal } from 'antd'
import styles from '../CampaignHeadCard/style.module.scss'
import './style.scss'
import CustomInput from '../../CustomInput'
import DonorSteps from '../DonorSteps'
import MetaMaskDonate from '../../MetaMaskDonate'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 3:16
 */

function DonorModal({ id }) {
  const [visible, setVisible] = useState(false)
  const { Item } = Form
  const [current, setCurrent] = useState(0)
  const [donationDetails, setDonationDetails] = useState({ openDonation: false })
  const setFormData = (key, value) => {
    setDonationDetails({ ...donationDetails, [key]: value })
  }
  const getSteps = () => {
    switch (current) {
      case 0:
        return (
          <Form>
            <CustomInput
              value={donationDetails.donationAmount || ''}
              onChange={e => setFormData('donationAmount', e.target.value)}
              extra="Enter the amount you want to donate"
              className="amount-input"
              type="text"
              placeholder="Amount in DAI"
              addonBefore="DAI"
              addonAfter={<img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />}
            />

            <Item extra="Open donations can only be spent by the campaign organisers on verified merchants for specific purposes">
              <Checkbox
                onChange={e => setFormData('openDonation', e.target.checked)}
                checked={!!donationDetails.openDonation}
              >
                {' '}
                Is this an open donation?
              </Checkbox>
            </Item>
          </Form>
        )
      case 1:
        return (
          <div>
            Send Eth To:
            <br />
            <span className="eth-address">0x7949173E38cEf39e75E05D2d2C232FBE8BAe5E20</span>
            <MetaMaskDonate
              id={id}
              amount={donationDetails.donationAmount}
              isOpen={!!donationDetails.openDonation}
            />
            <Button>Connect using WalletConnect</Button>
          </div>
        )
      default:
        return <p>Invalid Step</p>
    }
  }

  return (
    <>
      <Button onClick={() => setVisible(true)} className={`${styles.daiButton} mr-4`}>
        Donate
      </Button>
      <Modal
        title="Donate To Campaign"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        footer={false}
      >
        <DonorSteps current={current} className="mb-5" />
        {getSteps()}
        <div>
          <Button onClick={() => setCurrent(current - 1)} disabled={current === 0}>
            Previous Step
          </Button>
          <Button onClick={() => setCurrent(current + 1)} disabled={current === 1}>
            Next Step
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default DonorModal
