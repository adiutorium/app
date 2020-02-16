import React, { useEffect, useState } from 'react'
import { Button, Collapse, Form, Input, Modal, Select } from 'antd'
import CustomInput from '../../CustomInput'
import { getOrganisationAddresses, spendDonations } from '../../../ethereumConnections/web3'
import { getPublicProfileForOthers } from '../../../ethereumConnections/3BoxHelper'

const { Option } = Select
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
  const [organisationOptions, setOrganisationOptions] = useState([])

  useEffect(() => {
    let addresses
    console.log(organisationOptions)
    getOrganisationAddresses()
      .then(_addresses => {
        addresses = _addresses
        const promises = addresses.map(e => getPublicProfileForOthers(e))
        return Promise.all(promises)
      })
      .then(profiles => {
        const organisations = profiles.map((profile, index) => {
          return {
            name: profile.name,
            address: addresses[index],
            index,
          }
        })
        console.log(organisations)
        setOrganisationOptions(organisations)
      })
  }, [])

  const openTransaction = (e, isOpen) => {
    e.preventDefault()
    spendDonations(campaignIndex, ethAddress, amount, notes, isOpen, txHash => {
      console.log(txHash)
    }).then(res => {
      console.log(res)
    })
  }

  const handleSelectChange = selection => {
    const index = organisationOptions.findIndex(e => selection === e.name)
    const selectedAddress = organisationOptions[index].address
    setEthAddress(selectedAddress)
  }

  const { Panel } = Collapse
  const [visible, setVisible] = useState(false)
  return (
    <span className="ml-2">
      <Modal
        title="Send Campaign Funds"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        footer={false}
      >
        {/* TODO add balances of each type of available donations to be spent */}
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel key="1" header="Spend Open Funds">
            <div className="row">
              <div className="col-lg-12">
                <Form onSubmit={e => openTransaction(e, true)}>
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
                <Form onSubmit={e => openTransaction(e, false)}>
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
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select an Organisation to spend"
                    optionFilterProp="children"
                    onChange={handleSelectChange}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {organisationOptions.map(organisation => (
                      <Option value={organisation.name} key={organisation.index}>
                        {organisation.name}
                      </Option>
                    ))}
                  </Select>
                  ,
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
        </Collapse>
      </Modal>
      <Button onClick={() => setVisible(true)}>Send Funds</Button>
    </span>
  )
}

export default SpendDonations
