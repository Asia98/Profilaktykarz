import React from 'react'

import {Box, Spinner, Text, ThemingProps} from '@chakra-ui/react'

type Props = {
  size?: ThemingProps<'Spinner'>['size']
  label?: string
}
const Loading = ({label, size}: Props) => {
  return (
    <Box>
      <Spinner size={size ?? 'xl'} />
      {label && <Text>{label}</Text>}
    </Box>
  )
}

export default Loading
