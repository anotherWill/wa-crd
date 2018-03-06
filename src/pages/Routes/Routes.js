import React from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import asyncComponent from '@/pages/asyncComponent'
import Welcome from '@/pages/Welcome'

// 菜单路由
export default [
  {
    path: '/',
    exact: true,
    main: Welcome
  },
  {
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