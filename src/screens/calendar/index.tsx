import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import FullCalendar, { EventInput, EventClickArg, DateSelectArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // for dateClick
import { useHttp } from 'utils/http'
import { useDanceClass } from 'utils/danceClass'
import moment from 'moment'
import { Button, Modal, Select, Row, Col, Form, Input, DatePicker, Popconfirm } from 'antd'
import { DanceClass } from 'screens/classList/list'
import { ClassModal } from 'screens/calendar/classModal'
import { EventModal } from 'screens/calendar/eventModal'
import { useAuth } from 'context/auth-context'

export interface DanceClassCalendar {
  _id: string
  title: string
  start: string
}

export interface Course {
  _id: string
  name: string
  type: string
  description: string
  level: string
  teacher: string[]
  classes: string[]
}

export const CalendarScreen = () => {
  const [form] = Form.useForm();
  const { logout, user } = useAuth()

  const [event, setEvent] = useState([{
    title: '',
    start: ''
  }])/*  */
  const [course, setCourse] = useState([{
    _id: '',
    name: ''
  }])/*  */

  const client = useHttp()
  // const { isLoading, error, data: list } = useDanceClass(event);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  useEffect(() => {
    client('classes').then(data =>
      data.map((danceClass: DanceClass) => {
        return {
          _id: danceClass._id,
          title: danceClass.name,
          start: danceClass.startTime,
          end: danceClass.endTime,
          course: danceClass.course,
          teacher: danceClass.teacher,
          description: danceClass.description,
          users: danceClass.users
        }
      })
    ).then(setEvent)

    client('courses').then(data =>
      data.map((course: Course) => {
        return {
          _id: course._id,
          name: course.name,
          teacher: course.teacher
        }
      })
    ).then(setCourse)
  }, [])

  return (
    <Container>
      <Helmet>
        <title>Calendar - ZeroOne</title>
      </Helmet>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next today'
        }}
        expandRows={true}
        height={'auto'}
        events={event}
        selectable={true}/* 
        select={showCreateModal}
        eventClick={showEventModal} */
        slotMinTime={'06:00:00'}
        slotMaxTime={'21:00:00'}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: false
        }}
        displayEventEnd={true}
      />
    </Container>
  )
}

const Container = styled.div`
padding: 3.2rem;
`
