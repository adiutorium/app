import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown, Avatar, Badge, Modal } from 'antd'
// import { Link } from 'react-router-dom'
import EditProfile from '3box-profile-edit-react'
import { FormattedMessage } from 'react-intl'
import styles from './style.module.scss'
import { getBox, getSpace } from '../../../../ethereumConnections/3BoxHelper'
import { getUserAddress } from '../../../../ethereumConnections/web3'

@connect(({ user }) => ({ user }))
class ProfileMenu extends React.Component {
  state = {
    count: 0,
    visible:false
  }

  logout = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'user/LOGOUT',
    })
  }

  addCount = () => {
    // let { count } = this.state
    // count += 1
    // this.setState({
    //   count,
    // })
  }

  editProfile = (e) => {
    e.preventDefault()
    this.setState({visible:true})
  }

  render() {
    const { user } = this.props
    const { count } = this.state
    const menu = (
      <Menu selectable={false}>
        <Menu.Item>
          <strong>
            <FormattedMessage id="topBar.profileMenu.hello" />, {user.name || 'Anonymous'}
          </strong>
          <div>
            <strong>
              <FormattedMessage id="topBar.profileMenu.role" />:{' '}
            </strong>
            {user.userType}
          </div>
        </Menu.Item>
        <Menu.Divider />


        <Menu.Item>
          <a href="/" onClick={this.editProfile}>
            <i className={`${styles.menuIcon} icmn-user`} />
            <FormattedMessage id="topBar.profileMenu.editProfile" />
          </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a href="javascript: void(0);" onClick={this.logout}>
            <i className={`${styles.menuIcon} icmn-exit`} />
            <FormattedMessage id="topBar.profileMenu.logout" />
          </a>
        </Menu.Item>
      </Menu>
    )
    const {visible} = this.state
    const box=getBox()
    const space=getSpace()
    const currentUserAddr=getUserAddress()
    return (
      <Dropdown overlay={menu} trigger={['click']} onVisibleChange={this.addCount}>

        <div className={styles.dropdown}>
          <Badge count={count}>
            <Avatar className={styles.avatar} shape="square" size="large" icon="user" />
          </Badge>
          <Modal footer={false} style={{background:"transparent"}} width="0" visible={visible} onOk={()=>(this.setState({visible:false}))} onCancel={()=>this.setState({visible:false})}>
            <EditProfile
              box={box}
              space={space}
              currentUserAddr={currentUserAddr}

              customFields={[
                {
                  // for a field with a dropdown input
                  inputType: 'dropdown',
                  key: 'userType',
                  field: 'You are:',
                  options: [
                    {
                      // dropdown input requires an array of objects
                      value: 'organisation', // value passed after selection
                      display: 'an Organisation', // what the user will see in the dropdown
                    },
                    {
                      value: 'fundRaiser',
                      display: 'a fund raiser',
                    },
                    {
                      value: 'donor',
                      display: 'A donor',
                    },
                  ],
                },
              ]}
            />
          </Modal>
        </div>
      </Dropdown>
    )
  }
}

export default ProfileMenu
