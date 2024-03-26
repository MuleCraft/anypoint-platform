import { useState } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    Box,
    Flex,
    FormControl,
    FormLabel,
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
    Divider,
    Menu,
    MenuButton,
    VStack,
    MenuList,
    MenuItem,
    IconButton,
    InputLeftElement,
    InputGroup
} from '@chakra-ui/react';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
const ConversionTable = () => {
    const [filter, setFilter] = useState('');
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

    const conversions = [
        { email: 'inches', send: 'millimetres (mm)', expires: 25.4, teams: 25.4 },
        { email: 'feet', send: 'centimetres (cm)', expires: 30.48, teams: 25.4 },
        { email: 'yards', send: 'metres (m)', expires: 0.91444, teams: 25.4 },
    ];

    const filteredConversions = conversions.filter(conversion =>
        conversion.email.toLowerCase().includes(filter.toLowerCase())
    );

    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', padding: '10px' };
    const rowValueStyle = { fontSize: 14, padding: '10px' };

    return (
        <Box >
            <Flex alignItems="center" justifyContent="space-between"  >
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
                                                    placeholder="max@community.com"
                                                    h="55px"
                                                    borderRadius="0px"
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
                <InputGroup maxW="-webkit-fit-content">
                    <InputLeftElement
                        pointerEvents="none"
                        top={4}
                        left={4}
                        children={<FiSearch color="gray" />}
                    />
                    <Input
                        placeholder="Filter users"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        my={4}
                        ml={4}

                    />
                </InputGroup>
            </Flex>

            <TableContainer>
                <Table variant="simple" size="md">
                    <Thead borderBottomWidth="3px">
                        <Tr>
                            <Th style={columnTitleStyle}>Email</Th>
                            <Th style={columnTitleStyle}>Sent</Th>
                            <Th style={columnTitleStyle}>Expires</Th>
                            <Th style={columnTitleStyle}>Teams</Th>
                            <Th style={columnTitleStyle} w={'10px'}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredConversions.map((conversion, index) => (
                            <Tr key={index}>
                                <Td style={rowValueStyle}>{conversion.email}</Td>
                                <Td style={rowValueStyle}>{conversion.send}</Td>
                                <Td style={rowValueStyle}>{conversion.expires}</Td>
                                <Td style={rowValueStyle}>{conversion.teams}</Td>
                                <Td style={rowValueStyle}>
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            aria-label='Options'
                                            icon={<HiEllipsisHorizontal width="10px" />}
                                            variant='outline'
                                            h={'30px'} color="gray.500"
                                            border={'1px solid #5c5c5c'}
                                        />
                                        <MenuList borderRadius={0}>
                                            <MenuItem fontSize="sm">
                                                Resend Invitation...
                                            </MenuItem>
                                            <MenuItem fontSize="sm" color="red">
                                                Cancel Invitation...
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ConversionTable;
