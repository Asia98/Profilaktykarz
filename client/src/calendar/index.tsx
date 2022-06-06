import React from 'react'

import {Box, Container, Heading, Stack, useToast} from '@chakra-ui/react'
// @ts-ignore
import Calendar from 'rc-year-calendar'
import 'rc-year-calendar/locales/rc-year-calendar.pl'

import {getApiUserCalendar} from '@/api'
import useValueDisclosure from '@/common/useValueDisclosure'

import CalendarDayModal from './calendar-events-modal'
import CalendarCustomVisit from './custom-visit'
import './styles.css'
import {CalendarEvent} from './types'

const ExaminationCalendar = () => {
  const toast = useToast()
  const {
    onClose: onDayModalClose,
    onOpen: onDayModalOpen,
    value: dayModalValue,
  } = useValueDisclosure<CalendarEvent[]>()
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

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

  const handleCalendarDayClick = React.useCallback(
    ({date, events}) => {
      if (!events.length) {
        return
      }

      const adjustedDate = new Date(date)
      adjustedDate.setDate(adjustedDate.getDate() + 1)

      setSelectedDate(adjustedDate)
      onDayModalOpen(events)
    },
    [onDayModalOpen]
  )

  return (
    <>
      <Container maxWidth="container.xl">
        <Stack spacing="8" h="100%">
          <Heading size="lg" mt="8" textAlign="center">
            Kalendarz zalecanych terminów zbliżających się badań kontrolnych
          </Heading>

          <CalendarCustomVisit onAddComplete={fetchEvents} />

          <Calendar
            onDayClick={handleCalendarDayClick}
            language="pl"
            weekStart={1}
            dataSource={calendarEvents}
          />
        </Stack>
      </Container>

      <CalendarDayModal
        isOpen={!!dayModalValue}
        onClose={onDayModalClose}
        value={dayModalValue ?? []}
        date={selectedDate}
      />
    </>
  )
}

export default ExaminationCalendar
