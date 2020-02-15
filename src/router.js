import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'
import { connect } from 'react-redux'
import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'
import { getUserTypeUrl } from './services/user'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },

  // Dashboards
  {
    path: '/dashboard/alpha',
    component: loadable(() => import('pages/dashboard/alpha')),
  },
  {
    path: '/new-campaign',
    component: loadable(() => import('pages/new-campaign')),
  },
  {
    path: '/campaigns',
    component: loadable(() => import('pages/campaigns')),
    exact: true,
  },
  {
    path: '/campaigns/:campaign',
    component: loadable(() => import('pages/campaign-page')),
  },
  {
    path: '/organisations/:organisationName',
    component: loadable(() => import('pages/organisation/organisation-page')),
  },
]

const mapStateToProps = ({ user }) => {
  return { userType: user.userType }
}
@connect(mapStateToProps)
class Router extends React.Component {
  render() {
    const { history, userType } = this.props
    const to = getUserTypeUrl(userType)
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={to} />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
