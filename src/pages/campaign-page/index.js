import React, { useEffect } from 'react'
import { Collapse, Icon } from 'antd'
import { connect } from 'react-redux'
import qs from 'qs'
import { Helmet } from 'react-helmet/es/Helmet'
import { withRouter } from 'react-router'
import Authorize from '../../components/LayoutComponents/Authorize'
import CampaignHeadCard from '../../components/CampaignComponents/CampaignHeadCard'
import ShortItemInfo from '../../components/CleanUIComponents/ShortItemInfo'
import DateTab from '../../components/CampaignComponents/DateCard'
import ProgressCard from '../../components/CleanUIComponents/ProgressCard'
import CampaignLedger from '../../components/CampaignComponents/CampaignLedger'
import styles from './style.module.scss'
import { convertFromHex } from '../../helpers'

const { Panel } = Collapse

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   10-02-2020, 12:7
 */

const donorData = [
  {
    img: 'resources/images/photos/1.jpeg',
    name: 'Pranav Singhal',
    note: 'Date: 16th Feb 2020',
    actionData: '+1K DAI',
    actionDataColor: '#52b562 ',
  },
  {
    img: 'resources/images/photos/2.jpeg',
    name: 'Arvind Kalra',
    note: 'Date: 17th Feb 2020',
    actionData: '+750 DAI',
    actionDataColor: '#52b562',
  },
  {
    img: 'resources/images/photos/3.jpeg',
    name: 'Harjot Singh',
    note: 'Date: 16th Feb 2021',
    actionData: '+500 DAI',
    actionDataColor: '#52b562',
  },
]

function CampaignPage({ match, dispatch, location }) {
  // const genExtra = () => (
  //   <Icon
  //     type="setting"
  //     onClick={event => {
  //       // If you don't want click extra trigger collapse, you can prevent this:
  //       event.stopPropagation();
  //     }}
  //   />
  // );

  const {
    params: { campaign },
  } = match
  const progressItem = {
    title: 'Total Funds ',
    note: 'of 1000 Dai Raised',
    currentValue: 'DAI 18M',
    percent: '78',
    dataColor: '#007bff',
  }
  useEffect(() => {
    const queryObj = qs.parse(location.search, { ignoreQueryPrefix: true })
    if (queryObj.shareable) {
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'isCampaignPage',
          value: true,
        },
      })
    } else {
      dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'isCampaignPage',
          value: false,
        },
      })
    }
  }, [])

  console.log(campaign)
  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <Helmet title={campaign} />

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className={`col-xl-12 mb-4 ${styles.bottomBorder}`}>
              <CampaignHeadCard id={convertFromHex(campaign)} />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <DateTab
                    icon="lnr lnr-inbox"
                    number="US 4658-1678-7528"
                    title="Started On"
                    date="15 Feb 2020"
                  />
                </div>
                <div className="col-lg-6">
                  <DateTab
                    icon="lnr lnr-inbox"
                    number="IBAN 445646-8748-4664-1678-5416"
                    title="Ending On"
                    date="15 Feb 2022"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Collapse accordion defaultActiveKey={['2']}>
                    <Panel
                      header={<span className={styles.panelHeader}> Campaign Documents</span>}
                      key="1"
                      extra={
                        <Icon
                          type="file"
                          onClick={event => {
                            // If you don't want click extra trigger collapse, you can prevent this:
                            event.stopPropagation()
                          }}
                        />
                      }
                    >
                      <div> testing</div>
                    </Panel>
                    <Panel
                      header={<span className={styles.panelHeader}>Campaign Ledger</span>}
                      key="2"
                      extra={<Icon type="fund" />}
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <CampaignLedger />
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="utils__title utils__title--flat">
                <strong className="text-uppercase font-size-16"> Campaign Progress</strong>
              </div>

              <ProgressCard
                title={progressItem.title}
                note={progressItem.note}
                currentValue={progressItem.currentValue}
                percent={progressItem.percent}
                dataColor={progressItem.dataColor}
              />

              <div className="card graphCard ">
                <div className="card-header">
                  <div className="utils__title utils__title--flat">
                    <strong className="text-uppercase font-size-16"> Recent Donors</strong>
                  </div>
                </div>
                <div className="card-body">
                  {donorData.map(item => {
                    const actionData = (
                      <span style={{ color: item.actionDataColor }}>{item.actionData}</span>
                    )
                    return (
                      <ShortItemInfo
                        key={item.name}
                        img={item.img}
                        name={item.name}
                        note={item.note}
                        actionData={actionData}
                      />
                    )
                  })}
                </div>
                {/*<div className="utils__chartist utils__chartist--danger">*/}
                {/*  <ChartistGraph*/}
                {/*    data={topPhotosGraphData}*/}
                {/*    options={boundChartistOptions}*/}
                {/*    type="Line"*/}
                {/*    className="height-300"*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authorize>
  )
}
const mapStateToProps = ({ dispatch }) => ({ dispatch })
export default connect(mapStateToProps)(withRouter(CampaignPage))
