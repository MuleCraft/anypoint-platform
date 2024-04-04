import { useContext, useEffect, useState } from 'react';
import adminAuthClient from '../../Utils/api';
import { Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, IconButton, Tooltip, Text, Input, useDisclosure, useToast, Flex, Button, Modal, ModalOverlay, ModalContent, Box, ModalHeader, Divider, ModalBody, FormControl, FormLabel, ModalFooter, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { AuthContext } from '../../Utils/AuthProvider';
import { FiSearch } from "react-icons/fi";
import supabase from '../../Utils/supabase';

const UserTable = () => {
    const [userTable, setUserData] = useState(null);
    const { userData } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [emails, setEmails] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const redirectTo = "http://localhost:127.0.0.1:3000/inviteduser"
    const toast = useToast();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await adminAuthClient.listUsers();

                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    console.log("User data fetched successfully:", data);
                    setUserData(data.users);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const calculateExpirationStatus = (invited_at) => {
        if (!invited_at) return null;
        const invitedDate = new Date(invited_at);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - invitedDate.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays > 7) {
            return `${differenceInDays - 7} days )`;
        } else {
            return `${7 - differenceInDays} days `;
        }
    };

    const calculateSendStatus = (invited_at) => {
        if (!invited_at) return null;
        const invitedDate = new Date(invited_at);
        const currentDate = new Date();
        const differenceInTime = invitedDate.getTime() - currentDate.getTime();
        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
        if (differenceInDays < 0) {
            return `${Math.abs(differenceInDays)} days ago`;
        } else if (differenceInDays === 0) {
            return `an hour ago`;
        } else {
            return `${differenceInDays} days to go`;
        }
    };

    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', };
    const rowValueStyle = { fontSize: 14, };
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmails(value);
        setEmailError("");
    };

    const validateEmail = (email) => {
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    };

    const handleSubmit = async () => {
        const emailList = emails.split(",").map((email) => email.trim());


        const invalidEmails = emailList.filter((email) => !validateEmail(email));

        if (invalidEmails.length > 0) {
            setEmailError("Please enter valid email addresses.");
            return;
        }

        try {
            const invitedUserIds = [];

            await Promise.all(
                emailList.map(async (email) => {
                    const { data, error } = await adminAuthClient.inviteUserByEmail(email, { redirectTo });
                    if (error) {
                        console.error(`Error inviting user ${email}:`, error.message);
                        throw error;
                    }

                    if (data && data.user && data.user.id) {
                        invitedUserIds.push(data.user.id);
                        await insertAdditionalDetails(data.user.id);
                    }
                })
            );
            setSubmissionStatus("success");
            onClose();
            toast({
                title: "Invitations sent successfully!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right"

            }
            );
        } catch (error) {
            console.error("Error inviting users:", error.message);
            toast({
                title: "Error inviting users",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        }
    };
    console.log(submissionStatus)
    const insertAdditionalDetails = async (id) => {
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("users")
            .upsert([
                {
                    id: id,
                    company: userData?.company,
                },
            ]);
        if (error) {
            console.error("Error inserting additional details:", error.message);
        } else {
            console.log("Additional details inserted:", data);
        }
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
        <div>
            <Flex alignItems="center" justifyContent="space-between" >
                <Button colorScheme="blue" onClick={onOpen} zIndex={0}>Invite Users</Button>
                <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <Box bg="modelColor" borderRadius="4px">
                            <ModalHeader fontSize="lg" fontWeight="800">Invite users</ModalHeader>
                        </Box>
                        <Divider />
                        <ModalBody>
                            <FormControl id="email">
                                <FormLabel fontSize="md">Email addresses</FormLabel>
                                <Text pb={3} maxW="450px" fontSize="sm" color="textColor">
                                    Users will be invited to create a username and password.
                                    Separate multiple addresses with commas.
                                </Text>
                                <Input
                                    type="text"
                                    value={emails}
                                    onChange={handleEmailChange}
                                    placeholder="max@community.com"
                                    isInvalid={emailError !== ""}
                                    h="55px"
                                    borderRadius="0px"
                                />
                                {emailError && <Text color="red.500">{emailError}</Text>}
                                <FormLabel fontSize="md" pt={3}>Teams</FormLabel>
                                <Text pb={3} maxW="450px" fontSize="sm" color="textColor">

                                    Invited users will be added to these teams, with the selected membership type.
                                </Text>
                                <Input
                                    type="text"
                                    value={userData?.company}
                                    isDisabled
                                    h="55px"
                                />
                            </FormControl>
                        </ModalBody>
                        <Divider />
                        <ModalFooter justifyContent="space-between">
                            <Button variant="homePageButtons" onClick={onClose}>Close</Button>
                            <Button onClick={handleSubmit} colorScheme="blue">
                                Send invitation
                            </Button>
                        </ModalFooter>
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
                        onChange={handleFilterChange}
                        my={4}
                        ml={4}

                    />
                </InputGroup>
            </Flex>

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
                    {Array.isArray(userTable) && userTable
                        .filter(user =>
                            user.email.toLowerCase().includes(filter.toLowerCase()) && user.invited_at
                        )
                        .map((conversion, index) => (
                            <Tr key={index}>
                                <Td style={rowValueStyle}>{conversion.email}</Td>
                                <Td style={rowValueStyle}>{calculateSendStatus(conversion.invited_at)}</Td>
                                <Td style={rowValueStyle}>{calculateExpirationStatus(conversion.invited_at)}</Td>
                                <Td style={rowValueStyle}>
                                    <Tooltip fontSize="12px" label={`Everyone at ${userData?.company} (Member)`} placement='auto'>
                                        <Text>1 team</Text>
                                    </Tooltip>
                                </Td>
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
        </div>
    );
};

export default UserTable;
