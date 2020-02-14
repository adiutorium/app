import React, { useEffect, useState } from 'react'
import { Progress } from 'antd'
import moment from 'moment'
// import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import data from './data.json'
import styles from './style.module.scss'
import { getPublicAppDataForSelf } from '../../../ethereumConnections/3BoxHelper'

function CampaignCard(props) {
  const [description, setDescription] = useState('')
  const [campEndDate, setCampEndDate] = useState(null)
  const {
    campaignName,
    supportingDocumentsKey,
    donationEndTime,
    totalDonationOpen,
    totalDonationSpecific,
    requiredDonation,
  } = props
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    getPublicAppDataForSelf(supportingDocumentsKey).then(result => {
      setDescription(result.description)
    })
    calculateCampEndDate()
    calculateProgress()
  }, [])

  const calculateCampEndDate = () => {
    const date = moment.unix(donationEndTime).format('D MMM YYYY')
    const diff = moment.unix(donationEndTime).diff(moment())
    // const diff = date.diff(moment())
    console.log(diff)

    if (diff > 0) {
      setCampEndDate(<span className="text-warning">Campaign Ends on : {date}</span>)
    }
    if (diff <= 0) {
      setCampEndDate(<span className="text-danger">Campaign Ended on : {date}</span>)
    }
  }
  const calculateProgress = () => {
    console.log(totalDonationOpen, totalDonationSpecific, requiredDonation)
    setProgress(((totalDonationOpen + totalDonationSpecific) * 100) / requiredDonation)
    // setProgress()
  }

  const {
    productImg,
    // productName,
    // productPrice,
    // productOldPrice,
    // productNote,
    // productStatus,
  } = data
  console.log(props)
  // campaignName: "ethDenver"
  // ownerAddress: "0xD7F1a592874bbe5d14c3f024c08b630e6De5A11B"
  // supportingDocumentsKey: "ethDenver"
  // totalDonationSpecific: 0
  // totalDonationOpen: 0
  // totalSpentSpecific: 0
  // totalSpentOpen: 0
  // donationEndTime: 1582319109
  // spendingEndTime: 1583010312
  // requiredDonation: 1000
  // campaignType: "Medical"
  // donorAddressesOpen: []
  // donorAddressesSpecific: []

  return (
    <div className={styles.productCard}>
      <div className={styles.img}>
        {/*{productStatus === 'new' && (*/}
        {/*  <div className={styles.status}>*/}
        {/*    <span className={styles.statusTitle}>New</span>*/}
        {/*  </div>*/}
        {/*)}*/}
        <div className={styles.like}>
          <i className="icmn-heart" />
        </div>
        <Link to="/campaigns/medical-john">
          <img src={productImg} alt="" />
        </Link>
      </div>

      <div className={styles.title}>
        <Link to="/campaigns/medical-john">
          {campaignName}
          <Progress
            percent={progress}
            status="active"
            type="circle"
            strokeColor="#46be8a"
            width={50}
            className="ml-2"
          />
        </Link>
        {/*<div className={styles.price}>*/}
        {/*  {productPrice}*/}
        {/*  <div className={styles.oldPrice}>{productOldPrice}</div>*/}
        {/*</div>*/}
      </div>
      {/*<p className="text-muted mb-1">*/}

      {/*</p>*/}
      <div className="mb-3">
        <span className="text-success font-size-20 font-weight-bold">
          {totalDonationOpen + totalDonationSpecific}
        </span>{' '}
        <span className={`${styles.dai} font-size-12 font-weight-bolder`}>
          {' '}
          of {requiredDonation} Dai Raised{' '}
        </span>
      </div>
      <div className={styles.descr}>{description || 'Loading...'}</div>
      <div className={`${styles.title} mt-2 pt-2`}>{campEndDate || 'Loading...'}</div>
    </div>
  )
}

export default CampaignCard
