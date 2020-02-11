import React, { useState } from 'react'
import { Button, Form, Modal } from 'antd'
import styles from '../CampaignHeadCard/style.module.scss'
import './style.module.scss'
import CustomInput from '../../CustomInput'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 3:16
 */

function DonorModal() {
  const [visible, setVisible] = useState(false)
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
        <Form
          onSubmit={e => {
            e.preventDefault()
            console.log(e)
          }}
        >
          <CustomInput
            type="text"
            placeholder="Enter the amount you want to donate"
            addonBefore="DAI"
            addonAfter={<img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />}
          />

          <p>Some contents...</p>
        </Form>
      </Modal>
    </>
  )
}

export default DonorModal
