import React from 'react'

import {Box, FormControl, FormLabel, Heading, HStack, Input, Stack, Text, useBoolean} from '@chakra-ui/react'
import {Frown as FrownIcon, Smile as SmileIcon} from 'react-feather'

import {LastVisitWithName} from './types'

type Props = {
  item: LastVisitWithName
  onDateChange: (id: number, date: string) => void
  onResultChange: (id: number, result: boolean) => void
}

const CheckupItem = ({item, onDateChange, onResultChange}: Props) => {
  const smileIconColor = React.useMemo(() => (item.resultGood ? 'green' : 'lightgray'), [item.resultGood])
  const frownIconColor = React.useMemo(() => (item.resultGood ? 'lightgray' : 'red'), [item.resultGood])

  const handleResultGoodClick = React.useCallback(
    () => onResultChange(item.id, true),
    [item.id, onResultChange]
  )

  const handleResultBadClick = React.useCallback(
    () => onResultChange(item.id, false),
    [item.id, onResultChange]
  )

  const handleDateChange = React.useCallback(
    ({target: {value}}) => onDateChange(item.id, value),
    [item.id, onDateChange]
  )

  return (
    <Box backgroundColor="gray.100" p="6" borderRadius="3xl">
      <Stack spacing="5">
        <Heading size="md">{item.name}</Heading>
        <FormControl>
          <FormLabel fontWeight="semibold" htmlFor="last-visit">
            Data ostatniego badania
          </FormLabel>
          <Input id="last-visit" type="date" value={item.lastCheckupDate} onChange={handleDateChange} />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="semibold">Jaki był wynik badania?</FormLabel>
          <HStack>
            <SmileIcon size="5rem" color={smileIconColor} onClick={handleResultGoodClick} cursor="pointer" />
            <FrownIcon size="5rem" color={frownIconColor} onClick={handleResultBadClick} cursor="pointer" />
          </HStack>
        </FormControl>
      </Stack>
    </Box>
  )
}

export default CheckupItem
