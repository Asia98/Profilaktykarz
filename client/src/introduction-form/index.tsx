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
  useToast,
} from '@chakra-ui/react'

import {getApiFactors, postApiFactors} from '@/api'
import Loading from '@/common/loading'
import {Factor} from '@/types'

import IntroductionFormFactors from './factors'

const IntroductionForm = () => {
  const toast = useToast()
  const [value, setValue] = React.useState<string | undefined>(undefined)

  const [userFactors, setUserFactors] = React.useState<Factor[]>([])
  const [checkedUserFactors, setCheckedUserFactors] = React.useState<number[]>([])

  const [familyFactors, setFamilyFactors] = React.useState<Factor[]>([])
  const [checkedFamilyFactors, setCheckedFamilyFactors] = React.useState<number[]>([])

  const [isLoadingFactors, setIsLoadingFactors] = React.useState(true)

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
      setIsLoadingFactors(false)
    })()
  }, [])

  const handleSubmit = React.useCallback(async () => {
    console.log(checkedFamilyFactors)
    console.log(checkedUserFactors)
    // TODO fix hardcoded birthDate and gender
    const response = await postApiFactors({
      birthDate: new Date('1920-02-10'),
      familyFactors: checkedFamilyFactors,
      gender: 'M',
      userFactors: checkedUserFactors,
    })
    if (!response.success) {
      toast({
        description: response.msg,
        isClosable: true,
        status: 'error',
      })
      return
    }
    console.log(response)
  }, [checkedFamilyFactors, checkedUserFactors, toast])

  return (
    <Container maxW="container.sm" py="2">
      <Stack spacing="8">
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Data urodzenia
          </FormLabel>
          <Input type="date" />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Płeć biologiczna
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
          {isLoadingFactors ? (
            <Loading />
          ) : (
            <IntroductionFormFactors
              factors={userFactors}
              checked={checkedUserFactors}
              onChange={setCheckedUserFactors}
            />
          )}
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Choroby występujące w rodzinie
          </FormLabel>
          {isLoadingFactors ? (
            <Box>
              <Loading />
            </Box>
          ) : (
            <IntroductionFormFactors
              factors={familyFactors}
              checked={checkedFamilyFactors}
              onChange={setCheckedFamilyFactors}
            />
          )}
        </FormControl>
        <Button colorScheme="green" onClick={handleSubmit}>
          Wyślij
        </Button>
      </Stack>
    </Container>
  )
}

export default IntroductionForm
