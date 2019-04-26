import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Icon, Button, message } from 'antd'
import { Route, Switch, Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import MenuBar from '@/pages/MenuBar'
import routes from '@/pages/Routes/Routes'
import axios from '@/utils/axios'
import api from '@/utils/api'

const { Header, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Home extends React.Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    const ls = this.props.location.state
    const isLogined = ls && ls.isLogined
    if (isLogined) {
      Cookies.set('isLogined', '1')
    }
    if (!isLogined && !Cookies.get('isLogined')) {
      this.context.router.history.push('/login')
    }
  }

  checkLogin = () => {
    let skey = Cookies.get('skey')
    if (!skey) {
      this.context.router.history.push('/login')
    }
  }

  logout = async () => {
    let result = await axios(api.logout, 'POST', {})
    if (result.data.ret_code === 'Success') {
      Cookies.remove('isLogined')
      this.context.router.history.push('/login')
    } else {
      message.error('接口调用失败！')
    }
  }

  render() {
    const userType = Cookies.get('userType')
    const isAdmin = userType === 'admin'
    return (
      <Layout className="sider_layout" style={{ minHeight: '100vh' }}>
        <Layout>
          <Content>
            <Header style={{ background: '#fff', padding: "0 24px" }}>
              <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px', display: 'inline-block' }}
              >
                <Menu.Item key="home">
                  <Link to={{ pathname: "/" }}>
                    <Icon type="home" />
                    <span>首页</span>
                  </Link>
                </Menu.Item>
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="user" />个人中心</span>}>
                  <Menu.Item key="user:1">
                    <Link to={{ pathname: "/user/applyActivity" }}>
                      <Icon type="profile" />
                      <span>我的活动申请</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="user:2">
                    <Link to={{ pathname: "/user/joinedActivity" }}>
                      <Icon type="paper-clip" />
                      <span>已参加的活动</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="user:3">
                    <Link to={{ pathname: "/user/edit" }}>
                      <Icon type="edit" />
                      <span>个人信息修改</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="heart" />活动中心</span>}>
                  <Menu.Item key="activity:1">
                    <Link to={{ pathname: "/activity/center" }}>
                      <Icon type="heart" />
                      <span>活动中心</span>
                    </Link>
                  </Menu.Item>
                  {isAdmin ? <Menu.Item key="activity:2">
                    <Link to={{ pathname: "/activity/review" }}>
                      <Icon type="filter" />
                      <span>活动审核</span>
                    </Link>
                  </Menu.Item> : null}
                  {isAdmin ? <Menu.Item key="activity:3">
                    <Link to={{ pathname: "/activity/notice" }}>
                      <Icon type="notification" />
                      <span>新增公告</span>
                    </Link>
                  </Menu.Item> : null}
                  {/* {isAdmin ? <Menu.Item key="activity:4">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="mail" />
                      <span>留言管理</span>
                    </Link>
                  </Menu.Item> : null} */}
                </SubMenu>
                {isAdmin ? 
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="team" />会员管理</span>}>
                  <Menu.Item key="manage:1">
                    <Link to={{ pathname: "/manage" }}>
                      <Icon type="ordered-list" />
                      <span>用户列表</span>
                    </Link>
                  </Menu.Item>
                </SubMenu> : null}
              </Menu>
              <Button onClick={this.logout} icon="logout" style={{ float: 'right', marginTop: 16 }}>注销</Button>
            </Header>
            <Switch>
              {
                routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={route.main}
                    />
                  )
                })
              }
            </Switch>
          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default Home
