import React from 'react'

import {Container, Flex, Heading, Stack, Text} from '@chakra-ui/react'

type Author = {
  name: string
  index: number
}

const authors: Author[] = [
  {
    index: 243999,
    name: 'Joanna Bieganowska',
  },
  {
    index: 244012,
    name: 'Adam Jędrzejec',
  },
  {
    index: 244025,
    name: 'Julia Marcinkowska',
  },
]

const coordinators: string[] = ['dr inż. Jacek Nowakowski', 'dr inż. Łukasz Sturgulewski']

const Home = () => {
  return (
    <Container maxW="container.xl">
      <Stack pt="5" spacing="10">
        <Heading size="xl">Profilaktykarz</Heading>

        <Text fontSize="xl" fontWeight="semibold">
          Aplikacja proponująca i przypominająca użytkownikom o wykonaniu badań profilaktycznych i okresowych,
          i ewentualnych wizytach kontrolnych u specjalisty.
        </Text>

        <Stack spacing="3">
          <Heading size="md">Autorzy rozwiązania:</Heading>

          <Stack w="260px">
            {authors.map(({index, name}, i) => (
              <Flex key={i} justifyContent="space-between">
                <Text fontSize="lg" fontWeight="semibold">
                  {name}
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  {index}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Stack>

        <Stack spacing="3">
          <Heading size="md">Koordynatorzy:</Heading>

          <Stack w="260px">
            {coordinators.map((coordinator, i) => (
              <Text key={i} fontSize="lg" fontWeight="semibold">
                {coordinator}
              </Text>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Home
