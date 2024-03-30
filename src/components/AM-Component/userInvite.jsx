import { useContext, useState } from 'react';
import {
    Box,
    Flex,
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
    Divider,
    Menu,
    MenuButton,
    MenuList,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';

import "../../assets/Common.css";

import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";
import { makeData } from "./makeData";
import { ChevronDownIcon } from "@chakra-ui/icons";
import adminAuthClient from '../../Utils/api';
import { AuthContext } from '../../Utils/AuthProvider';


const defaultColumns = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Username",
        accessorKey: "username"
    },
    {
        header: "Email",
        accessorKey: "email"
    },
    {
        header: "Email verified date",
        accessorKey: "emailVerifiedDate"
    },
    {
        header: "Identity provider",
        accessorKey: "identityProvider"
    },
    {
        header: "Multi-factor auth",
        accessorKey: "multiFactorAuth"
    },
    {
        header: "Created date",
        accessorKey: "createdDate"
    },
    {
        header: "Last modified date",
        accessorKey: "lastModifiedDate"
    },
    {
        header: "Last login date",
        accessorKey: "lastLoginDate"
    },
    {
        header: "Status",
        accessorKey: "status"
    }
];

function InviteForm() {
    const [data] = useState(() => makeData());
    const [columns] = useState(() => [...defaultColumns]);
    const { userData } = useContext(AuthContext);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);
    const redirectTo = "http://localhost:127.0.0.1:3000/inviteduser"
    const table = useReactTable({
        data,
        columns,
        state: {
            columnVisibility,
            columnOrder
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        manualFilters: true,
        autoResetFilters: false
    });




    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', padding: '10px' };
    const rowValueStyle = { fontSize: 14, padding: '20px' };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [emails, setEmails] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const toast = useToast();

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
            await Promise.all(
                emailList.map(async (email) => {
                    const { error } = await adminAuthClient.inviteUserByEmail(email, { redirectTo });
                    if (error) {
                        console.error(`Error inviting user ${email}:`, error.message);
                        throw error;
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
            });
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
    return (
        <Box position="fixed" maxW="85%">
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Invite Users</Button>
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
                <Menu>
                    <MenuButton
                        variant="hideShow"
                        borderColor="#000"
                        borderWidth="1px"
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        Columns(5/10)
                    </MenuButton>
                    <MenuList p={4}>
                        {table.getAllLeafColumns().map(column => (
                            <div key={column.id} className="px-1">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={column.getIsVisible()}
                                        onChange={column.getToggleVisibilityHandler()}
                                    />{" "}
                                    {column.id}
                                </label>
                            </div>
                        ))}
                    </MenuList>
                </Menu>
            </Flex>

            <TableContainer>
                <Table variant="simple" >
                    <Thead borderBottomWidth="3px" >
                        {table.getHeaderGroups().map(headerGroup => (
                            <Tr key={headerGroup.id} >
                                {headerGroup.headers.map(header => (
                                    <Th key={header.id} style={columnTitleStyle}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody>
                        {table.getRowModel().rows.map(row => (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <Td key={cell.id} style={rowValueStyle}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    );
}

export default InviteForm;