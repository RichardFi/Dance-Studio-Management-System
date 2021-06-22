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
import { ClassModal } from 'screens/classManagement/classModal'
import { EventModal } from 'screens/classManagement/eventModal'
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

export const ClassManagementScreen = () => {
  const [form] = Form.useForm();
  const { logout, user } = useAuth()
  const [inThisClass, setInThisClass] = useState(false);

  const [event, setEvent] = useState([{
    title: '',
    start: ''
  }])/*  */
  const [course, setCourse] = useState([{
    _id: '',
    name: ''
  }])/*  */

  const [selectedClass, setSelectedClass] = useState('')
  const client = useHttp()
  // const { isLoading, error, data: list } = useDanceClass(event);
  const [createVisible, setCreateVisible] = useState(false)
  const [confirmCreateLoading, setConfirmCreateLoading] = useState(false)
  const [eventVisible, setEventVisible] = useState(false)
  const [confirmEventLoading, setConfirmEventLoading] = useState(false)

  // const [modalText, setModalText] = useState('Content of the modal')

  const showCreateModal = (arg: DateSelectArg) => {
    form.setFieldsValue({
      name: '',
      course: '',
      startTime: moment(arg.start),
      endTime: moment(arg.end),
      teacher: '',
      description: ''
    })
    setCreateVisible(true)
  }

  const showEventModal = (arg: EventClickArg) => {
    setSelectedClass(arg.event.extendedProps._id)
    setInThisClass(arg.event.extendedProps.users.includes(user?._id))

    console.log(arg.event.extendedProps.users)
    console.log(arg.event.extendedProps)

    form.setFieldsValue({
      name: arg.event.title,
      course: arg.event.extendedProps.course,
      startTime: moment(arg.event.start),
      endTime: moment(arg.event.end),
      teacher: arg.event.extendedProps.teacher,
      description: arg.event.extendedProps.description,
    })
    setEventVisible(true)
  }

  const handleEventOk = () => {
    form
      .validateFields()
      .then(values => {
        setConfirmEventLoading(true)
        console.log(values)
        client(`classes/${selectedClass}`, { method: 'PATCH', data: values })
          .then(res => {
            setEventVisible(false)
            setConfirmEventLoading(false)
            form.resetFields()
          })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
        setConfirmEventLoading(false)
      })
  }

  const handleCreateOk = () => {
    form
      .validateFields()
      .then(values => {
        setConfirmCreateLoading(true)
        client('classes', { method: 'POST', data: values })
          .then(res => {
            setCreateVisible(false)
            setConfirmCreateLoading(false)
            form.resetFields()
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

  const onFinishJoinClass = () => {
    setConfirmEventLoading(true)
    client(`classes/${selectedClass}`, { method: 'PATCH', data: { users: user?._id } })
      .then(res => {
        setEventVisible(false)
        setConfirmEventLoading(false)
        form.resetFields()
      })
      .catch(info => {
        alert(info.err.message)
        setEventVisible(false)
        setConfirmEventLoading(false)
      })
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
  }, [confirmCreateLoading, confirmEventLoading])

  return (
    <Container>
      <Helmet>
        <title>Class Management - ZeroOne Admin</title>
      </Helmet>
      <EventModal
        eventVisible={eventVisible}
        handleEventOk={handleEventOk}
        confirmEventLoading={confirmEventLoading}
        handleEventCancel={handleEventCancel}
        form={form}
        formItemLayout={formItemLayout}
        course={course}
        onFinishJoinClass={onFinishJoinClass}
        inThisClass={inThisClass}
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
        height={'auto'}
        events={event}
        selectable={true}
        select={showCreateModal}
        eventClick={showEventModal}
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
