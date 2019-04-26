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
const Option = Select.Option

class AddNotice extends React.Component {

  state = {
    list: [],
    title: '',
    content: '',
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount () {
    this.getActivity()
  }

  getActivity = async () => {
    let result = await axios(api.getActivity, 'POST', {})
    if (result.data.ret_code === 'Success') {
      this.setState({ list: result.data.list })
    }
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
    const { list } = this.state
    return (
      <div style={{ margin: 18, background: 'white' }}>
      <h2 style={{ height: 48, lineHeight: '48px', textAlign: 'center', background: '#fff'}}>新增公告</h2>
      <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 480, margin: '0 auto', paddingTop: 50 }}>
        <Form.Item label="选择活动">
          {getFieldDecorator('activity', {
            rules: [{ required: true, message: '请选择活动!' }],
          })(
            <Select>
              { list.map((item, index) => {
                return <Option value={item.id}>{item.name}</Option>
              })}
            </Select>
            
          )}
        </Form.Item>
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