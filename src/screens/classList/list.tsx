import React from 'react'
import { User } from 'screens/classList/searchPanel'
import { Course } from 'screens/calendar'
import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link, BrowserRouter as Router } from 'react-router-dom'
export interface DanceClass {
  _id: string
  users: [string]
  name: string
  course: string
  startTime: boolean
  endTime: string
  description: string
  teacher: string
}

interface ListProps extends TableProps<DanceClass> {
  //list: DanceClass[],
  users: User[]
  courses: Course[]
}

export const List = ({ users, courses, ...props }: ListProps) => {
  return (
    <Table
      rowKey='id'
      columns={[
        {
          title: 'Class Name',
          dataIndex: 'name',
          render (value, danceClass) {
            return <Link to={danceClass._id}>{danceClass.name}</Link>
          }
        },
        {
          title: 'Course',
          dataIndex: 'name',
          render (value, danceClass) {
            return (
              <span>
                {courses.find(course => danceClass.course === course._id)?.name}
              </span>
            )
          }
        },
        {
          title: 'Start Time',
          render (value, danceClass) {
            return (
              <span>
                {danceClass.startTime ? danceClass.startTime : undefined}
              </span>
            )
          }
        },
        {
          title: 'End Time',
          dataIndex: 'endTime'
        }
      ]}
      {...props}
    />
  )
}
