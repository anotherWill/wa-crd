import React from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import SubOption from '@/pages/SubOption'
import { Container } from '@/pages/common'
// import styles from '@/pages/temp.css'
import '@/pages/temp.css'

const routes = [
  {
    path: '/option/one/sub1',
    text: 'Option 1 Sub',
  },{
    path: '/option/one/sub2',
    text: 'Option 2 Sub',
  }
]

const OptionOne = (props) => {
  return (
    <div>
      <Container>
        <div className="title">Option One Content</div>
        {
          routes.map((route, index) => {
            return (
              <div key={index}>
                <Link to={route.path}>{route.text}</Link>
              </div>
            )
          })
        }
        <div>
          <Route path={`/option/one/:type`} component={SubOption}></Route>
        </div>
      </Container>
    </div>
  )
}

export default OptionOne