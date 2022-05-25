import React from 'react'

import {Box, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useBoolean} from '@chakra-ui/react'
import {Frown as FrownIcon, Smile as SmileIcon} from 'react-feather'

import {LastVisitCheckup} from '@/types'

type Props = {
  item: LastVisitCheckup
}

const CheckupItem = ({item}: Props) => {
  const [isResultGood, setIsResultGood] = useBoolean(true)

  const smileIconColor = React.useMemo(() => (isResultGood ? 'green' : 'lightgray'), [isResultGood])
  const frownIconColor = React.useMemo(() => (isResultGood ? 'lightgray' : 'red'), [isResultGood])

  return (
    <Box backgroundColor="gray.100" p="6" borderRadius="3xl">
      <Stack spacing="5">
        <Heading size="md">{item.name}</Heading>
        <FormControl>
          <FormLabel fontWeight="semibold" htmlFor="last-visit">Data ostatniego badania</FormLabel>
          <Input id="last-visit" type="date" />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Jaki był wynik badania?</FormLabel>
          <HStack>
            <SmileIcon size="5rem" color={smileIconColor} onClick={setIsResultGood.on} cursor="pointer" />
            <FrownIcon size="5rem" color={frownIconColor} onClick={setIsResultGood.off} cursor="pointer" />
          </HStack>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default CheckupItem
