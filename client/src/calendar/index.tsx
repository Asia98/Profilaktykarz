import React from 'react'

import moment from 'moment'
import 'moment/locale/pl'
// @ts-ignore
import Calendar from 'rc-year-calendar'
import 'rc-year-calendar/locales/rc-year-calendar.pl'

import {Box, Container, Heading, Stack, useToast} from '@chakra-ui/react'
import {getApiUserCalendar} from '@/api'

import CalendarCustomVisit from './custom-visit'
import './styles.css'
import {CalendarEvent} from './types'

const ExaminationCalendar = () => {
  const toast = useToast()

  const [calendarEvents, setCalendarEvents] = React.useState<CalendarEvent[]>([])

  const fetchEvents = React.useCallback(async () => {
    try {
      const response = await getApiUserCalendar()
      console.log(response)
      if (!response.success) {
        throw new Error(response.msg)
      }
      setCalendarEvents(
        response.events.map((e) => ({
          endDate: new Date(e.date),
          link: e.link,
          name: e.name,
          startDate: new Date(e.date),
        }))
      )
    } catch (e) {
      console.error('Failed to load calendar events', e)
    }
  }, [])

  React.useEffect(() => {
    fetchEvents()
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="container.xl">
      <Stack spacing="8" h="100%">
        <Heading size="lg" mt="8" textAlign="center">
          Kalendarz zalecanych terminów zbliżających się badań kontrolnych
        </Heading>

        <CalendarCustomVisit onAddComplete={fetchEvents} />

        <Calendar
          onDayClick={(a: any) => {
            console.log(a)
          }}
          language="pl"
          weekStart={1}
          dataSource={calendarEvents}
        />
      </Stack>
    </Container>
  )
}

export default ExaminationCalendar
