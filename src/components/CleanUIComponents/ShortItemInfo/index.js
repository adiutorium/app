import React from 'react'
import styles from './style.module.scss'

class ShortItemInfo extends React.Component {
  render() {
    const { actionData, name, note, img, size } = this.props

    return (
      <div className={`${styles.item} ${size === 'large' ? styles.large : ''}`}>
        {img && (
          <div className={styles.img}>
            <img src={img} alt="alt" />
          </div>
        )}
        <div className={styles.description}>
          {name && <h2 className={styles.name}>{name}</h2>}
          {note && <span className={styles.note}>{note}</span>}
        </div>
        {actionData && <div className={styles.actionData}>{actionData} DAI </div>}
      </div>
    )
  }
}

export default ShortItemInfo
