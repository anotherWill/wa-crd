import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'
import Cookies from 'js-cookie'
const { TextArea } = Input
class AddNotice extends React.Component {

  state = {
    title: '',
    content: '',
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
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
        this.addNotice(values)
      }
    })
  }

  addNotice = async (values) => {
    const userid = Cookies.get('userId')
    const result = await axios(api.addNotice, 'POST', values)
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
        <Form.Item label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入内容!' }],
          })(
            <TextArea rows={14} />
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

const AddNoticeForm = Form.create({ name: 'notice' })(AddNotice)
export default AddNoticeForm