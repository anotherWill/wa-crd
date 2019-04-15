import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'

class UserList extends React.Component {

  state = {
    list: []
  }

  componentDidMount() {
    this.getAllUser()
  }

  getAllUser = async () => {
    const result = await axios(api.getAllUser, 'POST', {})
    if (result.data.ret_code === 'Success') {
      let list = result.data.list
      this.setState({ list: result.data.list })
    }
  }

  setAdmin = async (record) => {
    const result = await axios(api.setAdmin, 'POST', {id: record.id})
    if (result.data.ret_code === 'Success') {
      message.success('操作成功', 2)
      this.getAllUser()
    }
  }

  setNormal = async (record) => {
    const result = await axios(api.setNormal, 'POST', {id: record.id})
    if (result.data.ret_code === 'Success') {
      message.success('操作成功', 2)
      this.getAllUser()
    }
  }

  deleteUser = async (record) => {
    const result = await axios(api.deleteUser, 'POST', {id: record.id})
    if (result.data.ret_code === 'Success') {
      message.success('操作成功', 2)
      this.getAllUser()
    }
  }

  render() {
    const columns = [{
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '登录名',
      dataIndex: 'nickName',
      key: 'nickName',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => { 
        let isAdmin = record.type === 'admin'
        return(
        <span>
          <Button disabled={isAdmin} style={{ marginRight: 10}} onClick={() => this.setAdmin(record)} >设为管理员</Button>
          <Button disabled={!isAdmin} style={{ marginRight: 10}} onClick={() => this.setNormal(record)} >设为普通用户</Button>
          <Button onClick={() => this.deleteUser(record)} >注销</Button>
        </span>
      )},
    }]

    return (
      <Card
        title="用户列表"
        headStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        style={{ margin: 20 }}
      >
        <Table
          columns={columns}
          dataSource={this.state.list} />
      </Card>
    )
  }
}

export default UserList