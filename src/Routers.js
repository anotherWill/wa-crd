import React from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
// import Welcome from '@/Welcome'
// import OptionOne from '@/OptionOne'
// import OptionTwo from '@/OptionTwo'
// import { Tom, Jack } from '@/Users/users'
import r from '@/router'
import AsyncLoader from './AsyncLoader'
import asyncComponent from './asyncComponent'

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    // main: () => <Welcome />
    keypath: './Welcome',
    name: 'welcome'
  },
  {
    path: '/option/one',
    sidebar: () => <div>bubblegum!</div>,
    //main: () => <OptionOne />,
    keypath: 'OptionOne',
    name: 'one',
    async: asyncComponent(() => import(
      /* webpackChunkName: "one" */
      /* webpackMode: "lazy" */
      '@/OptionOne'
    )),
  },
  {
    path: '/option/two',
    sidebar: () => <div>bubblegum!</div>,
    // main: () => <OptionTwo />,
    keypath: 'OptionTwo',
    name: 'two',
    async: asyncComponent(() => import(
      /* webpackChunkName: "two" */
      /* webpackMode: "lazy" */
      '@/OptionTwo'
    ))
  },
  {
    path: '/user/Tom',
    sidebar: () => <div>shoelaces!</div>,
    // main: () => <Tom />,
    keypath: 'Users/Tom',
    name: 'tom',
    async: asyncComponent(() => import(
      /* webpackChunkName: "tom" */
      /* webpackMode: "lazy" */
      '@/Users/Tom'
    ))
  }, {
    path: '/user/jack',
    sidebar: () => <div>shoelaces!</div>,
    // main: () => <Jack />,
    keypath: 'Users/Jack',
    name: 'jack',
    async: asyncComponent(() => import(
      /* webpackChunkName: "jack" */
      /* webpackMode: "lazy" */
      '@/Users/Jack'
    ))
  }
]

class Routers extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          {
            routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.async}
                  //render={() => <AsyncLoader path={route.keypath} />}
                />
              )
            })
          }
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

export default Routers

// const Routers = (props) => {
//   console.log(props)
//   return (
//     <div>
//       <Breadcrumb style={{ margin: '8px 24px' }}>
//         <Breadcrumb.Item>User</Breadcrumb.Item>
//         <Breadcrumb.Item>Bill</Breadcrumb.Item>
//       </Breadcrumb>
//       <Switch>
//         <Route exact path="/" component={Welcome} />
//         <Route path={`${routerUrl.optionOne}`} component={OptionOne} />
//         <Route path={`${routerUrl.optionTwo}`} component={OptionTwo} />
//         <Redirect to="/" />
//       </Switch>
//     </div>
//   )
// }

// export default Routers