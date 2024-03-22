import { useState } from 'react';
import {
    Box,
    Container,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Text,
    Divider
} from '@chakra-ui/react';
import UserInviteTable from './userInviteTable';

function InviteForm() {
    const [emails, setEmails] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const isEmailValid = (email) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const emailArray = emails.split(',').map(email => email.trim());
        const invalidEmails = emailArray.filter(email => !isEmailValid(email));

        if (invalidEmails.length > 0) {
            toast({
                title: 'Invalid email address',
                description: "Please enter valid email addresses. Check the following: " + invalidEmails.join(', '),
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
            return;
        }


        toast({
            title: 'Invitations sent.',
            description: `We've sent invitations to ${emailArray.length} email(s).`,
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: "top-right"
        });

        setEmails('');
        onClose();
    };

    return (
        <Container>
            <Button colorScheme="blue" onClick={onOpen}>Invite Users</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <Box p={2} bg="modelColor" borderRadius="4px">
                            <ModalHeader fontSize="lg" fontWeight="800">Invite users</ModalHeader>
                        </Box>
                        <ModalBody>
                            <Flex direction="column" align="left" justify="center" pb={3}>
                                <Box width="full">
                                    <VStack spacing="4">
                                        <FormControl id="email">
                                            <FormLabel fontSize="md">Email addresses</FormLabel>
                                            <Text pb={3} maxW="450px" fontSize="sm" color="textColor">
                                                Users will be invited to create a username and password.
                                                Separate multiple addresses with commas.
                                            </Text>
                                            <Input
                                                type="text"
                                                value={emails}
                                                onChange={(e) => setEmails(e.target.value)}
                                                placeholder="Enter email addresses separated by commas"
                                            />
                                        </FormControl>
                                    </VStack>
                                </Box>
                            </Flex>
                        </ModalBody>
                        <Divider />
                        <ModalFooter>
                            <Box alignItems="center" display="flex" justifyContent="space-between" width="full">
                                <Button onClick={onClose} variant="homePageButtons">Close</Button>
                                <Button type="submit" colorScheme="blue">
                                    Send invitation
                                </Button>
                            </Box>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <UserInviteTable />

        </Container>
    );
}

export default InviteForm;
