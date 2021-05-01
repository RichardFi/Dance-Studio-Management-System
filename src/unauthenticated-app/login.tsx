import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
import { Form, Button, Input } from 'antd';

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
            <Button htmlType={'submit'} type="primary"> Login </Button>
        </Form.Item>
    </Form>
}