import React from 'react'
import { Progress } from 'antd'
// import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import data from './data.json'
import styles from './style.module.scss'

class CampaignCard extends React.Component {
  state = {
    productImg: data.productImg,
    productName: data.productName,
    // productPrice: data.productPrice,
    // productOldPrice: data.productOldPrice,
    productNote: data.productNote,
    // productStatus: data.productStatus,
  }

  render() {
    const {
      productImg,
      productName,
      // productPrice,
      // productOldPrice,
      productNote,
      // productStatus,
    } = this.state
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
            {productName}
            <Progress
              percent={50}
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
          <span className="text-success font-size-20 font-weight-bold">500</span>{' '}
          <span className={`${styles.dai} font-size-12 font-weight-bolder`}>
            {' '}
            of 1000 Dai Raised{' '}
          </span>
        </div>
        <div className={styles.descr}>{productNote}</div>
        <div className={`${styles.title} mt-2 pt-2`}>
          <span className="text-warning">Campaign Ends on : 18 Feb 2019</span>
        </div>
      </div>
    )
  }
}

export default CampaignCard
