import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'
import Cookies from 'js-cookie'

class JoinedActivity extends React.Component {

  state = {
    list: [],
  }

  componentDidMount() {
    this.getJoinedActivity()
  }

  getJoinedActivity = async () => {
    const userid = Cookies.get('userId')
    const result = await axios(api.getJoinedActivity, 'POST', {userid})
    if (result.data.ret_code === 'Success') {
      console.log(new Date().getTime())
      let list = result.data.list
      this.setState({ list: result.data.list })
    }
  }


  render() {
    const columns = [{
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
    }, {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
    }, {
      title: '活动地址',
      dataIndex: 'address',
      key: 'address',
    }]
    return (
      <div style={{ margin: 18, background: 'white' }}>
      <h2 style={{ height: 48, lineHeight: '48px', textAlign: 'center', background: '#fff'}}>已參加的活動</h2>
      <Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>活动详情：{record.description}</p>}
        dataSource={this.state.list} />
        </div>
    )
  }
}

export default JoinedActivity