import React from 'react'

import {background, Box, Link, LinkBox, LinkOverlay, Stack, Text} from '@chakra-ui/react'

import {PreventionItem} from './types'

type Props = {
  item: PreventionItem
}

const hoverStyles = {backgroundColor: '#0001'}

const PreventionViewItem = ({item}: Props) => {
  return (
    <LinkBox py="5" px="2" _hover={hoverStyles}>
      <Stack>
        <LinkOverlay fontSize="xl" fontWeight="semibold" href={item.link} isExternal={true}>
          {item.name}
        </LinkOverlay>
        <Text>{item.description}</Text>
      </Stack>
    </LinkBox>
  )
}

export default PreventionViewItem
