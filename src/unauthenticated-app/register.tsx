import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';
//const apiUrl = process.env.REACT_APP_API_URL;
import { Form, Input } from 'antd';
import { LongButton } from 'unauthenticated-app';

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register, user } = useAuth();
    const handleSubmit = ({cpassword, ...values} : { firstName: string; lastName: string; gender: string; phone: string; email: string; password: string, cpassword:string }) => {
        if (cpassword !== values.password){
            return onError(new Error('Password and confirm password does not match'))
        }
        register(values).catch(onError);
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
        <Form.Item name={'cpassword'} rules={[{ required: true, message: 'Please confirm password' }]}>
            <Input placeholder={'confirm password'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type="primary"> Register </LongButton>
        </Form.Item>
    </Form>
}