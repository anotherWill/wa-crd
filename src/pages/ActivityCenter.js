import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'
import Cookies from 'js-cookie'

class ActivityCenter extends React.Component {

  state = {
    list: [],
    hadJoined: false
  }

  componentDidMount() {
    this.getActivity()
  }

  getActivity = async () => {
    const result = await axios(api.getActivity, 'POST', {})
    const userid = Cookies.get('userId')
    if (result.data.ret_code === 'Success') {
      let list = result.data.list
      let hasJoined = list.some((l ) => l.userid === +userid)
      this.setState({ list: result.data.list, hasJoined })
    }
  }

  joinActivity = async (record) => {
    const result = await axios(api.joinActivity, 'POST', { id: record.id, userid: Cookies.get('userId') })
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 2)
      this.getActivity()
    } else {
      message.success('活动参加失败', 1500)
    }
  }

  unJoinActivity = async (record) => {
    const result = await axios(api.unJoinActivity, 'POST', { id: record.id, userid: Cookies.get('userId') })
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 2)
      this.getActivity()
    } else {
      message.success('取消失败', 1500)
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
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        const userid = Cookies.get('userId')
        const joined = record.userid === +userid
        return(
        <span>
          {
             joined ?
            <Button type="primary" style={{ marginRight: 10 }} onClick={() => this.unJoinActivity(record)} >
            取消参加
            </Button> :
            <Button disabled={this.state.hasJoined} style={{ marginRight: 10 }} onClick={() => this.joinActivity(record)} >
            参加活动
            </Button>
          }
          
        </span>
      )},
    }]
    return (
      <div style={{ margin: 18, background: 'white' }}>
      <Table
        columns={columns}
        expandedRowRender={record => <p style={{ margin: 0 }}>活动详情：{record.description}</p>}
        dataSource={this.state.list} />
        </div>
    )
  }
}

export default ActivityCenter