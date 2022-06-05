import React from 'react'

import {
  Box,
  Container,
  Flex,
  LinkBox,
  LinkOverlay,
  SkeletonCircle,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {getInfoFormStatus} from '@/api'

const IntroductionFormBar = () => {
  const [alreadySubmitted, setAlreadySubmitted] = React.useState(true)

  const backgroundColor = useColorModeValue('green.200', 'green.900')

  React.useEffect(() => {
    ;(async () => {
      try {
        const {medicalInfo} = await getInfoFormStatus()
        setAlreadySubmitted(medicalInfo)
      } catch (e) {
        console.error('Failed to check if introduction form was already submitted', e)
      }
    })()
  }, [])

  if (alreadySubmitted) {
    return null
  }

  return (
    <Box bg={backgroundColor} py="3" borderBottom="green 1px solid">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Text>
            Witamy w Profilaktykarzu. Abyśmy mogli stworzyć dla Ciebie spersonalizowane doświadczenie
            korzystania z naszej platformy wypełnij formularz posiadanych chorób oraz chorób występujących w
            Twojej rodzinie.
          </Text>
          <Flex alignItems="center">
            <Box>
              <LinkBox>
                <Tag flexShrink={0} variant="outline" colorScheme="facebook" size="lg">
                  <TagLabel>
                    <LinkOverlay href="/introduction-form">Wypełnij formularz</LinkOverlay>
                  </TagLabel>
                  <TagRightIcon as={SkeletonCircle} startColor="facebook.400" endColor="facebook.200" />
                </Tag>
              </LinkBox>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default IntroductionFormBar
