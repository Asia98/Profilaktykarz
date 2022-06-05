import React from 'react'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import {postApiCustomVisit} from '@/api'

type Props = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => Promise<void>
}

const CreateUserDefinedCheckupModal = ({isOpen, onClose, onComplete}: Props) => {
  const [name, setName] = React.useState('')
  const [cycle, setCycle] = React.useState(30)
  const [lastCheckup, setLastCheckup] = React.useState(new Date().toISOString().split('T')[0])
  const [nextCheckup, setNextCheckup] = React.useState(new Date().toISOString().split('T')[0])

  const handleCreate = React.useCallback(async () => {
    try {
      console.log('TODO')
      // const response = await postApiCustomVisit({
      //   cycle: 10,
      //   lastCheckup: '2022-06-04',
      //   name: 'Test thing',
      // })

      console.log('name', name)
      console.log('cycle', cycle)
      console.log('lastCheckup', lastCheckup)
      console.log('nextCheckup', nextCheckup)

      await onComplete()
      onClose()
    } catch (e) {
      console.error('Failed to submit user defined checkup')
    }
  }, [cycle, lastCheckup, name, nextCheckup, onClose, onComplete])

  const handleNameChange = React.useCallback(({target: {value}}) => setName(value), [])

  const handleCycleChange = React.useCallback((value) => setCycle(value), [])

  const handleLastCheckupChange = React.useCallback(({target: {value}}) => setLastCheckup(value), [])

  const handleNextCheckupChange = React.useCallback(({target: {value}}) => setNextCheckup(value), [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj własne przypomnienie</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <FormLabel>Nazwa badania</FormLabel>
            <Input onChange={handleNameChange} placeholder="Nazwa badania" value={name} />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Ostatnie badanie</FormLabel>
            <Input type="date" onChange={handleLastCheckupChange} placeholder="Ostatnie badanie" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Następne badanie</FormLabel>
            <Input type="date" onChange={handleNextCheckupChange} placeholder="Ostatnie badanie" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Co ile dni</FormLabel>
            {/* <NumberInput type="date" onChange={handleCycleChange} placeholder="Co ile dni" /> */}
            <NumberInput
              defaultValue={30}
              precision={0}
              onChange={handleCycleChange}
              value={cycle}
              placeholder="Co ile dni"
            >
              <NumberInputField />
            </NumberInput>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} colorScheme="red" mr={3}>
            Anuluj
          </Button>
          <Button onClick={handleCreate} colorScheme="green">
            Dodaj
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateUserDefinedCheckupModal
