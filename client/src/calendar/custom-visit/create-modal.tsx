import React from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onComplete: () => Promise<void>
}

const CreateCustomCheckupModal = ({isOpen, onClose, onComplete}: Props) => {
  const handleCreate = React.useCallback(async () => {
    await onComplete()
    onClose()
  }, [onClose, onComplete])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj własne przypomnienie</ModalHeader>
        <ModalCloseButton />

        <ModalBody>lorem ipsum, ipsum lorem</ModalBody>

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

export default CreateCustomCheckupModal
