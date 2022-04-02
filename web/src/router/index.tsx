import * as React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

export default () => {
  return (
    <Switch>
      <Route path="/" exact={true} component={require('@/home').default} />

      <Route component={() => <Redirect to={{pathname: '/'}} />} />
    </Switch>
  )
}
