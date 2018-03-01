import React from 'react'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import asyncComponent from '@/asyncComponent'

// 菜单路由
export default [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    name: 'welcome'
  },
  {
    path: '/option/one',
    sidebar: () => <div>bubblegum!</div>,
    main: asyncComponent(() => import(
      /* webpackChunkName: "one" */
      /* webpackMode: "lazy" */
      '@/OptionOne'
    )),
  },
  {
    path: '/option/two',
    sidebar: () => <div>bubblegum!</div>,
    main: asyncComponent(() => import(
      /* webpackChunkName: "two" */
      /* webpackMode: "lazy" */
      '@/OptionTwo'
    ))
  },
  {
    path: '/user/Tom',
    sidebar: () => <div>shoelaces!</div>,
    main: asyncComponent(() => import(
      /* webpackChunkName: "tom" */
      /* webpackMode: "lazy" */
      '@/Users/Tom'
    ))
  }, {
    path: '/user/jack',
    sidebar: () => <div>shoelaces!</div>,
    main: asyncComponent(() => import(
      /* webpackChunkName: "jack" */
      /* webpackMode: "lazy" */
      '@/Users/Jack'
    ))
  }
]