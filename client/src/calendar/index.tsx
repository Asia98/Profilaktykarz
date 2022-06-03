import React from 'react'

import moment from 'moment'
import 'moment/locale/pl'
import {Calendar, momentLocalizer, Event, ViewsProps, Messages, SlotInfo} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {Container, Heading, Stack, useToast} from '@chakra-ui/react'
import {getApiUserCalendar} from '@/api'

import CalendarCustomVisit from './custom-visit'
import './styles.css'

// import {CalendarEvent} from './types'

// const events: Event[] = [
//   {
//     allDay: true,
//     end: new Date('2022-04-23'),
//     start: new Date('2022-04-23'),
//     title: 'Badanie zatok',
//   },
//   {
//     allDay: true,
//     end: new Date('2022-04-28'),
//     start: new Date('2022-04-28'),
//     title: 'Badania okresowe',
//   },
//   {
//     allDay: true,
//     end: new Date('2022-05-02'),
//     start: new Date('2022-05-02'),
//     title: 'Badanie wzroku',
//   },
// ]

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

  React.useEffect(() => {
    ;(async () => {
      try {
        const response = await getApiUserCalendar()
        console.log(response)
        if (!response.success) {
          throw new Error(response.msg)
        }
        // setUserEvents(response.events)
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
    })()
  }, [])

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

        <CalendarCustomVisit />

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
