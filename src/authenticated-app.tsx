import React, { useState } from 'react';
import { ClassListScreen } from 'screens/classList'
import { CalendarScreen } from 'screens/calendar'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';
import { } from 'react-router-dom';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';

const { Header, Sider, Content, Footer } = Layout;

const defaultProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileOutlined />,
        component: { CalendarScreen },
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/sub-page1',
            name: '一级页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: '/admin/sub-page2',
            name: '二级页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
        ],
      },
      {
        name: '列表页',
        icon: <TabletOutlined />,
        path: '/list',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: '一级列表页面',
            icon: <CrownOutlined />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: '一一级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page2',
                name: '一二级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page3',
                name: '一三级列表页面',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
            ],
          },
          {
            path: '/list/sub-page2',
            name: '二级列表页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: '/list/sub-page3',
            name: '三级列表页面',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
        ],
      },
      {
        path: 'https://ant.design',
        name: 'Ant Design 官网外链',
        icon: <AntDesignOutlined />,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
/* const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="Name">Yongrui Pan</Descriptions.Item>
    <Descriptions.Item label="Contact">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Join Date">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Update Date">2017-10-10</Descriptions.Item>
  </Descriptions>
); */

export const AuthenticatedApp = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
  const [pathname, setPathname] = useState('/welcome');
  const { logout, user } = useAuth()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <BrowserRouter>

        <Sider collapsible>
          <div className="logo" style={{
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.3)'
          }
          } />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Link to="/calendar">Calendar</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/my-classes">My Classes</Link>
            </Menu.Item>
            <Menu.Item key="9">
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ margin: ' 0 0.5rem', backgroundColor: '#fff' }}>
            <HeaderRight>
              <Dropdown overlay={<Menu>
                <Menu.Item key='logout'>
                  <a onClick={logout}>Logout</a>
                </Menu.Item>
              </Menu>}
              >
                <a onClick={e => e.preventDefault()}>
                  {console.log(user)}
                  Hi, {user?.firstName}
                </a>
              </Dropdown>
            </HeaderRight>
          </Header>
          <Content style={{ margin: '0.5rem', backgroundColor: '#fff' }}>
            <Routes>
              <Route path='/calendar' element={<CalendarScreen />}></Route>
              <Route path='/my-classes' element={<ClassListScreen />}></Route>
            </Routes>

          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>©2021 </Footer>
        </Layout>
      </BrowserRouter>

    </Layout>
  );

}
/* 
const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <Header between>
      <HeaderLeft gap>
        <h2>Logo</h2>
        <h2>Class</h2>
        <h2>User</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown overlay={<Menu>
          <Menu.Item key='logout'>
            <a onClick={logout}>Logout</a>
          </Menu.Item>
        </Menu>}
        >
          <a onClick={e => e.preventDefault()}>
            {console.log(user)}
            Hi, {user?._id}
          </a>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
} */
/* const PageHeader = styled.header`
height: 6rem;
` */

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area
/* const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
` */
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const HeaderItem = styled.h3`
margin-right: 3rem;
`

const Main = styled.main`
display: grid;
height: calc(100vh - 6rem);
`
