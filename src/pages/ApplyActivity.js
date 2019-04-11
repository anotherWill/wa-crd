import React from 'react'
import PropTypes from 'prop-types'
import {
  Form, Input, Select, Button, message, DatePicker, Card, Table, Divider, Tag, Tabs
} from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'
import locale from 'antd/lib/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import Cookies from 'js-cookie'


moment.locale('zh-cn')
const { MonthPicker, RangePicker } = DatePicker
const { TextArea } = Input
const TabPane = Tabs.TabPane

class ApplyActivity extends React.Component {

  state = {
    confirmDirty: false,
    visible: false,
    list: [],
    activityTab: '1',
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.getPersonalActivity()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {

      const rangeTimeValue = values['range-time-picker']
      const fields = {
        ...values,
        'range-time-picker': [
          rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
          rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
        ],
        userid: Cookies.get('userId')
      }
      if (!err) {
        this.applyActivity(fields)
      }
    })
  }

  getPersonalActivity = async () => {
    const userid = Cookies.get('userId')
    const result = await axios(api.getPersonalActivity, 'POST', { userid })
    if (result.data.ret_code === 'Success') {
      let list = result.data.list
      for (let i = 0; i < list.length; i++) {
        list[i].key = i
        switch (list[i].status) {
          case 'pending':
            list[i].status = '待审核'
            break
          case 'pass':
            list[i].status = '审核通过'
            break
          case 'back':
            list[i].status = '驳回'
            break
        }
      }
      this.setState({ list: result.data.list })
    }
  }

  async applyActivity(values) {
    const result = await axios(api.applyActivity, 'POST', values)
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 2)
      setTimeout(() => {
        this.setState({ activityTab: '1' }, () => {
          this.getPersonalActivity()
        })
      }, 2500)
    } else {
      message.success('活动申请失败, 请于管理员联系', 2)
    }
  }

  deleteActivity = async (record) => {
    console.log(record)
    const result = await axios(api.deleteActivity, 'POST', { activityId: record.id })
    if (result.data.ret_code === 'Success') {
      message.success(result.data.ret_msg, 2)
      this.getPersonalActivity()
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
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
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={() => this.deleteActivity(record) } >删除</a>
        </span>
      ),
    }]
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

    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: '请选择活动时间!' }],
    }
    const { list } = this.state
    return (
      <Tabs onChange={(activeKey) => { this.setState({ activityTab: activeKey }) }} activeKey={this.state.activityTab} defaultActiveKey="1" style={{ background: 'white', margin: 20 }} tabBarStyle={{ height: 50 }}>
        <TabPane tab="我申请的活动" key="1">
          <Table columns={columns} dataSource={list} />
        </TabPane>
        <TabPane tab="申请活动" key="2">
          <Card
            title="活动申请页"
            headStyle={{ textAlign: 'center', fontWeight: 'bold' }}
            style={{ margin: 20 }}
          >
            <Form id="myForm" {...formItemLayout} onSubmit={this.handleSubmit} style={{ width: 480, margin: '0 auto', paddingTop: 50 }}>
              <Form.Item label="活动名称">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '活动名称!' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label="活动时间"
              >
                {getFieldDecorator('range-time-picker', rangeConfig)(
                  <RangePicker style={{ width: '100%' }} locale={locale} showTime format="YYYY-MM-DD HH:mm:ss" placeholder={['开始时间', '结束时间']} />
                )}
              </Form.Item>
              <Form.Item
                label="活动地点"
              >
                {getFieldDecorator('address', {
                  rules: [{
                    required: true, message: '请输入活动地点!',
                  }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item
                label="活动描述"
              >
                {getFieldDecorator('description', {
                  rules: [{ required: true, message: '请输入活动描述!' }],
                })(
                  <TextArea rows={4} style={{ width: '100%' }} />
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button style={{ width: 320 }} type="primary" htmlType="submit">申请</Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    )
  }
}

const ApplyActivityForm = Form.create({ name: 'register' })(ApplyActivity)

export default ApplyActivityForm
