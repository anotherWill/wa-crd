import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd'
import { Route, Switch, Redirect, NavLink, Link } from 'react-router-dom'
import MenuBar from '@/pages/MenuBar'
import routes from '@/pages/Routes/Routes'
import axios from '@/utils/axios'
import api from '@/utils/api'

const { Header, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup



class Home extends React.Component {

  // static contextTypes = {
  //   router: PropTypes.object.isRequired
  // }

  constructor(props) {
    super(props)
    // console.log(this.context)
    // this.context.router.history.listen(() => {
    //   console.log('adfadf')
    // })
  }

  logout = async () => {
    let result = await axios(api.logout, 'POST', {})
    console.log(result)
  }

  render() {
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
                    <Link to={{ pathname: "/option/one" }}>
                      <Icon type="paper-clip" />
                      <span>已参加的活动</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="user:3">
                    <Link to={{ pathname: "/option/two" }}>
                      <Icon type="edit" />
                      <span>个人信息修改</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="heart" />活动中心</span>}>
                  <Menu.Item key="activity:1">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="heart" />
                      <span>活动中心</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="activity:2">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="filter" />
                      <span>活动审核</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="activity:3">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="money-collect" />
                      <span>金额管理</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="activity:4">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="mail" />
                      <span>活动留言管理</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu title={<span className="submenu-title-wrapper"><Icon type="team" />会员管理</span>}>
                  <Menu.Item key="user:1">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="ordered-list" />
                      <span>用户列表</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="user:2">
                    <Link to={{ pathname: "/activity" }}>
                      <Icon type="usergroup-add" />
                      <span>添加用户</span>
                    </Link>
                  </Menu.Item>
                </SubMenu>
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
              <Redirect to="/home" />
            </Switch>
          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default Home
