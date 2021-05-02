import { useAuth } from 'context/auth-context';
//import React, { FormEvent } from 'react';
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';

//const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
    const { login, user } = useAuth();
    const handleSubmit = (values: { email: string, password: string }) => {
        login(values);
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'email'} rules={[{ required: true, message: 'Please enter email' }]}>
            <Input placeholder={'email'} type="text" id={'email'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: 'Please enter email' }]}>
            <Input placeholder={'password'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type="primary"> Login </LongButton>
        </Form.Item>
    </Form>
}