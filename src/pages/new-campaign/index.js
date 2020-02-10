import React, { useState } from 'react'
import { Button, Form, Input, Select, Upload, Icon, DatePicker } from 'antd'
import CampaignSteps from '../../components/CampaignComponents/CampaignSteps'
import './styles.scss'
import Authorize from '../../components/LayoutComponents/Authorize'
// steps for creating a campaign
// name for the campaign
// short description
// type of campaign - drop down
// amount wanted
// end date for the campaign
// supporting documents
// select vendors - from list or add your own

function CreateCampaign() {
  const [current, setCurrent] = useState(0)
  const nextSection = () => setCurrent(current + 1)
  const prevSection = () => setCurrent(current - 1)
  // const buttonText = {
  // TODO function to set Button Text
  // }

  const getStepForm = () => {
    const { Item } = Form
    switch (current) {
      case 0:
        return (
          <>
            <h4 className="mt-4 w-100">About Your Campaign</h4>
            <div className="col-lg-6 offset-lg-4 mt-4 custom-input amount-input">
              <Item extra="Target Amount in Dai">
                <Input
                  type="number"
                  addonBefore="DAI"
                  addonAfter={<img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />}
                />
              </Item>
            </div>
            <div className="col-lg-6 offset-lg-4 custom-input">
              <Item extra="Campaign Name">
                <Input type="text" />
              </Item>
            </div>

            <div className="col-lg-6 offset-lg-4 custom-input">
              <Item extra="Choose a category">
                <Select>
                  <Select.Option value="Medical"> Medical </Select.Option>
                </Select>
              </Item>
            </div>
          </>
        )
      case 1:
        return (
          <>
            <h4 className="mt-4 w-100">Campaign Details</h4>
            <div className="col-lg-6 offset-lg-3 custom-input">
              <Item extra="Tell us your story" wrapperCol={{ lg: 24 }}>
                <Input.TextArea
                  type="textarea"
                  size="large"
                  rows={4}
                  placeholder="Tell people who you are, what do you need the money for ..."
                />
              </Item>
            </div>
            <div className="col-lg-6 offset-lg-3 custom-input">
              <Item
                extra="Attach Supporting documents"
                className="document-upload mb-0"
                wrapperCol={{ lg: 24 }}
              >
                <Upload>
                  <Button>
                    <Icon type="upload" /> Upload Documents
                  </Button>
                </Upload>
              </Item>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h4 className="mt-4 w-100">Campaign Dates</h4>
            <div className="col-lg-6 offset-lg-4 custom-input date-picker">
              <Item extra="Last date for accepting Funds" wrapperCol={{ lg: 16 }}>
                <DatePicker />
              </Item>
            </div>
            <div className="col-lg-6 offset-lg-4 custom-input date-picker">
              <Item extra="Last date for spending Funds" wrapperCol={{ lg: 16 }}>
                <DatePicker />
              </Item>
            </div>
          </>
        )
      default:
        return <p>no step selected</p>
    }
  }
  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="card"
            title={<h1>New Campaign</h1>}
            extra={<h2>Start a campaign in 3 easy steps</h2>}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <CampaignSteps current={current} />
                </div>
                <div className="col-lg-12">
                  <Form labelCol={{ lg: 8 }} wrapperCol={{ lg: 16 }}>
                    <div className="row">{getStepForm()}</div>
                  </Form>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="row-lg-12">
                  <section className="buttons">
                    <Button disabled={current === 0} onClick={prevSection}>
                      Previous Step
                    </Button>
                    <Button onClick={nextSection}>
                      {current === 2 ? 'Start Campaign' : 'Next Step'}
                    </Button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authorize>
  )
}

export default CreateCampaign
