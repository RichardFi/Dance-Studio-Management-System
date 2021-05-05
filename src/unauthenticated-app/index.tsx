import React, { useState } from "react"
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Card, Divider, Button, Typography } from 'antd';
import styled from '@emotion/styled';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    return <Container>
        <Header />
        <ShadowCard>
            <Title>
                {isRegister ? 'Register to Zero One' : 'Login to Zero One'}
            </Title>
            {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
            {
                isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />
            }
            <Divider />
            <a onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Sign in with a email and password' : `Don't have an account?`}
            </a>
        </ShadowCard>
    </Container>
}
export const LongButton = styled(Button)`
width:100%;
`

const Title = styled.h2`
margin-bottom: 2.4rem;
color: rgb(94,108,132);
`

const Header = styled.header`
padding: 5rem 0;
width: 100%;
`

const ShadowCard = styled(Card)`
width: 40rem;
min-height:56rem;
padding: 4rem 5rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 100vh;
`