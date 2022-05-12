import React from 'react'

import {Route, RouteProps} from 'react-router-dom'

import Login from '@/auth/login'

const ProtectedRoute = (props: RouteProps) =>
  localStorage.getItem('profilaktykarzUser') ? <Route {...props} /> : <Login />

export default ProtectedRoute
