import React from 'react';
import { ProjectListScreen } from 'screens/projectList';
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from 'antd';
import { Row } from 'components/lib';

export const AuthenticatedApp = () => {
    const { logout, user } = useAuth();

    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>Class</h2>
                <h2>User</h2>
            </HeaderLeft>
            <HeaderRight>
                <Dropdown overlay={<Menu>
                    <Menu.Item key={'logout'}>
                        <a onClick={logout}>Logout</a>
                    </Menu.Item>
                </Menu>}>
                    <a onClick={e => e.preventDefault()}>
                        {console.log(user)}
                        Hi, {user?._id}
                    </a>
                </Dropdown>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen />
        </Main>
    </Container>
}

const PageHeader = styled.header`
height: 6rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area
const Header = styled(Row)`
padding: 3.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const HeaderItem = styled.h3`
margin-right: 3rem;
`

const Main = styled.main`
display: grid;
height: calc(100vh - 6rem);
`

