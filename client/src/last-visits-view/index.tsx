import React from 'react'

import {Button, Container, Spinner, Stack, Text, useToast} from '@chakra-ui/react'
import {useHistory} from 'react-router-dom'

import {getApiLastVisits, postApiLastVisits} from '@/api'

import CheckupItem from './checkup-item'
import {LastVisitWithName} from './types'

const LastVisitsView = () => {
  const toast = useToast()
  const history = useHistory()

  const [checkups, setCheckups] = React.useState<LastVisitWithName[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

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
        setCheckups(
          checkups.map((c) => ({
            ...c,
            lastCheckupDate: new Date().toISOString().split('T')[0],
            resultGood: true,
          }))
        )
      } catch (e) {
        console.error('Failed to fetch last visits form data', e)
        toast({
          description: 'Nie udało się wczytać listy badań',
          isClosable: true,
          status: 'error',
        })
      }
      setIsLoading(false)
    })()
  }, [toast])

  const handleLastVisitDateChange = React.useCallback(
    (id: number, date: string) =>
      setCheckups((c) => c.map((cc) => (cc.id === id ? {...cc, lastCheckupDate: date} : cc))),
    []
  )

  const handleResultChange = React.useCallback(
    (id: number, result: boolean) =>
      setCheckups((c) => c.map((cc) => (cc.id === id ? {...cc, resultGood: result} : cc))),
    []
  )

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true)
    try {
      const response = await postApiLastVisits({checkups})
      if (!response.success) {
        throw new Error('No success')
      }
      history.push('/calendar')
    } catch (e) {
      console.error('Failed to submit last visits', e)
    }
    setIsSubmitting(false)
  }, [checkups, history])

  return (
    <Container maxW="container.md">
      <Stack spacing="5" py="5">
        {isLoading && (
          <Stack alignItems="center">
            <Spinner size="xl" />
            <Text>Ładowanie...</Text>
          </Stack>
        )}
        {checkups.map((checkup, i) => (
          <CheckupItem
            key={i}
            item={checkup}
            onDateChange={handleLastVisitDateChange}
            onResultChange={handleResultChange}
          />
        ))}
        <Button colorScheme="green" onClick={handleSubmit} isDisabled={isLoading || isSubmitting}>
          Wyślij
        </Button>
      </Stack>
    </Container>
  )
}

export default LastVisitsView
