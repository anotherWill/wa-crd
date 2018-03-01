import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import MenuBar from '@/pages/MenuBar'
import routes from '@/pages/Routes/Routes'

const { Header, Content, Footer } = Layout

const Home = (props) => {
  return (
    <Layout className="sider_layout" style={{ minHeight: '100vh' }}>
      <MenuBar />
      <Layout>
        <Content>
          <Header className="ant-menu-dark">Header</Header>
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
            <Redirect to="/" />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          i m footeri m footeri m footeri m footeri m footeri m footer
        </Footer>
      </Layout>
    </Layout>
  )
}

export default Home
