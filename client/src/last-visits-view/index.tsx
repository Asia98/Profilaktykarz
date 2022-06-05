import React from 'react'

import {Button, Container, Stack, useToast} from '@chakra-ui/react'

import {getApiLastVisits} from '@/api'
import {LastVisitCheckup} from '@/types'

import CheckupItem from './checkup-item'

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
      <Stack spacing="5" py="5">
        {checkups.map((checkup, i) => (
          <CheckupItem key={i} item={checkup} />
        ))}
        <Button colorScheme="green">Wyślij</Button>
      </Stack>
    </Container>
  )
}

export default LastVisitsView
