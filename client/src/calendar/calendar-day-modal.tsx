import React from 'react'

import {
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import {CalendarEvent} from './types'

type Props = {
  isOpen: boolean
  onClose: () => void
  value: CalendarEvent[]
  date: Date
}

const CalendarDayModal = ({isOpen, onClose, value, date}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Badania na dzień {date.toISOString().split('T')[0]}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {value.map((event, i) => (
            <Flex key={i} justifyContent="space-between" alignItems="center">
              <Text fontWeight="semibold">{event.name}</Text>
              {event.link && (
                <Button as={Link} href={event.link} isExternal={true} size="sm">
                  Znajdź specjalistę
                </Button>
              )}
            </Flex>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Zamknij
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CalendarDayModal
