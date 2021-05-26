import { useAuth } from 'context/auth-context'
// import React, { FormEvent } from 'react';
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/useAsync'

// const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { login, user } = useAuth()
  const { run, isLoading } = useAsync()
  // console.log(user);
  const handleSubmit = (values: { email: string, password: string }) => {
    run(login(values).catch(onError))
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name='email' rules={[{ required: true, message: 'Please enter email' }]}>
        <Input placeholder='email' type='text' id='email' />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: 'Please enter password' }]}>
        <Input placeholder='password' type='password' id='password' />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType='submit' type='primary'> Login </LongButton>
      </Form.Item>
    </Form>
  )
}
