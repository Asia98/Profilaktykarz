import React from 'react'

import {Box, Container, useToast} from '@chakra-ui/react'

import {getApiLastVisits} from '@/api'
import {LastVisitCheckup} from '@/types'

const LastVisitsView = () => {
  const toast = useToast()

  const [checkups, setCheckups] = React.useState<LastVisitCheckup[]>([])

  React.useEffect(() => {
    ;(async () => {
      try {
        const {
          data: {checkups},
          success,
        } = await getApiLastVisits()
        if (!success) {
          throw new Error('No success in response status')
        }
        setCheckups(checkups)
      } catch (e) {
        console.error('Failed to fetch last visits form data', e)
        toast({
          description: 'Nie udało się wczytać listy badań',
          isClosable: true,
          status: 'error',
        })
      }
    })()
  }, [toast])

  return (
    <Container maxW="container.md">
      {checkups.map((checkup, i) => (
        <Box key={i}>
          {checkup.id} {checkup.name}
        </Box>
      ))}
    </Container>
  )
}

export default LastVisitsView
