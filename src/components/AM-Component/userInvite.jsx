import { useContext, useEffect, useState } from 'react';
import adminAuthClient from '../../Utils/api';
import { Menu, MenuButton, MenuList, Table, Tbody, Td, Th, Thead, Tr, Text, Input, useDisclosure, useToast, Flex, Button, Modal, ModalOverlay, ModalContent, Box, ModalHeader, Divider, ModalBody, FormControl, FormLabel, ModalFooter, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AuthContext } from '../../Utils/AuthProvider';
import { FiSearch } from "react-icons/fi";
import supabase from '../../Utils/supabase';
import { ChevronDownIcon } from "@chakra-ui/icons";
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
const InviteForm = () => {
    const [userTable, setUserData] = useState(null);
    const { userData } = useContext(AuthContext);
    const [filter, setFilter] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [emails, setEmails] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const redirectTo = "http://localhost:127.0.0.1:3000/inviteduser"
    const toast = useToast()
    const [showNameColumn, setShowNameColumn] = useState(true);
    const [showEmailColumn, setShowEmailColumn] = useState(true);
    const [showVerifiedDateColumn, setShowVerifiedDateColumn] = useState(true);
    const [showIdentityProviderColumn, setShowIdentityProviderColumn] = useState(true);
    const [showCreatedDateColumn, setShowCreatedDateColumn] = useState(true);
    const [showLastModifiedDateColumn, setShowLastModifiedDateColumn] = useState(true);
    const [showLastLoginDateColumn, setShowLastLoginDateColumn] = useState(true);
    const [showStatusColumn, setShowStatusColumn] = useState(true);
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



    const toggleNameColumn = () => {
        setShowNameColumn(!showNameColumn);
    };
    const toggleEmailColumn = () => {
        setShowEmailColumn(!showEmailColumn);
    };
    const toggleVerifiedDateColumn = () => {
        setShowVerifiedDateColumn(!showVerifiedDateColumn);
    };
    const toggleIdentityProviderColumn = () => {
        setShowIdentityProviderColumn(!showIdentityProviderColumn);
    };
    const toggleCreatedDateColumn = () => {
        setShowCreatedDateColumn(!showCreatedDateColumn);
    };
    const toggleLastModifiedDateColumn = () => {
        setShowLastModifiedDateColumn(!showLastModifiedDateColumn);
    };
    const toggleLastLoginDateColumn = () => {
        setShowLastLoginDateColumn(!showLastLoginDateColumn);
    };
    const toggleStatusColumn = () => {
        setShowStatusColumn(!showStatusColumn);
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
                <Flex gap={10} alignItems="center">
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
                    <Menu>
                        <MenuButton
                            variant="hideShow"
                            borderColor="#000"
                            borderWidth="1px"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            Columns(9/9)
                        </MenuButton>
                        <MenuList p={4}>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showNameColumn}
                                    onChange={toggleNameColumn}
                                    readOnly

                                />
                                <Text>Name</Text>
                            </Flex>

                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showEmailColumn}
                                    onChange={toggleEmailColumn}
                                    readOnly

                                />
                                <Text>Email</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showVerifiedDateColumn}
                                    onChange={toggleVerifiedDateColumn}
                                    readOnly
                                />
                                <Text>Verified Date</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showIdentityProviderColumn}
                                    onChange={toggleIdentityProviderColumn}
                                    readOnly
                                />
                                <Text>Identity Provider</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showCreatedDateColumn}
                                    onChange={toggleCreatedDateColumn}
                                    readOnly
                                />
                                <Text> Created Date</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showLastModifiedDateColumn}
                                    onChange={toggleLastModifiedDateColumn}
                                    readOnly
                                />
                                <Text>Last Modified Date</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showLastLoginDateColumn}
                                    onChange={toggleLastLoginDateColumn}
                                    readOnly
                                />
                                <Text>Last Login Date</Text>
                            </Flex>
                            <Flex alignItems="center" gap={2} p={"0.5"}>
                                <input
                                    style={{ height: 18, width: 18 }}
                                    type="checkbox"
                                    checked={showStatusColumn}
                                    onChange={toggleStatusColumn}
                                    readOnly
                                />
                                <Text>Status</Text>
                            </Flex>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            <Table variant="simple" size="md">
                <Thead borderBottomWidth="3px">
                    <Tr>
                        <Th style={columnTitleStyle} hidden={!showNameColumn}> Full name</Th>

                        <Th style={columnTitleStyle} hidden={!showEmailColumn}>Email</Th>
                        <Th style={columnTitleStyle} hidden={!showVerifiedDateColumn}>Email verified date</Th>
                        <Th style={columnTitleStyle} hidden={!showIdentityProviderColumn}>Identity provider</Th>
                        <Th style={columnTitleStyle} hidden={!showCreatedDateColumn}>Created date</Th>
                        <Th style={columnTitleStyle} hidden={!showLastModifiedDateColumn}>Last modified date</Th>
                        <Th style={columnTitleStyle} hidden={!showLastLoginDateColumn}> Last login date</Th>
                        <Th style={columnTitleStyle} hidden={!showStatusColumn}> Status</Th>

                    </Tr>
                </Thead>
                <Tbody>
                    {Array.isArray(userTable) && userTable
                        .filter(user =>
                            user.email.toLowerCase().includes(filter.toLowerCase()) && !user.invited_at
                        )
                        .map((conversion, index) => (
                            <Tr key={index}>
                                <Td style={rowValueStyle} hidden={!showNameColumn} _hover={{ color: "boxColor" }}> <RouterLink to={`/accounts/users/${conversion.id}`}>{conversion.user_metadata.full_name}</RouterLink></Td>
                                <Td style={rowValueStyle} hidden={!showEmailColumn}>{conversion.email}</Td>
                                <Td style={rowValueStyle} hidden={!showVerifiedDateColumn}>{moment(conversion.confirmation_sent_at).format('h:mm A MMM D, YYYY')}</Td>
                                <Td style={rowValueStyle} hidden={!showIdentityProviderColumn}>{conversion.identities}Anypoint</Td>
                                <Td style={rowValueStyle} hidden={!showCreatedDateColumn}> {moment(conversion.created_at).format('h:mm A MMM D, YYYY')}</Td>
                                <Td style={rowValueStyle} hidden={!showLastModifiedDateColumn}>{moment(conversion.updated_at).format('h:mm A MMM D, YYYY')}</Td>
                                <Td style={rowValueStyle} hidden={!showLastLoginDateColumn}>{moment(conversion.last_sign_in_at).format('h:mm A MMM D, YYYY')}</Td>
                                <Td style={rowValueStyle} hidden={!showStatusColumn}>Enabled</Td>
                                <Td></Td>
                            </Tr>
                        ))}
                </Tbody>

            </Table>
        </div>
    );
};

export default InviteForm;
