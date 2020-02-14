import React from 'react'
import { Input, Form } from 'antd'
import './styles.scss'
/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   11-02-2020, 3:25
 */

const { Item } = Form
function CustomInput(props) {
  const { extra } = props
  return (
    <div>
      <Item className="customInput" extra={extra}>
        <Input {...props} />
      </Item>
    </div>
  )
}

export default CustomInput
