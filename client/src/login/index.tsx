import React from 'react'

import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import {Link, useHistory} from 'react-router-dom'

import {LoginForm, LoginResponse} from './types'

const emailRegexPattern =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i // eslint-disable-line

const Login = () => {
  const toast = useToast()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<LoginForm>()

  const _handleSubmit = async (data: LoginForm) => {
    const response = (await (
      await fetch('http://localhost:5000/api/users/login', {
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
      })
    ).json()) as LoginResponse
    console.log(response)
    if (!response.success) {
      toast({
        description: response.msg,
        isClosable: true,
        status: 'error',
      })
      return
    }

    toast({
      description: 'Zalogowano pomyślnie',
      isClosable: true,
      status: 'success',
    })
    history.push('/')
  }

  return (
    <Container maxW="container.xl">
      <Stack w="400px" margin="auto" spacing="8">
        <Heading size="lg">Profilaktykarz</Heading>
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <Stack>
            <FormControl id="email" isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register('email', {
                  pattern: emailRegexPattern,
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors?.email?.type === 'required' ? 'Email jest obowiązkowy' : 'Wpisz poprawny email'}
              </FormErrorMessage>
            </FormControl>

            <FormControl id="password" isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register('password', {required: true})} />
              <FormErrorMessage>Hasło jest obowiązkowe</FormErrorMessage>
            </FormControl>

            <Input type="submit" value="Zaloguj się" />
          </Stack>
        </form>
        <Button as={Link} to="/signup">
          Nie masz konta? Zarejestruj się!
        </Button>
      </Stack>
    </Container>
  )
}

export default Login
