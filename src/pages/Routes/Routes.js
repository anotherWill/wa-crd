import React from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import asyncComponent from '@/pages/asyncComponent'
import Welcome from '@/pages/Welcome'
import Home from '@/pages/Home'
import Loadable from 'react-loadable'
const Loading = () => {
	return <div>加载中......</div>
}


// 菜单路由
export default [
  {
    path: '/',
    exact: true,
    main: Welcome
  },
  {
    path: '/user/applyActivity',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackChunkName: "applyActivity" */
      /* webpackMode: "lazy" */
      '@/pages/ApplyActivity'
    )),
  },{
    path: '/user/joinedActivity',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/JoinedActivity'
    )),
  }, {
    path: '/activity/review',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/ReviewActivity'
    )),
  }, {
    path: '/activity/center',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/ActivityCenter'
    )),
  },{
    path: '/user/edit',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/EditInfo'
    )),
  },{
    path: '/manage',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/UserList'
    )),
  },{
    path: '/activity/notice',
    // exact: true,
    main: asyncComponent(() => import(
      /* webpackMode: "lazy" */
      '@/pages/AddNotice'
    )),
  },{
    path: '/option/one',
    main: asyncComponent(() => import(
      /* webpackChunkName: "one" */
      /* webpackMode: "lazy" */
      '@/pages/OptionOne'
    )),
  },
  {
    path: '/option/two',
    main: asyncComponent(() => import(
      /* webpackChunkName: "two" */
      /* webpackMode: "lazy" */
      '@/pages/OptionTwo'
    ))
  },
  {
    path: '/user/Tom',
    main: asyncComponent(() => import(
      /* webpackChunkName: "tom" */
      /* webpackMode: "lazy" */
      '@/pages/Users/Tom'
    ))
  }, {
    path: '/user/jack',
    main: asyncComponent(() => import(
      /* webpackChunkName: "jack" */
      /* webpackMode: "lazy" */
      '@/pages/Users/Jack'
    ))
  }
]