import React, { useEffect, useState } from 'react'
import { Collapse, Icon, Upload } from 'antd'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet/es/Helmet'
import { withRouter } from 'react-router'
import moment from 'moment'
import Authorize from '../../components/LayoutComponents/Authorize'
import CampaignHeadCard from '../../components/CampaignComponents/CampaignHeadCard'
import ShortItemInfo from '../../components/CleanUIComponents/ShortItemInfo'
import DateTab from '../../components/CampaignComponents/DateCard'
import ProgressCard from '../../components/CleanUIComponents/ProgressCard'
import CampaignLedger from '../../components/CampaignComponents/CampaignLedger'
import styles from './style.module.scss'
import { convertFromHex } from '../../helpers'
import { getCampaignDetails, getDonation, getUserAddress } from '../../ethereumConnections/web3'
import {
  getPublicAppDataWithKey,
  getPublicProfileForOthers,
} from '../../ethereumConnections/3BoxHelper'
import SpendDonations from '../../components/CampaignComponents/SpendDonations'

const { Panel } = Collapse

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   10-02-2020, 12:7
 */

// const donorData = [
//   {
//     img: 'resources/images/photos/1.jpeg',
//     name: 'Pranav Singhal',
//     note: 'Date: 16th Feb 2020',
//     actionData: '+1K DAI',
//     actionDataColor: '#52b562 ',
//   },
//   {
//     img: 'resources/images/photos/2.jpeg',
//     name: 'Arvind Kalra',
//     note: 'Date: 17th Feb 2020',
//     actionData: '+750 DAI',
//     actionDataColor: '#52b562',
//   },
//   {
//     img: 'resources/images/photos/3.jpeg',
//     name: 'Harjot Singh',
//     note: 'Date: 16th Feb 2021',
//     actionData: '+500 DAI',
//     actionDataColor: '#52b562',
//   },
// ]

function CampaignPage({ match, loading }) {
  // const genExtra = () => (
  //   <Icon
  //     type="setting"
  //     onClick={event => {
  //       // If you don't want click extra trigger collapse, you can prevent this:
  //       event.stopPropagation();
  //     }}
  //   />
  // );
  const [campaign, setCampaign] = useState('')
  const [campaignDetails, setCampaignDetails] = useState({ progressItem: {}, donors: [] })
  const [showSpend, setShowSpend] = useState(false)
  const [ownerProfile, setProfile] = useState({})

  useEffect(() => {
    if (!loading) {
      let details
      let campaignId = match.params.campaign
      let files
      let donors
      setCampaign(campaignId)
      campaignId = convertFromHex(campaignId)
      getCampaignDetails(campaignId)
        .then(_details => {
          details = _details
          return getPublicAppDataWithKey(_details.ownerAddress, details.supportingDocumentsKey)
        })
        .then(result => {
          files = [...result.files]
          setShowSpend(getUserAddress() === details.ownerAddress.toLowerCase())
          getPublicProfileForOthers(details.ownerAddress).then(_profile => {
            setProfile({
              avatar:
                `https://ipfs.io/ipfs/${_profile.image[0].contentUrl['/']}` ||
                'resources/images/photos/1.jpeg',
              name: _profile.name,
            })
          })
          const promises = result.files.map(e => getPublicAppDataWithKey(details.ownerAddress, e))
          details.description = result.description
          return Promise.all(promises)
        })
        .then(urls => {
          urls = urls.map((e, index) => {
            return {
              url: e,
              name: files[index],
              uid: index,
            }
          })
          details = calculateCampEndDate(details)
          details = calculateProgress(details)
          details.files = urls
          donors = details.donorAddressesOpen.union(details.donorAddressesSpecific)
          const promises = donors.map(e => getDonation(campaignId, e))
          return Promise.all(promises)
        })
        .then(donations => {
          details.totalSpent = details.totalSpentOpen + details.totalSpentSpecific
          details.donors = donations.map((donation, index) => {
            return {
              address: donors[index],
              amount: parseInt(donation.openDonation, 10) + parseInt(donation.specificDonation, 10),
              index,
            }
          })
          details.donors = details.donors.sort((a, b) => b.amount - a.amount)
          const promises = details.donors.map(e => getPublicProfileForOthers(e.address))
          return Promise.all(promises)
        })
        .then(donorProfiles => {
          details.donors = details.donors.map((profile, index) => {
            profile.name = donorProfiles[index].name
            profile.avatar =
              `https://ipfs.io/ipfs/${donorProfiles[index].image[0].contentUrl['/']}` ||
              'resources/images/photos/1.jpeg'
            return profile
          })
          console.log(details.donors)
          setCampaignDetails({ ...details })
        })
    }
  }, [loading])

  const calculateCampEndDate = details => {
    const date = moment.unix(details.donationEndTime).format('D MMM YYYY')
    const diff = moment.unix(details.donationEndTime).diff(moment())
    // const diff = date.diff(moment())
    details.donationEndTime = date
    if (diff > 0) {
      details.donationEndTimeTitle = 'Ends On'
    }
    if (diff <= 0) {
      details.donationEndTimeTitle = 'Ended On'
    }
    return details
  }

  const calculateProgress = details => {
    const progress = (
      ((details.totalDonationOpen + details.totalDonationSpecific) * 100) /
      details.requiredDonation
    ).toFixed(2)

    details.progressItem = {
      title: 'Total Funds ',
      note: `of ${details.requiredDonation} Dai Raised`,
      currentValue: `DAI ${details.totalDonationOpen + details.totalDonationSpecific}`,
      percent: progress,
      dataColor: '#007bff',
    }
    return details
  }

  function download(file) {
    const element = document.createElement('a')
    element.setAttribute('href', file.url)
    element.setAttribute('download', file.name)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }
  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      <Helmet title={campaign} />
      {loading ? (
        'Loading...'
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className={`col-xl-12 mb-4 ${styles.bottomBorder}`}>
                <CampaignHeadCard
                  id={convertFromHex(campaign)}
                  campaignDetails={campaignDetails}
                  profile={ownerProfile}
                />
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
                      title={campaignDetails.donationEndTimeTitle || ''}
                      date={campaignDetails.donationEndTime || ''}
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
                        <div>
                          <Upload
                            onPreview={file => {
                              download(file)
                            }}
                            fileList={campaignDetails.files}
                            listType="picture-card"
                          />
                        </div>
                      </Panel>
                      <Panel
                        header={
                          <span className={styles.panelHeader}>
                            {' '}
                            All Transactions
                            {showSpend ? (
                              <SpendDonations campaignIndex={campaign} details={campaignDetails} />
                            ) : null}
                            <span className="float-right">
                              <span className={`${styles.dai} font-size-16`}>
                                {campaignDetails.totalSpent}
                              </span>{' '}
                              <span className="text-muted font-size-10">
                                {' '}
                                of{' '}
                                {campaignDetails.totalDonationSpecific +
                                  campaignDetails.totalDonationOpen}{' '}
                                Dai spent
                              </span>
                            </span>
                          </span>
                        }
                        key="2"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <CampaignLedger
                              campaignId={convertFromHex(match.params.campaign)}
                              details={campaignDetails}
                            />
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
                  title={campaignDetails.progressItem.title || ''}
                  note={campaignDetails.progressItem.note || ''}
                  currentValue={campaignDetails.progressItem.currentValue || ''}
                  percent={campaignDetails.progressItem.percent || ''}
                  dataColor={campaignDetails.progressItem.dataColor || ''}
                />

                <div className="card graphCard ">
                  <div className="card-header">
                    <div className="utils__title utils__title--flat">
                      <strong className="text-uppercase font-size-16"> Recent Donors</strong>
                    </div>
                  </div>
                  <div className="card-body">
                    {campaignDetails.donors.map(donor => {
                      // const actionData = (
                      //   <span style={{ color: donorData[0].actionDataColor }}>{donor.amount}</span>
                      // )
                      return (
                        <ShortItemInfo
                          key={donor.index}
                          img={donor.avatar}
                          name={donor.name}
                          note={donor.address}
                          actionData={donor.amount}
                        />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Authorize>
  )
}
const mapStateToProps = ({ dispatch, user }) => ({ dispatch, loading: user.loading })
export default connect(mapStateToProps)(withRouter(CampaignPage))
