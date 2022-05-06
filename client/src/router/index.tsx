import * as React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

export default () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={require('@/home').default} />
      <Route path="/calendar" exact={true} component={require('@/calendar').default} />
      <Route path="/login" exact={true} component={require('@/login').default} />
      <Route path="/signup" exact={true} component={require('@/signup').default} />

      <Route component={() => <Redirect to={{pathname: '/'}} />} />
    </Switch>
  )
}
