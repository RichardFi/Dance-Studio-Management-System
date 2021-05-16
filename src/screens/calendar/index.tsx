import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useHttp } from "utils/http";
import { useDanceClass } from "utils/danceClass";
import { EventInput } from '@fullcalendar/react';
import { Button, Modal } from 'antd';
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
    console.log('Clicked cancel button');
    setVisible(false);
  };

  useEffect(() => {
    client('classes').then(data =>
      data.map((history: DanceClass) => {
        return {
          title: history.name,
          start: history.startTime,
        };
      })
    ).then(setEvent).then(a => console.log(event));
    let todayStr = new Date().toISOString().replace(/T.*$/, '');
    console.log(todayStr)
  }, [])


  return <Container>
    <Helmet>
      <title>Calendar - ZeroOne</title>
    </Helmet>
    <Button type="primary" onClick={showModal}>
      Open Modal with async logic
    </Button>
    <Modal
      title="Title"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <p>{modalText}</p>
    </Modal>
    <FullCalendar
      plugins={[dayGridPlugin]}
      events={event}
    />
    )
    {console.log(event)}
  </Container>
}

const Container = styled.div`
padding: 3.2rem;
`