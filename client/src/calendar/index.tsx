import React from 'react'

import moment from 'moment'
import 'moment/locale/pl'
import {Calendar, momentLocalizer, Event, ViewsProps, Messages} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Link} from 'react-router-dom'

import {Button, Container, Heading} from '@chakra-ui/react'

const events: Event[] = [
  {
    allDay: true,
    end: new Date('2022-04-23'),
    start: new Date('2022-04-23'),
    title: 'Badanie zatok',
  },
  {
    allDay: true,
    end: new Date('2022-04-28'),
    start: new Date('2022-04-28'),
    title: 'Badania okresowe',
  },
  {
    allDay: true,
    end: new Date('2022-05-02'),
    start: new Date('2022-05-02'),
    title: 'Badanie wzroku',
  },
]

const calendarViews: ViewsProps<Event, object> = ['month']

const calendarTranslations: Messages = {
  next: '>',
  previous: '<',
  today: 'Dzisiaj',
}

const ExaminationCalendar = () => {
  const localizer = momentLocalizer(moment)

  return (
    <Container maxWidth="container.xl" h="500px">
      <Button as={Link} to="/home">
        Powrót
      </Button>

      <Heading size="lg" textAlign="center" my="5">
        Kalendarz badań
      </Heading>

      <Calendar
        messages={calendarTranslations}
        views={['month']}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </Container>
  )
}

export default ExaminationCalendar
