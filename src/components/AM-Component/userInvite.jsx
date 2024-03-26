import { useState } from 'react';
import {
    Box,
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

    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState([]);

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
    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', padding: '10px' };
    const rowValueStyle = { fontSize: 14, padding: '20px' };


    return (
        <Box position="fixed" maxW="85%">
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Button colorScheme="blue" onClick={onOpen}>Invite Users</Button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <form onSubmit={handleSubmit}>
                            <Box bg="modelColor" borderRadius="4px">
                                <ModalHeader fontSize="lg" fontWeight="800">Invite users</ModalHeader>
                            </Box>
                            <Divider />
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
