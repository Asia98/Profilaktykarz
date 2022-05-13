import React from 'react'

import {Checkbox, CheckboxGroup, Stack} from '@chakra-ui/react'

import {Factor} from '@/types'

type Props = {
  factors: Factor[]
}

const IntroductionFormFactors = ({factors}: Props) => {
  return (
    <CheckboxGroup colorScheme="green">
      <Stack spacing={[1, 5]}>
        {factors.map((f, i) => (
          <Checkbox key={i} value={f.id}>
            {f.name}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  )
}

export default IntroductionFormFactors
