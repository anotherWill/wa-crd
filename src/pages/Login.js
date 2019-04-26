import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Icon, Input, Button, Checkbox, message,
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'
import Cookies from 'js-cookie'

class NormalLoginForm extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
        console.log('Received values of form: ', values)
      }
    })
  }

  async login(values) {
    let param = {
      name: values.userName,
      password: values.password,
    }
    const result = await axios(api.login, 'POST', param)
    if (result.data.ret_code === 'Success') {
      message.success('登录成功！', 2)
      setTimeout(() => {
        this.context.router.history.push({ pathname: '/', state: { isLogined: true } })
      }, 1500)
    } else {
      message.error(result.data.ret_msg, 2)
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ height: 0 }}>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ margin: '0 auto', width: 320, paddingTop: 50 }}>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: 320, display: 'block' }}>
              登录222
          </Button>
            或者 <Link to={{ pathname: "/register" }}>去注册账号!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)

export default WrappedNormalLoginForm