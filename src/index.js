require("babel-core/register")
require("babel-polyfill")
import React from 'react'  // 必须引入
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import BasicExample from './BasicExample'
import Home from './Home'

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
