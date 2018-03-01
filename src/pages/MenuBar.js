import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Layout, Icon, Button } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import axios from '@/utils/axios'
import api from '@/utils/api'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

class MenuBar extends React.Component {
  state = {
    collapsed: false,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.getTopics()
  }

  async getTopics() {
    const result = await axios(api.topics)
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed })
  }

  render() {
    const ctx = this.context.router.history
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="/option/one">
            <Link to={{pathname: "/option/one"}}>
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/option/two">
            <Link to={{pathname: "/option/two"}}>
              <Icon type="desktop" />
              <span>Option 2</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">
              <Link to={{pathname: "/user/tom"}}>
                Tom
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={{pathname: "/user/jack"}}>
                Jack
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default MenuBar