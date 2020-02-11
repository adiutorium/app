import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   10-02-2020, 22:42
 */

function DateTab({ date, title }) {
  const [dateClass, setDateClass] = useState('text-success')
  useEffect(() => {
    if (title.toLowerCase().includes('started')) {
      setDateClass('text-success')
    }
    if (title.toLowerCase().includes('ended')) {
      setDateClass('text-danger')
    }
    if (title.toLowerCase().includes('ending')) {
      setDateClass('text-warning')
    }
  }, [title])

  return (
    <a href="/" className={`card card--withShadow ${styles.account}`}>
      {title && <p className={`${styles.number} text-center`}>{title}</p>}
      {date && <span className={`${styles.sum} text-center w-100 ${dateClass}`}>{date}</span>}
    </a>
  )
}

export default DateTab

// export default DateCard
