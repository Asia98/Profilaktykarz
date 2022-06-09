import React from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import ProtectedRoute from './protected-route'

export default () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={require('@/home').default} />
      <ProtectedRoute path="/calendar" exact={true} component={require('@/calendar').default} />
      <Route path="/login" exact={true} component={require('@/auth/login').default} />
      <Route path="/signup" exact={true} component={require('@/auth/signup').default} />
      <ProtectedRoute path="/introduction-form" exact={true} component={require('@/introduction-form').default} />
      <ProtectedRoute path="/last-visits" exact={true} component={require('@/last-visits-view').default} />
      <ProtectedRoute path="/prevention" exact={true} component={require('@/prevention-view').default} />

      <Route component={() => <Redirect to={{pathname: '/'}} />} />
    </Switch>
  )
}
