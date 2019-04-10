import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message
} from 'antd'
import axios from '@/utils/axios'
import api from '@/utils/api'


const { Option } = Select
const AutoCompleteOption = AutoComplete.Option

const residences = [{
  value: '花园一区',
  label: '花园一区',
  children: [{
    value: '二栋',
    label: '二栋',
    children: [{
      value: '三层',
      label: '三层',
    }],
  }],
}, {
  value: '花园二区',
  label: '花园二区',
  children: [{
    value: '四栋',
    label: '四栋',
    children: [{
      value: '六层',
      label: '六层',
    }],
  }],
}]

class RegistrationForm extends React.Component {

  state = {
    confirmDirty: false,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.register(values)
      }
    })
  }

  async register(values) {
    const result = await axios(api.register, 'POST', values)
    if (result.data.ret_code === 'Success') {
      message.success('注册成功，即将跳到登录页面', 2)
      setTimeout(() => {
        this.context.router.history.push('/loginPage')
      }, 2500)
    } else {
      message.success('注册失败', 2)
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!')
    } else {
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    )

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 480, margin: '0 auto', paddingTop: 50 }}>
        <Form.Item label="用户名">
          {getFieldDecorator('nickName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label="真实姓名">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入真实姓名!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" />
          )}
        </Form.Item>
        <Form.Item
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </Form.Item>
        <Form.Item
          label="居住地址"
        >
          {getFieldDecorator('address', {
            //initialValue: ['一区', '二区'],
            rules: [{ type: 'array', required: true, message: '请选择居住地址!' }],
          })(
            <Cascader options={residences} placeholder="请选择" />
          )}
        </Form.Item>
        <Form.Item
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button style={{ width: 320 }} type="primary" htmlType="submit">注册</Button>
        </Form.Item>
        或者 <Link to={{ pathname: "/loginPage" }}>去登录!</Link>
      </Form>
    )
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm)

export default WrappedRegistrationForm