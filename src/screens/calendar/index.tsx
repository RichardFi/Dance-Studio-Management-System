import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { useHttp } from "utils/http";
import { useDanceClass } from "utils/danceClass";
import { EventInput } from '@fullcalendar/react'

export const CalendarScreen = () => {
  const [event, setEvent] = useState([{
    title: '',
    start: ''
  }]);/*  */  const client = useHttp();
  //const { isLoading, error, data: list } = useDanceClass(event);

  useEffect(() => {
    client('classes').then(setEvent);
  }, [])


  return <Container>
    <Helmet>
      <title>Calendar - ZeroOne</title>
    </Helmet>

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