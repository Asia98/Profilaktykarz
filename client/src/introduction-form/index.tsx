import React from 'react'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react'

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
      try {
        const response = await getApiFactors()

        if (!response.success) {
          throw new Error(response.msg)
        }

        setUserFactors(response.data.userFactors)
        setFamilyFactors(response.data.userFactors)
      } catch (e) {
        console.error('Failed to fetch factors')
      }
    })()
  }, [])

  const handleSubmit = React.useCallback(() => {
    console.log(checkedFamilyFactors)
    console.log(checkedUserFactors)
  }, [checkedFamilyFactors, checkedUserFactors])

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
        <Button colorScheme="green" onClick={handleSubmit}>
          Wyślij
        </Button>
      </Stack>
    </Container>
  )
}

export default IntroductionForm
