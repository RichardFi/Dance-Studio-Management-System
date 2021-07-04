import React, { useEffect, useState } from 'react';
import { ClassListScreen } from 'screens/classList'
import { ClassManagementScreen } from 'screens/classManagement'
import { CalendarScreen } from 'screens/calendar'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom';

import { Layout, Menu, Dropdown, PageHeader } from 'antd';
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
import { TeacherManagementScreen } from 'screens/teacherManagement';

const { Header, Sider, Content, Footer } = Layout;

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
  const [pathname, setPathname] = useState(window.location.pathname);
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
          <Menu theme="dark" defaultSelectedKeys={['/1']} mode="inline">
            <Menu.Item key="/class-management">
              <Link to="/class-management">Class Management</Link>
            </Menu.Item>
            <Menu.Item key="/my-classes">
              <Link to="/my-classes">My Classes</Link>
            </Menu.Item>
            <Menu.Item key="/calendar">
              <Link to="/calendar">Calendar</Link>
            </Menu.Item>
            <Menu.Item key="/teacher-management">
              <Link to="/teacher-management" >Teacher Management</Link>
            </Menu.Item>
            <Menu.Item key="9">
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ height: '4.5rem', backgroundColor: '#fff', boxShadow: '0 0.1rem 0.4rem rgba(0,21,41,.08)', position: 'relative', zIndex:3}}>
            <Dropdown overlay={
              <Menu>
                <Menu.Item key='logout'>
                  <a onClick={logout}>Logout</a>
                </Menu.Item>
              </Menu>
            }
            >
              <HeaderItem onClick={e => e.preventDefault()}>
                {console.log(user)}
                  Hi, {user?.firstName}
              </HeaderItem>
            </Dropdown>
          </Header>
          <PageHeader
            style={{ backgroundColor: '#fff'}}
            className="site-page-header"
/*             onBack={() => null} */
            title={pathname}
            subTitle="This is a subtitle"
          />
          <Content style={{ margin: '2rem', backgroundColor: '#fff' }}>
            <Routes>
              <Route path='/class-management' element={<ClassManagementScreen />}></Route>
              <Route path='/calendar' element={<CalendarScreen />}></Route>
              <Route path='/my-classes' element={<ClassListScreen />}></Route>
              <Route path='/teacher-management' element={<TeacherManagementScreen />}></Route>
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>©2021 </Footer>
        </Layout>
      </BrowserRouter>

    </Layout >
  );

}

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

const HeaderRight = styled.div`
float: right
`

const HeaderItem = styled.a`
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  cursor: pointer;
  transition: all .3s;
  &:hover {
        background: rgb(0,0,0,.025);
      }
`

const Main = styled.main`
display: grid;
height: calc(100vh - 6rem);
`
