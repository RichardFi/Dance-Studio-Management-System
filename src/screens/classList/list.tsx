import React from 'react'
import { User } from 'screens/classList/searchPanel'
import { Course } from 'screens/calendar'
import { Table, TableProps } from 'antd'
import styled from '@emotion/styled'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import moment from 'moment'

export interface DanceClass {
  _id: string
  users: [string]
  name: string
  course: string
  startTime: string
  endTime: string
  description: string
  teacher: string
}

interface ListProps extends TableProps<DanceClass> {
  //list: DanceClass[],
  param: {
    name: string
    startTime: string
    teacher: string
    course: string
  }
  users: User[]
  courses: Course[]
}

export const List = ({ users, courses, param, dataSource }: ListProps) => {
  return (
    <Wrapper>
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
                  {
                    courses.find(course => danceClass.course === course._id)
                      ?.name
                  }
                </span>
              )
            }
          },
          {
            title: 'Start Time',
            render (value, danceClass) {
              return (
                <span>
                  {danceClass.startTime
                    ? moment(danceClass.startTime).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )
                    : undefined}
                </span>
              )
            }
          },
          {
            title: 'End Time',
            dataIndex: 'endTime',
            render (value, danceClass) {
              return (
                <span>
                  {danceClass.endTime
                    ? moment(danceClass.endTime).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )
                    : undefined}
                </span>
              )
            }
          }
        ]}
        dataSource={dataSource}
      />
      {/*         dataSource?.filter(danceClass => (danceClass.startTime = param.startTime))
       */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 2rem;
`
