import React from 'react'

import {Box, Button, Flex, Text, useColorModeValue, useDisclosure} from '@chakra-ui/react'

import CreateUserDefinedCheckupModal from './create-modal'

type Props = {
  onAddComplete: () => Promise<void>
}

const CalendarCustomVisit = ({onAddComplete}: Props) => {
  const backgroundColor = useColorModeValue('#f9dca9', 'orange.700')
  const {
    isOpen: isCreateUserDefinedCheckupModalOpen,
    onOpen: onCreateUserDefinedCheckupModalOpen,
    onClose: onCreateUserDefinedCheckupModalClose,
  } = useDisclosure()

  return (
    <>
      <Box p="5" backgroundColor={backgroundColor} borderRadius="2xl">
        <Flex flexDir="row" alignItems="center">
          <Text>
            Jeśli okresowo wykonujesz badania, które nie są zawarte w naszym serwisie (np. badania okresowe do
            pracy), dodaj własne przypomnienia.
          </Text>
          <Button
            onClick={onCreateUserDefinedCheckupModalOpen}
            borderRadius="full"
            p="5"
            variant="outline"
            colorScheme="orange"
            borderWidth="2px"
          >
            Dodaj własne przypomnienie
          </Button>
        </Flex>
      </Box>
      <CreateUserDefinedCheckupModal
        isOpen={isCreateUserDefinedCheckupModalOpen}
        onClose={onCreateUserDefinedCheckupModalClose}
        onComplete={onAddComplete}
      />
    </>
  )
}

export default CalendarCustomVisit
