import React from 'react'

import {
  Box,
  Container,
  Flex,
  SkeletonCircle,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import {getCheckupFormStatus} from '@/api'

const MedicalCheckupsBar = () => {
  const [alreadySubmitted, setAlreadySubmitted] = React.useState(true)

  const backgroundColor = useColorModeValue('green.200', 'green.900')

  React.useEffect(() => {
    ;(async () => {
      try {
        const {checkupHistory} = await getCheckupFormStatus()
        setAlreadySubmitted(checkupHistory)
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
            Dodaj informacje o swoich ostatnich wizytach u lekarza, aby uzyskać sugerowane daty kolejnych
            wizyt kontrolnych.
          </Text>
          <Flex alignItems="center">
            <Box>
              <Tag flexShrink={0} variant="outline" colorScheme="facebook" size="lg">
                <TagLabel>Uzupełnij informacje</TagLabel>
                <TagRightIcon as={SkeletonCircle} startColor="facebook.400" endColor="facebook.200" />
              </Tag>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default MedicalCheckupsBar
