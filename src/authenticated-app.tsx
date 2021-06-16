import React, { useState } from 'react';
import { ClassListScreen } from 'screens/classList'
import { CalendarScreen } from 'screens/calendar'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { SmileOutlined, CrownOutlined, TabletOutlined, AntDesignOutlined } from '@ant-design/icons';

import type { ProSettings } from '@ant-design/pro-layout';
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout';

const defaultProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileOutlined />,
        component: './Welcome',
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
          {
            path: '/admin/sub-page3',
            name: '三级页面',
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
const content = (
  <Descriptions size="small" column={2}>
    <Descriptions.Item label="Name">Yongrui Pan</Descriptions.Item>
    <Descriptions.Item label="Contact">
      <a>421421</a>
    </Descriptions.Item>
    <Descriptions.Item label="Join Date">2017-01-10</Descriptions.Item>
    <Descriptions.Item label="Update Date">2017-10-10</Descriptions.Item>
  </Descriptions>
);

export const AuthenticatedApp = () => {

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({ fixSiderbar: true });
  const [pathname, setPathname] = useState('/welcome');
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
      }}
    >
      <ProLayout
        {...defaultProps}
        location={{
          pathname,
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href="https://preview.pro.ant.design/dashboard/analysis"
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src="https://procomponents.ant.design/favicon.ico"
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && 'Preview Pro'}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <a
            onClick={() => {
              setPathname(item.path || '/welcome');
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => (
          <div>
            <Avatar shape="square" size="small" icon={<UserOutlined />} />
          </div>
        )}
        {...settings}
      >
        <PageContainer
          content={content}
          tabList={[
            {
              tab: '基本信息',
              key: 'base',
            },
            {
              tab: '详细信息',
              key: 'info',
            },
          ]}
          extraContent={
            <Space size={24}>
              <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Space>
          }
          extra={[
            <Button key="3">操作</Button>,
            <Button key="2">操作</Button>,
            <Button key="1" type="primary">
              主操作
            </Button>,
          ]}
          footer={[
            <Button key="3">重置</Button>,
            <Button key="2" type="primary">
              提交
            </Button>,
          ]}
        >
          <div
            style={{
              height: '120vh',
            }}
          >
            <Result
              status="404"
              style={{
                height: '100%',
                background: '#fff',
              }}
              title="Hello World"
              subTitle="Sorry, you are not authorized to access this page."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
        disableUrlParams
      />
    </div>
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
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const HeaderItem = styled.h3`
margin-right: 3rem;
`

const Main = styled.main`
display: grid;
height: calc(100vh - 6rem);
`
