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

  const [birthDate, setBirthDate] = React.useState<Date>()
  const [gender, setGender] = React.useState<string>()

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
    if (!birthDate || !gender) {
      return
    }
    console.log(birthDate)
    console.log(gender)
    console.log(checkedFamilyFactors)
    console.log(checkedUserFactors)

    try {
      const response = await postApiFactors({
        birthDate: birthDate,
        familyFactors: checkedFamilyFactors,
        gender: gender,
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
    } catch (e) {
      console.error('Failed to submit a form', e)
      toast({
        description: 'Nie udało się przesłać formularza',
        isClosable: true,
        status: 'error',
      })
    }
  }, [birthDate, checkedFamilyFactors, checkedUserFactors, gender, toast])

  const handleDateChange = React.useCallback(({target: {value}}) => {
    if (!value) {
      setBirthDate(undefined)
      return
    }
    setBirthDate(new Date(value))
  }, [])

  const isSubmitDisabled = React.useMemo(() => !birthDate || !gender, [birthDate, gender])

  return (
    <Container maxW="container.sm" py="2">
      <Stack spacing="8">
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Data urodzenia
          </FormLabel>
          <Input type="date" onChange={handleDateChange} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="lg" fontWeight="semibold">
            Płeć biologiczna
          </FormLabel>
          <RadioGroup onChange={setGender} value={gender}>
            <Stack>
              <Radio value="M">Mężczyzna</Radio>
              <Radio value="K">Kobieta</Radio>
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
        <Button colorScheme="green" onClick={handleSubmit} isDisabled={isSubmitDisabled}>
          Wyślij
        </Button>
      </Stack>
    </Container>
  )
}

export default IntroductionForm
