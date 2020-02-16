import React, { useEffect, useState } from 'react'
// import { Form } from 'antd'
import { Helmet } from 'react-helmet'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import EditProfile from '3box-profile-edit-react'
import EditProfile from '3box-profile-edit-react'
import styles from './style.module.scss'
import {
  getBox,
  getPublicAppForOthers,
  getPublicProfileForOthers,
  getSpace,
} from '../../../ethereumConnections/3BoxHelper'
import { getUserAddress } from '../../../ethereumConnections/web3'

function Login({ loading, dispatch }) {

  const handleClick = e => {
    console.log('i clicked save and I liked it', e)
    console.log(boxElements.box)
    getPublicProfileForOthers(boxElements.currentUserAddr).then(profile => {
      getPublicAppForOthers(boxElements.currentUserAddr).then(appData => {
        console.log(appData)
        console.log(profile)
        const values = {
          userType: profile.userType,
          name: profile.name,
          avatar: profile.image[0].contentUrl,
        }
        dispatch({
          type: 'user/LOGIN',
          payload: values,
        })
      })
    })
    // boxElements.box.getProfile(boxElements.currentUserAddr).then((profile)=>{
    //   console.log(profile)
    // })
  }

  const [boxElements, setBoxElements] = useState(null)

  useEffect(() => {
    if (!loading) {
      const box = getBox()
      console.log(box)
      const space = getSpace()
      const currentUserAddr = getUserAddress()
      setBoxElements({ ...{ box, space, currentUserAddr } })
    }
  }, [loading])

  return (
    <div>
      <Helmet title="Login" />
      <div className={`${styles.title} login-heading`}>
        <h1>{/*<strong>WELCOME TO CLEAN UI REACT - REACT REDUX ADMIN TEMPLATE</strong>*/}</h1>
        {/*<p>*/}
        {/*  Pluggable enterprise-level react application framework.*/}
        {/*  <br />*/}
        {/*  An excellent front-end solution for web applications built upon Ant Design and UmiJS.*/}
        {/*  <br />*/}
        {/*  Credentials for testing purposes - <strong>admin@mediatec.org</strong> /{' '}*/}
        {/*  <strong>cleanui</strong>*/}
        {/*</p>*/}
      </div>
      <div className={styles.block}>
        <div className="row">
          <div className="col-xl-12">
            {!boxElements ? (
              'loading...'
            ) : (
              <EditProfile
                {...boxElements}
                onSaveComplete={handleClick}
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
            )}


          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ user, dispatch }) => ({ loading: user.loading, dispatch })

export default connect(mapStateToProps)(Login)
