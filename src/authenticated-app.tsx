import React from 'react';
import { ProjectListScreen } from 'screens/projectList';
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Button } from 'antd';
import {Row} from 'components/lib';

export const AuthenticatedApp = () => {
    const { logout } = useAuth();

    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>Logo</h2>
                <h2>Class</h2>
                <h2>User</h2>
            </HeaderLeft>
            <HeaderRight>
                <Button onClick={logout}>Logout</Button>
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

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`

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

