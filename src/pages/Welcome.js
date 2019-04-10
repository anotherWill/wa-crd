import React from 'react'
import { Layout, Alert, Carousel, Collapse, Statistic, Row, Col, Icon, Comment, Tooltip, List, Divider } from 'antd'
import './welcome.css'
import pic1 from '../../static/images/1.jpg'
import pic2 from '../../static/images/2.jpg'
import pic3 from '../../static/images/3.jpg'
import pic4 from '../../static/images/4.jpg'
import moment from 'moment'

const Panel = Collapse.Panel

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
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
    author: 'Han Solo',
    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(1, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
  {
    actions: [],
    author: 'Han Solo',
    //avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: (
      <p>We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.</p>
    ),
    datetime: (
      <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
        <span>{moment().subtract(2, 'days').fromNow()}</span>
      </Tooltip>
    ),
  },
]


const Welcome = (props) => {
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
            expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
          >
            <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </div>
        <div style={{ flex: 2, background: 'white', padding: 12 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="用户数" value={1128} prefix={<Icon type="user" />} />
            </Col>
            <Col span={12}>
              <Statistic title="留言数" value={1128} prefix={<Icon type="mail" />} />
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

export default Welcome