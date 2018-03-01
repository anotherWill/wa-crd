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
import Home from '@/pages/Home'

ReactDOM.render(
  <AppContainer>
    <Router>
      <Switch>
        {/*<Route exact path="/" component={LoginContainer}/>*/}
        <Route path="/" component={Home}/>
        {/*<Redirect to="/home"/>*/}
      </Switch>
    </Router>
  </AppContainer>,
  document.getElementById('main')
)

if (module.hot) {
  module.hot.accept()
}
