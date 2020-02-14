import React from 'react'
import { Button } from 'antd'
import { user } from './data.json'

import styles from './style.module.scss'
import Avatar from '../../CleanUIComponents/Avatar'
import DonorModal from '../DonorModal'

function CampaignHeadCard({ id }) {
  console.log('id======', id)
  return (
    <div className={styles.card}>
      {/* TODO - change user.cover */}
      <div
        className={styles.head}
        style={{
          backgroundImage: `url('${user.cover}')`,
        }}
      >
        <h2 className="text-white">
          <strong>Medical Relief for John</strong>
          <div className="float-right">
            <DonorModal id={id} />
            <Button className={styles.daiButton}>Share</Button>
          </div>
        </h2>
      </div>
      <div>
        <div className={styles.left}>
          <Avatar src={user.avatar} size="90" borderColor="white" border />
          <strong className="d-block">{user.name}</strong>
          <p className="text-muted text-center">
            Organiser <br /> and <br /> Beneficiary
          </p>
        </div>
        <div className={styles.right}>
          <p>{user.description}</p>
        </div>
      </div>
    </div>
  )
}
export default CampaignHeadCard
