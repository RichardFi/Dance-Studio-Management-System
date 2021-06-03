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
  const [createVisible, setCreateVisible] = useState(false)
  const [confirmCreateLoading, setConfirmCreateLoading] = useState(false)
  const [eventVisible, setEventVisible] = useState(false)
  const [confirmEventLoading, setConfirmEventLoading] = useState(false)

  // const [modalText, setModalText] = useState('Content of the modal')

  const showCreateModal = (arg: DateSelectArg) => {
    form.setFieldsValue({ startTime: moment(arg.start), endTime: moment(arg.end) })
    setCreateVisible(true)
  }

  const showEventModal = (arg: EventClickArg) => {
    console.log(arg.event.extendedProps.course)
    let courseName
    course.forEach(course => course._id == arg.event.extendedProps.course ? courseName = course.name : courseName='')
    form.setFieldsValue({
      name: arg.event.title,
      course: courseName,
      startTime: moment(arg.event.start),
      endTime: moment(arg.event.end)
    })
    setEventVisible(true)
  }

  const handleEventOk = () => {

  }

  const handleCreateOk = () => {
    form
      .validateFields()
      .then(values => {
        setConfirmCreateLoading(true)
        form.resetFields()
        client('classes', { method: 'POST', data: values })
          .then(res => {
            setCreateVisible(false)
            setConfirmCreateLoading(false)
          })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
        setConfirmCreateLoading(false)
      });
  }

  const handleCreateCancel = () => {
    setCreateVisible(false)
  }

  const handleEventCancel = () => {
    setEventVisible(false)
  }

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
          description: danceClass.description
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
  }, [confirmCreateLoading])

  return (
    <Container>
      <Helmet>
        <title>Calendar - ZeroOne</title>
      </Helmet>
      <EventModal
        eventVisible={eventVisible}
        handleEventOk={handleEventOk}
        confirmEventLoading={confirmEventLoading}
        handleEventCancel={handleEventCancel}
        form={form}
        formItemLayout={formItemLayout}
        course={course}
      >

      </EventModal>
      <ClassModal
        createVisible={createVisible}
        handleCreateOk={handleCreateOk}
        confirmCreateLoading={confirmCreateLoading}
        handleCreateCancel={handleCreateCancel}
        form={form}
        formItemLayout={formItemLayout}
        course={course}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next today'
        }}
        expandRows={true}
        height={'100%'}
        events={event}
        selectable={true}
        select={showCreateModal}
        eventClick={showEventModal}
        slotMinTime={'06:00:00'}
        slotMaxTime={'22:00:00'}
      />
    </Container>
  )
}

const Container = styled.div`
padding: 3.2rem;
`
