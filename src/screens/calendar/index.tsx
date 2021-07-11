import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import FullCalendar, { EventClickArg, DateSelectArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // for dateClick
import { useHttp } from 'utils/http'
import { Modal, Form } from 'antd'
import { DanceClass } from 'screens/classList/list'
import { useAuth } from 'context/auth-context'
import { PageHeaderComponent } from 'components/pageHeader'
import moment from 'moment'
import { UserOutlined, ProfileOutlined, PlaySquareOutlined } from '@ant-design/icons'

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

export interface Teacher {
  _id: string
  name: string
  description: string
  enrolDate: string
}

export const CalendarScreen = () => {
  const [form] = Form.useForm()
  const { logout, user } = useAuth()
  const page = 'Calendar'

  const [event, setEvent] = useState([
    {
      title: '',
      start: ''
    }
  ]) /*  */
  const [course, setCourse] = useState([
    {
      _id: '',
      name: ''
    }
  ]) /*  */
  const [teacher, setTeacher] = useState([
    {
      _id: '',
      name: ''
    }
  ]) /*  */

  const [isModalVisible, setIsModalVisible] = useState(false)

  const [selectedClass, setSelectedClass] = useState({
    _id: '',
    name: '',
    course: '',
    startTime: moment(),
    endTime: moment(),
    description: '',
    teacher: ''
  })

  const showModal = (arg: EventClickArg) => {
    console.log(arg.event)
    setSelectedClass({
      _id: arg.event.extendedProps._id,
      name: arg.event.title,
      course: arg.event.extendedProps.course,
      startTime: moment(arg.event.start),
      endTime: moment(arg.event.end),
      description: arg.event.extendedProps.description,
      teacher: arg.event.extendedProps.teacher
    })
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const client = useHttp()
  // const { isLoading, error, data: list } = useDanceClass(event);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 }
    }
  }

  useEffect(() => {
    client('classes')
      .then(data =>
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
      )
      .then(setEvent)

    client('courses')
      .then(data =>
        data.map((course: Course) => {
          return {
            _id: course._id,
            name: course.name,
            teacher: course.teacher
          }
        })
      )
      .then(setCourse)

    client('teachers')
      .then(data =>
        data.map((teacher: Teacher) => {
          return {
            _id: teacher._id,
            name: teacher.name,
            description: teacher.description,
            enrolDate: teacher.enrolDate
          }
        })
      )
      .then(setTeacher)
  }, [])

  return (
    <div>
      <PageHeaderComponent page={page} />
      <Container>
        <Helmet>
          <title>Calendar - ZeroOne</title>
        </Helmet>
        <Modal
          title='Class Detail'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <h1 style={{ margin: 0 }}>{selectedClass.name}</h1>
          <p style={{ marginBottom: '2rem', color: 'rgb(0,0,0,0.6)' }}>
            {selectedClass.startTime.format('MMMM Do YYYY') +
              '  ' +
              selectedClass.startTime.format('h:mm a') +
              ' - ' +
              selectedClass.endTime.format('h:mm a')}
          </p>
          <p>
            <UserOutlined /> Teacher: {selectedClass.teacher}
          </p>
          <p>
            <p>
              <PlaySquareOutlined /> Course:{' '}
              {course.find(course => course._id == selectedClass.course)?.name}
            </p>
            <ProfileOutlined /> Description:{' '}
            {selectedClass.description}
          </p>
        </Modal>
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
          selectable={true} /* 
        select={showCreateModal} */
          eventClick={showModal}
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
    </div>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
