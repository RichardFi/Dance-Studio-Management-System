import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useHttp } from "utils/http";
import { useDanceClass } from "utils/danceClass";
import { EventInput } from '@fullcalendar/react';
import { Button, Modal, Row, Col } from 'antd';
import { DanceClass } from "screens/classList/list";

export interface DanceClassCalendar {
  _id: string;
  title: string;
  start: string;
}

export const CalendarScreen = () => {
  const [event, setEvent] = useState([{
    title: '',
    start: ''
  }]);/*  */
  const client = useHttp();
  //const { isLoading, error, data: list } = useDanceClass(event);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setVisible(false);
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
        };
      })
    ).then(setEvent).then(a => console.log(event));

  }, [])


  return <Container>
    <Helmet>
      <title>Calendar - ZeroOne</title>
    </Helmet>
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
    </Modal>

    <Button type="primary" onClick={showModal}>
      Create New Class
    </Button>

    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      headerToolbar={{
        left: '',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay prev,next today',
      }}
      events={event}
    />
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`