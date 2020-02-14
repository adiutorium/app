import React, { useState } from 'react'
import moment from 'moment'
import { Button, Form, Input, Select, Upload, Icon, DatePicker } from 'antd'
import CampaignSteps from '../../components/CampaignComponents/CampaignSteps'
import './styles.scss'
import Authorize from '../../components/LayoutComponents/Authorize'
import {
  addPublicAppDataForSelf,
  addPublicAppFile,
  getPublicAppDataForSelf,
} from '../../ethereumConnections/3BoxHelper'
import { startCampaign } from '../../ethereumConnections/web3'
// steps for creating a campaign
// name for the campaign
// short description
// type of campaign - drop down
// amount wanted
// end date for the campaign
// supporting documents
// select vendors - from list or add your own

function download(file) {
  const element = document.createElement('a')
  element.setAttribute('href', file.url)
  element.setAttribute('download', file.name)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

const setDetailsObj = (filesArray, description) => {
  const detailsObj = { file: [] }
  // filesArray.forEach((file)=>{
  //   detailsObj.file = [...detailsObj.file, file.name]
  //
  // })
  filesArray = filesArray.map(e => e.name)
  detailsObj.files = filesArray
  detailsObj.description = description
  return detailsObj
}

function CreateCampaign() {
  const [fileList, setFileList] = useState([])
  const [current, setCurrent] = useState(0)
  const [campDetails, setCampDetails] = useState({})
  const setFormData = (key, value) => {
    setCampDetails({ ...campDetails, [key]: value })
  }

  const nextSection = () => {
    if (current !== 2) {
      setCurrent(current + 1)
    } else {
      console.log(fileList)
      const detailsObject = setDetailsObj(fileList, campDetails.description)
      addPublicAppDataForSelf('campaignName', detailsObject).then(res => {
        if (res) {
          startCampaign(
            campDetails.donationTime,
            campDetails.spendingTime,
            campDetails.amount,
            'campaignName',
            campDetails.type,
            campDetails.name,
            txHash => {
              console.log(txHash)
            },
          )
        }
      })
    }
  }
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
                  onChange={e => setFormData('amount', parseInt(e.target.value, 10))}
                  type="number"
                  addonBefore="DAI"
                  addonAfter={<img src="/images/dai.svg" alt="dai" style={{ maxHeight: '60%' }} />}
                />
              </Item>
            </div>
            <div className="col-lg-6 offset-lg-4 custom-input">
              <Item extra="Campaign Name">
                <Input type="text" onChange={e => setFormData('name', e.target.value)} />
              </Item>
            </div>

            <div className="col-lg-6 offset-lg-4 custom-input">
              <Item extra="Choose a category">
                <Select onSelect={e => setFormData('type', e)}>
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
                  onChange={e => setFormData('description', e.target.value)}
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
                <Upload
                  onPreview={file => {
                    download(file)
                  }}
                  customRequest={({ file, onSuccess, onError }) => {
                    const { uid, name } = file
                    return addPublicAppFile(`campaignName_${name}`, file)
                      .then(() => {
                        getPublicAppDataForSelf('campaign_medical')
                          .then(result => {
                            console.log('Result')
                            console.log(result)
                            const fileObj = {
                              name: `campaignName_${name}`,
                              status: 'done',
                              url: result,
                              thumbUrl: result,
                              key: uid,
                              uid,
                            }
                            setFileList([...fileList, { ...fileObj }])
                            onSuccess('Ok')
                          })
                          .catch(() => {
                            onError('Oops')
                          })
                      })
                      .catch(() => {
                        onError('Oops')
                      })
                  }}
                  fileList={fileList}
                >
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
                <DatePicker
                  onChange={e => {
                    const diff = moment().diff(e, 'seconds')
                    console.log(Math.abs(diff))
                    setFormData('donationTime', diff)
                  }}
                />
              </Item>
            </div>
            <div className="col-lg-6 offset-lg-4 custom-input date-picker">
              <Item extra="Last date for spending Funds" wrapperCol={{ lg: 16 }}>
                <DatePicker
                  onChange={e => {
                    const diff = moment().diff(e, 'seconds')
                    console.log(Math.abs(diff))
                    setFormData('spendingTime', diff)
                  }}
                />
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
