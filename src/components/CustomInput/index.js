import React from 'react'
import { Input, Form } from 'antd'
import styles from './style.module.scss'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 3:25
 */

const { Item } = Form
function CustomInput(props) {
  return (
    <div className={styles.customInput}>
      <Item>
        <Input {...props} />
      </Item>
    </div>
  )
}

export default CustomInput
