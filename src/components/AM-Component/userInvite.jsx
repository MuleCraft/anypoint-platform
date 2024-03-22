import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Box } from "@chakra-ui/react";


function VerticallyCenter() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button variant="formButtons" onClick={onOpen}>Invite users</Button>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <Box bg="modelColor">
                        <ModalHeader>Modal Title</ModalHeader>
                    </Box>

                    <ModalCloseButton />
                    <ModalBody>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, alias.
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default VerticallyCenter;
