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

const MedicalCheckupsBar = () => {
  const alreadySubmitted = false

  const backgroundColor = useColorModeValue('green.200', 'green.900')

  if (alreadySubmitted) {
    return null
  }

  return (
    <Box bg={backgroundColor} py="3" borderBottom="green 1px solid">
      <Container maxW="container.xl">
        <Flex justifyContent="space-between">
          <Text>
            Dodaj informacje o swoich ostatnich wizytach u lekarza, aby uzyskać sugerowane daty kolejnych wizyt kontrolnych.
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
