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

            {/*<div className={styles.inner}>*/}
            {/*  <div className={styles.form}>*/}
            {/*    <h4 className="text-uppercase">*/}
            {/*      <strong>Please log in</strong>*/}
            {/*    </h4>*/}
            {/*    <br />*/}
            {/*    <Form layout="vertical" hideRequiredMark onSubmit={this.onSubmit}>*/}
            {/*      <Form.Item label="Email">*/}
            {/*        {form.getFieldDecorator('email', {*/}
            {/*          initialValue: 'admin@mediatec.org',*/}
            {/*          rules: [{ required: true, message: 'Please input your e-mail address' }],*/}
            {/*        })(<Input size="default" />)}*/}
            {/*      </Form.Item>*/}
            {/*      <Form.Item label="Password">*/}
            {/*        {form.getFieldDecorator('password', {*/}
            {/*          initialValue: 'cleanui',*/}
            {/*          rules: [{ required: true, message: 'Please input your password' }],*/}
            {/*        })(<Input size="default" type="password" />)}*/}
            {/*      </Form.Item>*/}
            {/*      <Form.Item>*/}
            {/*        {form.getFieldDecorator('remember', {*/}
            {/*          valuePropName: 'checked',*/}
            {/*          initialValue: true,*/}
            {/*        })(<Checkbox>Remember me</Checkbox>)}*/}
            {/*        <Link*/}
            {/*          to="/user/forgot"*/}
            {/*          className="utils__link--blue utils__link--underlined pull-right"*/}
            {/*        >*/}
            {/*          Forgot password?*/}
            {/*        </Link>*/}
            {/*      </Form.Item>*/}
            {/*      <div className="form-actions">*/}
            {/*        <Button*/}
            {/*          type="primary"*/}
            {/*          className="width-150 mr-4"*/}
            {/*          htmlType="submit"*/}
            {/*          loading={loading}*/}
            {/*        >*/}
            {/*          Login*/}
            {/*        </Button>*/}
            {/*        <span className="ml-3 register-link">*/}
            {/*          <a*/}
            {/*            href="javascript: void(0);"*/}
            {/*            className="text-primary utils__link--underlined"*/}
            {/*          >*/}
            {/*            Register*/}
            {/*          </a>{' '}*/}
            {/*          if you don&#39;t have account*/}
            {/*        </span>*/}
            {/*      </div>*/}
            {/*      <div className="form-group">*/}
            {/*        <p>Use another service to Log In</p>*/}
            {/*        <div className="mt-2">*/}
            {/*          <a href="javascript: void(0);" className="btn btn-icon mr-2">*/}
            {/*            <i className="icmn-facebook" />*/}
            {/*          </a>*/}
            {/*          <a href="javascript: void(0);" className="btn btn-icon mr-2">*/}
            {/*            <i className="icmn-google" />*/}
            {/*          </a>*/}
            {/*          <a href="javascript: void(0);" className="btn btn-icon mr-2">*/}
            {/*            <i className="icmn-windows" />*/}
            {/*          </a>*/}
            {/*          <a href="javascript: void(0);" className="btn btn-icon mr-2">*/}
            {/*            <i className="icmn-twitter" />*/}
            {/*          </a>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </Form>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ user, dispatch }) => ({ loading: user.loading, dispatch })

export default connect(mapStateToProps)(Login)
