import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
//const apiUrl = process.env.REACT_APP_API_URL;
import { Form, Button, Input } from 'antd';

export const RegisterScreen = () => {
    const { register, user } = useAuth();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        //prevent the default action of submit
        event.preventDefault();
        const firstName = (event.currentTarget.elements[0] as HTMLFormElement).value;
        const lastName = (event.currentTarget.elements[1] as HTMLFormElement).value;
        const gender = (event.currentTarget.elements[2] as HTMLFormElement).value;
        const phone = (event.currentTarget.elements[3] as HTMLFormElement).value;
        const email = (event.currentTarget.elements[4] as HTMLFormElement).value;
        const password = (event.currentTarget.elements[5] as HTMLFormElement).value;

        register({ firstName, lastName, gender, phone, email, password });
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item name={'firstName'} rules={[{ required: true, message: 'Please enter firstName' }]}>
            <Input placeholder={'first name'} type="text" id={'firstName'} />
        </Form.Item>
        <Form.Item name={'lastName'} rules={[{ required: true, message: 'Please enter lastName' }]}>
            <Input placeholder={'last name'} type="text" id={'lastName'} />
        </Form.Item>
        <Form.Item name={'gender'} rules={[{ required: true, message: 'Please enter gender' }]}>
            <Input placeholder={'gender'} type="text" id={'gender'} />
        </Form.Item>
        <Form.Item name={'phone'} rules={[{ required: true, message: 'Please enter phone' }]}>
            <Input placeholder={'phone'} type="text" id={'phone'} />
        </Form.Item>
        <Form.Item name={'email'} rules={[{ required: true, message: 'Please enter email' }]}>
            <Input placeholder={'email'} type="text" id={'email'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{ required: true, message: 'Please enter password' }]}>
            <Input placeholder={'password'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
            <Button type="primary"> Register </Button>
        </Form.Item>
    </Form>
}