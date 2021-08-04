import React from 'react'
import { Form, Select, Input } from 'antd'
import styled from '@emotion/styled'
import { Course } from 'screens/calendar'

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
  courses: Course[]
  param: {
    name: string
    startTime: string
    teacher: string
    course: string
  }
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({
  users,
  courses,
  param,
  setParam
}: SearchPanelProps) => {
  // setParam(Object.assign({}, param, ))
  return (
    <Form layout='inline'>
      <Form.Item>
        <Input
          placeholder='Class Name'
          type='text'
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.course}
          onChange={value =>
            setParam({
              ...param,
              course: value
            })
          }
        >
          <Select.Option value={''}>
            All Courses
          </Select.Option>
          {courses.map(course => (
            <Select.Option key={course._id} value={course._id}>
              {course.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
