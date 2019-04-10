require("babel-core/register")
require("babel-polyfill")

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import "antd/dist/antd.min.css"
import Home from '@/pages/Home'
import Welcome from '@/pages/Welcome'
import Login from '@/pages/Login'
import Register from '@/pages/Register'


ReactDOM.render(
  <AppContainer>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/register" component={Register}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  </AppContainer>,
  document.getElementById('main')
)

if (module.hot) {
  module.hot.accept()
}
