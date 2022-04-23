import React from 'react'

import {Button, Container, Heading, Text} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <Container maxW="container.xl">
      <Heading size="xl">Profilaktykarz</Heading>
      <Button as={Link} to="/calendar">
        Zobacz kalendarz
      </Button>
    </Container>
  )
}

export default Home
