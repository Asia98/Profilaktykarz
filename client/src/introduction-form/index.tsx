import React from 'react'

import {Container, FormControl, FormLabel, Input, Radio, RadioGroup, Stack} from '@chakra-ui/react'

import {LocalStorageUser} from '@/auth/types'
import {GetApiFactorsResponse} from '@/models'
import {Factor} from '@/types'

import IntroductionFormFactors from './factors'

const IntroductionForm = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined)
  const [userFactors, setUserFactors] = React.useState<Factor[]>([])
  const [familyFactors, setFamilyFactors] = React.useState<Factor[]>([])

  React.useEffect(() => {
    ;(async () => {
      const localStorageUser = localStorage.getItem('profilaktykarzUser')
      if (!localStorageUser) {
        throw new Error('User is not authenticated')
      }
      const user = JSON.parse(localStorageUser) as LocalStorageUser

      const response = (await (
        await fetch('http://localhost:5000/api/factors', {
          headers: {Authorization: user.token, 'Content-Type': 'application/json'},
          method: 'GET',
        })
      ).json()) as GetApiFactorsResponse

      if (!response.success) {
        throw new Error('Failed to fetch factors')
      }

      setUserFactors(response.data.userFactors)
      setFamilyFactors(response.data.userFactors)
    })()
  }, [])

  return (
    <Container maxW="container.xl">
      <Stack spacing="8">
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Data urodzenia
          </FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Płeć
          </FormLabel>
          <RadioGroup onChange={setValue} value={value}>
            <Stack>
              <Radio value="male">Mężczyzna</Radio>
              <Radio value="female">Kobieta</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Choroby
          </FormLabel>
          <IntroductionFormFactors factors={userFactors} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Choroby występujące w rodzinie
          </FormLabel>
          <IntroductionFormFactors factors={familyFactors} />
        </FormControl>
      </Stack>
    </Container>
  )
}

export default IntroductionForm
