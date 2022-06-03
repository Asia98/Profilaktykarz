import {Box, Button, Flex, Text, useColorModeValue} from '@chakra-ui/react'
import React from 'react'

const CalendarCustomVisit = () => {
  const backgroundColor = useColorModeValue('#f9dca9', 'orange.700')

  return (
    <Box p="5" backgroundColor={backgroundColor} borderRadius="2xl">
      <Flex flexDir="row" alignItems="center">
        <Text>
          Jeśli okresowo wykonujesz badania, które nie są zawarte w naszym serwisie (np. badania okresowe do
          pracy), dodaj własne przypomnienia.
        </Text>
        <Button borderRadius="full" p="5" variant="outline" colorScheme="orange" borderWidth="2px">
          Dodaj własne przypomnienie
        </Button>
      </Flex>
    </Box>
  )
}

export default CalendarCustomVisit
