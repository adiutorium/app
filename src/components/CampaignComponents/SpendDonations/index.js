import React, { useState } from 'react'
import { Button, Collapse, Form, Input, Modal } from 'antd'
import CustomInput from '../../CustomInput'
import { spendDonations } from '../../../ethereumConnections/web3'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   14-02-2020, 20:54
 */

// campaign index, toAddress, amount, isOpen, extradataon3box

function SpendDonations({ campaignIndex }) {
  const [ethAddress, setEthAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [amount, setAmount] = useState(0)
  const openTransaction = e => {
    e.preventDefault()
    spendDonations(campaignIndex, ethAddress, amount, '', false, txHash => {
      console.log(txHash)
    }).then(res => {
      console.log(res)
    })
  }

  console.log(campaignIndex)
  const { Panel } = Collapse
  const [visible, setVisible] = useState(true)
  return (
    <span className="ml-2">
      <Modal
        title="Send Campaign Funds"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        footer={false}
      >
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel key="1" header="Spend Open Funds">
            <div className="row">
              <div className="col-lg-12">
                <Form onSubmit={openTransaction}>
                  <CustomInput
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    extra="Enter the amount you want to spend"
                    className="amount-input"
                    type="number"
                    placeholder="Amount in DAI"
                    addonBefore="DAI"
                    addonAfter={
                      <img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />
                    }
                  />

                  <CustomInput
                    value={ethAddress}
                    onChange={e => setEthAddress(e.target.value)}
                    type="text"
                    placeholder="Enter Etherum address"
                    extra="Open funds can be sent to any address. They will however, show up in the campaign ledger"
                  />
                  <div className="customInput">
                    <Input.TextArea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      className="custom-input"
                      type="textarea"
                      size="large"
                      rows={4}
                      placeholder="Additional Notes"
                    />
                  </div>
                  <Button htmlType="submit">Send Transaction</Button>
                </Form>
              </div>
            </div>
          </Panel>
          <Panel key="2" header="Spend Bound Funds">
            <div className="row">
              <div className="col-lg-12">
                <CustomInput
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  extra="Enter the amount you want to spend"
                  className="amount-input"
                  type="number"
                  placeholder="Amount in DAI"
                  addonBefore="DAI"
                  addonAfter={<img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />}
                />
                <div className="customInput">
                  <Input.TextArea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="custom-input"
                    type="textarea"
                    size="large"
                    rows={4}
                    placeholder="Additional Notes"
                  />
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </Modal>
      <Button onClick={() => setVisible(true)}>Send Funds</Button>
    </span>
  )
}

export default SpendDonations
