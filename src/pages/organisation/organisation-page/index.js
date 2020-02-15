import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Authorize from '../../../components/LayoutComponents/Authorize'

/**
 * @author Pranav Singhal <pranavsinghal96@gmail.com>
 * @author [Pranav Singhal](https://github.com/pranav-singhal)
 * @createdOn   14-02-2020, 16:28
 */

function OrganisationPage({ dispatch }) {
  useEffect(() => {
    dispatch({
      type: 'settings/CHANGE_SETTING',
      payload: {
        setting: 'isOrganisationPage',
        value: true,
      },
    })
  }, [])

  return (
    <Authorize roles={['admin']} redirect to="/dashboard/beta">
      This is sparta
    </Authorize>
  )
}
const mapStateToProps = ({ dispatch }) => ({ dispatch })
export default connect(mapStateToProps)(OrganisationPage)
