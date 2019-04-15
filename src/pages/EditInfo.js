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
    username: '',
    nickName: '',
    phone: '',
    address: '',
    favor: '',
    sex: '',
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.getUserInfo()
  }

  getUserInfo = async () => {
    const userid = Cookies.get('userId')
    const result = await axios(api.getUserInfo, 'POST', {userid})
    if (result.data.ret_code === 'Success') {
      let info = result.data.list[0]
      this.setState({ 
        username: info.userName, 
        nickName: info.nickName,
        phone: info.phone, 
        address: info.address,
        favor: info.favor, 
        sex: info.sex 
      })
    }
  }

  handleChange = (value) => {
    this.setState({ sex: value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.updateInfo(values)
      }
    })
  }

  updateInfo = async (values) => {
    const userid = Cookies.get('userId')
    const result = await axios(api.updateInfo, 'POST', {userid, ...values})
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 2)
      setTimeout(() => {
        this.context.router.history.push('/')
      }, 1500)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    )
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    const { username, nickName, phone, address, favor, sex } = this.state
    return (
      <div style={{ margin: 18, background: 'white' }}>
      <h2 style={{ height: 48, lineHeight: '48px', textAlign: 'center', background: '#fff'}}>信息修改頁面</h2>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 480, margin: '0 auto', paddingTop: 50 }}>
        <Form.Item label="用户名">
          {getFieldDecorator('nickName', {
            initialValue: nickName,
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="真实姓名">
          {getFieldDecorator('userName', {
            initialValue: username,
            rules: [{ required: true, message: '请输入真实姓名!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="居住地址"
        >
          {getFieldDecorator('address', {
            initialValue: address,
            rules: [{ required: true, message: '請輸入地址!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            initialValue:phone,
            rules: [{ required: true, message: '请输入手机号码!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item
          label="興趣愛好"
        >
          {getFieldDecorator('favor', {
            initialValue: favor,
            rules: [{ required: true, message: '请输入興趣愛好!' }],
          })(
            <Input style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item
          label="性別"
        >
          {getFieldDecorator('sex', {
            initialValue: sex,
            rules: [{ required: true, message: '请选择性别!' }],
          })(
            <Select style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="男">男</Option>
              <Option value="女">女</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{ width: 320 }} type="primary" htmlType="submit">提交更改</Button>
        </Form.Item>
      </Form>
      </div>
    )
  }
}

const JoinedActivityForm = Form.create({ name: 'userinfo' })(JoinedActivity)
export default JoinedActivityForm