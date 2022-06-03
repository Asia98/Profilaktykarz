import React from 'react'

import moment from 'moment'
import 'moment/locale/pl'
import {Calendar, momentLocalizer, Event, ViewsProps, Messages, SlotInfo} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {Container, Heading, Stack, useToast} from '@chakra-ui/react'
import {getApiUserCalendar} from '@/api'

import CalendarCustomVisit from './custom-visit'
import './styles.css'

const calendarViews: ViewsProps<Event, object> = ['month']

const calendarTranslations: Messages = {
  next: '>',
  previous: '<',
  today: 'Dzisiaj',
}

const ExaminationCalendar = () => {
  const localizer = momentLocalizer(moment)
  const toast = useToast()

  // const [userEvents, setUserEvents] = React.useState<CalendarEvent[]>([])
  const [calendarEvents, setCalendarEvents] = React.useState<Event[]>([])

  const fetchEvents = React.useCallback(async () => {
    try {
      const response = await getApiUserCalendar()
      console.log(response)
      if (!response.success) {
        throw new Error(response.msg)
      }
      setCalendarEvents(
        response.events.map((e) => ({
          allDay: true,
          end: new Date(e.date),
          start: new Date(e.date),
          title: e.name,
        }))
      )
    } catch (e) {
      console.error('Failed to load calendar events', e)
    }
  }, [])

  React.useEffect(() => {
    fetchEvents()
  }, []) // eslint-disable-line

  const handleCalendarEventsModalOpen = React.useCallback(
    (days: Date[]) => {
      const selectedDateSlots = days.map((d) => {
        const tomorrow = new Date(d)
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow.toISOString().split('T')[0]
      })
      console.log(selectedDateSlots)
      const selectedEvents = calendarEvents.filter((ce) => {
        const eventDate = ce.start?.toISOString().split('T')[0]
        if (!eventDate) {
          return false
        }
        return selectedDateSlots.includes(eventDate)
      })

      if (!selectedEvents.length) {
        toast({
          description: 'Brak zdarzeń w wybranym czasie',
          isClosable: true,
        })
        return
      }

      // TODO: display selected events in a modal
      console.log('selectedEvents', selectedEvents.length, selectedEvents)
    },
    [calendarEvents, toast]
  )

  const handleSlotsSelect = React.useCallback(
    (slotInfo: SlotInfo) => {
      console.log(slotInfo)
      handleCalendarEventsModalOpen(slotInfo.slots)
    },
    [handleCalendarEventsModalOpen]
  )

  return (
    <Container maxWidth="container.xl">
      <Stack spacing="8" h="100%">
        <Heading size="lg" mt="8" textAlign="center">
          Kalendarz zalecanych terminów zbliżających się badań kontrolnych
        </Heading>

        <CalendarCustomVisit onAddComplete={fetchEvents} />

        <Calendar
        style={{height: 400}}
          messages={calendarTranslations}
          views={calendarViews}
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          onSelectSlot={handleSlotsSelect}
          selectable={true}
        />
      </Stack>
    </Container>
  )
}

export default ExaminationCalendar
