import React from 'react'

import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
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
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import {postApiCustomVisit} from '@/api'
import {PostApiCustomVisitRequest} from '@/models'

type Props = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => Promise<void>
}

const CreateUserDefinedCheckupModal = ({isOpen, onClose, onComplete}: Props) => {
  const [mode, setMode] = React.useState<string>('next-checkup')

  const [name, setName] = React.useState('')
  const [cycle, setCycle] = React.useState(30)
  const [lastCheckup, setLastCheckup] = React.useState(new Date().toISOString().split('T')[0])
  const [nextCheckup, setNextCheckup] = React.useState(new Date().toISOString().split('T')[0])

  const handleCreate = React.useCallback(async () => {
    try {
      const req: PostApiCustomVisitRequest =
        mode === 'cycle'
          ? {
              cycle,
              lastCheckup,
              name,
            }
          : {
              lastCheckup,
              name,
              nextCheckup,
            }

      console.log('req', req)
      const response = await postApiCustomVisit(req)
      console.log('response', response)

      if (!response.success) {
        throw new Error('Failed to create user defined checkup.')
      }

      await onComplete()
      onClose()
    } catch (e) {
      console.error('Failed to submit user defined checkup')
    }
  }, [cycle, lastCheckup, mode, name, nextCheckup, onClose, onComplete])

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
          <RadioGroup onChange={setMode} value={mode}>
            <Stack>
              <FormControl>
                <FormLabel>Nazwa badania</FormLabel>
                <Input onChange={handleNameChange} placeholder="Nazwa badania" value={name} />
              </FormControl>

              <FormControl>
                <FormLabel>Ostatnie badanie</FormLabel>
                <Input type="date" onChange={handleLastCheckupChange} placeholder="Ostatnie badanie" />
              </FormControl>

              <Text size="md" pt="5">
                Wyznaczanie kolejnej wizyty
              </Text>

              <FormControl>
                <FormLabel>
                  <Radio value="next-checkup">Następne badanie</Radio>
                </FormLabel>
                <Input
                  type="date"
                  onChange={handleNextCheckupChange}
                  placeholder="Ostatnie badanie"
                  isDisabled={mode !== 'next-checkup'}
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  <Radio value="cycle">Co ile dni</Radio>
                </FormLabel>
                <NumberInput
                  defaultValue={30}
                  precision={0}
                  onChange={handleCycleChange}
                  value={cycle}
                  placeholder="Co ile dni"
                  isDisabled={mode !== 'cycle'}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </Stack>
          </RadioGroup>
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
