import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'

const { Header, Content, Footer } = Layout

class ApplyActivity extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    return (
      <div>活动申请页面</div>
    )
  }
}

export default ApplyActivity