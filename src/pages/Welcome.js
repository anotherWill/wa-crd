import React from 'react'
import { Layout, Alert, Carousel, Collapse, Statistic, Row, Col, Icon, Comment, Tooltip, List, Divider } from 'antd'
import './welcome.css'
import pic1 from '../../static/images/1.jpg'
import pic2 from '../../static/images/2.jpg'
import pic3 from '../../static/images/3.jpg'
import pic4 from '../../static/images/4.jpg'
import moment from 'moment'
import axios from '@/utils/axios'
import api from '@/utils/api'

const Panel = Collapse.Panel

const text = `
  这次的活动组织得真好！玩得真开心！
`

const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden',
}


const data = [
  {
    actions: [],
    author: 'User01',
    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>今天的活动组织得真好！玩得真开心！</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [],
    author: 'User02',
    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>楼上说得对！</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
]


class Welcome extends React.Component {

  state = {
    notice: [],
    activeKey: []
  }

  componentDidMount() {
    // this.getNotice()
  }

  // getNotice = async () => {
  //   const result = await axios(api.getNotice, 'POST', {})
  //   if (result.data.ret_code === 'Success') {
  //     this.setState({ notice: result.data.list })
  //   }
  // }

  render() {
    return (
      <Layout>
        <Carousel autoplay style={{ height: 400 }}>
          <div><img src={pic1} /></div>
          <div><img src={pic2} /></div>
          <div><img src={pic3} /></div>
          <div><img src={pic4} /></div>
        </Carousel>
        <div style={{ display: 'flex', marginTop: 24 }}>
          <div style={{ flex: 4 }}>
            <Alert message="活动信息公示栏" type="info" />
            <Collapse
              bordered={false}
              defaultActiveKey={['1']}
              activeKey={this.state.activeKey[1] || '1'}
              onChange={((key) => { this.setState({ activeKey: key })})}
              expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
              {
                this.state.notice.map((n, i) => (
                  <Panel header={n.title} key={String(i + 1)} style={customPanelStyle}>
                    <p>{n.content}</p>
                  </Panel>
                ))
              }
            </Collapse>
          </div>
          <div style={{ flex: 2, background: 'white', padding: 12 }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="用户数" value={12} prefix={<Icon type="user" />} />
              </Col>
              <Col span={12}>
                <Statistic title="留言数" value={34} prefix={<Icon type="mail" />} />
              </Col>
            </Row>
            <Divider orientation="left">最新留言</Divider>
            <div>
              <List
                className="comment-list"
                //header={`${data.length} 留言`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <Comment
                    actions={item.actions}
                    author={item.author}
                    avatar={item.avatar}
                    content={item.content}
                    datetime={item.datetime}
                  />
                )}
              />
            </div>
          </div>
        </div>

      </Layout>
    )
  }
}

export default Welcome