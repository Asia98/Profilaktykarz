import React from 'react'

import {Checkbox, CheckboxGroup, Stack} from '@chakra-ui/react'

import {Factor} from '@/types'

type Props = {
  factors: Factor[]
  checked: number[]
  onChange: (checked: number[]) => void
}

const IntroductionFormFactors = ({factors, checked, onChange}: Props) => {
  return (
    <CheckboxGroup colorScheme="green" onChange={onChange} value={checked}>
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
