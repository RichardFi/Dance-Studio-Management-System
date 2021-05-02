import React, { useState } from "react"
import { RegisterScreen } from "unauthenticated-app/register";
import { LoginScreen } from "unauthenticated-app/login";
import { Card } from 'antd';
import styled from '@emotion/styled';

export const UnauthenticatedApp = () => {
    const [isRegister, setIsRegister] = useState(false);
    return <div style={{ display: 'flex', justifyContent: "center" }}>
        <Card>
            {
                isRegister ? <RegisterScreen /> : <LoginScreen />
            }
            <button onClick={() => setIsRegister(!isRegister)}>change to {isRegister ? 'login' : 'register'}</button>
        </Card>

    </div>
}

const Container = styled.div`
display.flex;
flex-direction:column;
align-item: center;
min-height: 100vh;
`