import React from 'react'

const useValueDisclosure = <T extends Partial<T>>() => {
  const [value, setValue] = React.useState<T | null>(null)

  const onOpen = React.useCallback((value: T) => setValue(value), [])
  const onClose = React.useCallback(() => setValue(null), [])

  return {onClose, onOpen, value}
}

export default useValueDisclosure
