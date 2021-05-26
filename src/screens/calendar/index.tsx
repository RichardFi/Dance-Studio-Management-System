import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import FullCalendar, { EventInput } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // for dateClick
import { useHttp } from 'utils/http'
import { useDanceClass } from 'utils/danceClass'
import moment from 'moment'
import { Button, Modal, Select, Row, Col, Form, Input, DatePicker } from 'antd'
import { DanceClass } from 'screens/classList/list'

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
  const [date, setDate] = useState(moment(new Date()))/*  */

  const client = useHttp()
  // const { isLoading, error, data: list } = useDanceClass(event);
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('Content of the modal')

  const showModal = (arg: DateClickArg) => {
    form.setFieldsValue({ startTime: moment(arg.date), endTime: moment(arg.date) })
    console.log(date)
    setVisible(true)
  }

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds')
    setConfirmLoading(true)

    setTimeout(() => {
      setVisible(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const handleCancel = () => {
    setVisible(false)
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
          id: danceClass._id,
          title: danceClass.name,
          start: danceClass.startTime,
          end: danceClass.endTime,
          course: danceClass.course,
          description: danceClass.description
        }
      })
    ).then(setEvent).then(a => console.log(event))

    client('courses').then(data =>
      data.map((course: Course) => {
        return {
          _id: course._id,
          name: course.name,
          teacher: course.teacher
        }
      })
    ).then(setCourse).then(a => console.log(course))
  }, [])

  return (
    <Container>
      <Helmet>
        <title>Calendar - ZeroOne</title>
      </Helmet>
      <Modal
        title='Title'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          form={form}
          {...formItemLayout}

        /*       onFinish={onFinish}
          onFinishFailed={onFinishFailed} */
        >
          <Form.Item
            label='Class Name'
            name='className'
            rules={[{ required: true, message: 'Please input the dance class name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Course'
            name='course'
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select>
              {
                course.map(course => <Select.Option key={course._id} value={course._id}>{course.name}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item
            label='Start Time'
            name='startTime'
            rules={[{ required: true, message: 'Please input the class start time' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />

          </Form.Item>

          <Form.Item
            label='End Time'
            name='endTime'
            rules={[{ required: true, message: 'Please input the class end time' }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>

          <Form.Item
            label='Teacher'
            name='teacher'
            rules={[{ required: true, message: 'Please select a teacher for the class' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true, message: 'Please input description for the class' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: '',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next today'
        }}
        events={event}
        dateClick={showModal}
      />
    </Container>
  )
}

const Container = styled.div`
padding: 3.2rem;
`
