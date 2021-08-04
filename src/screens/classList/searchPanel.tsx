import React from 'react'
import { Form, Select, Input } from 'antd'
import styled from '@emotion/styled'

export interface User {
  _id: string
  firstName: string
  lastName: string
  gender: string
  phone: string
  email: string
  role: string
  token: string
  classes: [string]
}
interface SearchPanelProps {
  users: User[]
  param: {
    _id: string
    name: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  // setParam(Object.assign({}, param, ))
  return (
    <Form style={{ marginBottom: '2rem' }} layout='inline'>
      <Form.Item>
        <Input
          placeholder='Class Name' type='text' value={param.name} onChange={evt => setParam({
            ...param,
            name: evt.target.value
          })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param._id} onChange={value => setParam({
            ...param,
            _id: value
          })}
        >
          <Select.Option value=''>Person</Select.Option>
          {
            users.map(user => <Select.Option key={user.email} value={user.email}>{user.firstName}</Select.Option>)
          }
        </Select>
      </Form.Item>
    </Form>
  )
}
