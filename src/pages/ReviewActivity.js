import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'

class ReviewActivity extends React.Component {

  state = {
    list: []
  }

  componentDidMount() {
    this.getNewActivity()
  }

  getNewActivity = async () => {
    this.setState({ loading: true })
    const result = await axios(api.getNewActivity, 'POST', {})
    this.setState({ loading: false })
    if (result.data.ret_code === 'Success') {
      let list = result.data.list
      this.setState({ list: result.data.list })
    }
  }

  passActivity = async (record) => {
    const result = await axios(api.passActivity, 'POST', {id: record.id})
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 1.5)
      this.getNewActivity()
    } else {
      message.success('操作失败', 1500)
    }
  }

  returnActivity = async (record) => {
    const result = await axios(api.returnActivity, 'POST', {id: record.id})
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 1.5)
      this.getNewActivity()
    } else {
      message.success('操作失败', 1500)
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
      render: (text, record) => (
        <span>
          <Button style={{ marginRight: 10}} onClick={() => this.passActivity(record)} >通过</Button>
          <Button onClick={() => this.returnActivity(record)} >驳回修改</Button>
        </span>
      ),
    }]

    return (
      <Card
        title="待审核列表"
        headStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        style={{ margin: 20 }}
      >
        <Button 
          style={{ marginBottom: 10, marginLeft: 10}} 
          type="primary" 
          icon="reload" 
          onClick={this.getNewActivity}>刷新</Button>
        <Table
          loading={this.state.loading}
          columns={columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>活动描述：{record.description}</p>}
          dataSource={this.state.list} />
      </Card>
    )
  }
}

export default ReviewActivity