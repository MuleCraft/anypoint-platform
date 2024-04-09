import { useEffect, useState } from 'react';
import adminAuthClient from '../../Utils/api';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Text, BreadcrumbItem, Heading, Checkbox, BreadcrumbLink, Flex, Box, Breadcrumb, Divider, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import moment from 'moment';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import userId from '../../pages/Access-Management/utils/AM-UserID';
import FlexableTabs from '../FlexableTabs';
import { PiPencilLight } from "react-icons/pi";

const UserNameBreadcrumb = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [, setUserData] = useState(null);
    const [activeItem, setActiveItem] = useState('Settings');
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    console.log(user)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await adminAuthClient.listUsers();
                const user = data.users.find(user => user.id === id);

                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    console.log("User data fetched successfully:", data);
                    setUserData(data.users);
                    setUser(user);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);



    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', };
    const rowValueStyle = { fontSize: 14, };

    return (
        <Box mt="-60px" >

            <Flex alignItems="center" justifyContent="space-between" >
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href='/accounts/users/'>Users</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" fontWeight="600" href={`/accounts/users/${user?.id}`}>
                            {user?.user_metadata.full_name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
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
                            Reset Password...
                        </MenuItem>
                        <MenuItem fontSize="sm" isDisabled>
                            Reset Multi-factor auth...
                        </MenuItem>
                        <MenuItem fontSize="sm" color="red" >
                            Disable user...
                        </MenuItem>
                        <MenuItem fontSize="sm" color="red">
                            Delete user...
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Box >
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Box mt="120">
                <Flex direction="column" gap={5} mb={10} >
                    <Flex direction="row" maxW="500px" justifyContent="space-between" textAlign="left">
                        <Text fontSize="xs">Username</Text>
                        <Text fontSize="xs">{user?.user_metadata.full_name}</Text>
                    </Flex>
                    <Flex direction="row" maxW="500px" justifyContent="space-between">
                        <Text fontSize="xs">Created</Text>
                        <Text fontSize="xs">{moment(user?.created_at).format('  YYYY/MM/DD')}</Text>
                    </Flex>
                    <Flex direction="row" maxW="500px" justifyContent="space-between">
                        <Text fontSize="xs">Multi-factor auth</Text>
                        <Text fontSize="xs"> Not Enabled</Text>
                    </Flex>

                </Flex>
                <Divider />
                <Box mt={5} mb={10} >
                    <Heading fontSize="sm" mb={7}>Identity Provider Profiles</Heading>
                    <Table variant="simple" size="md">
                        <Thead borderBottomWidth="3px">
                            <Tr>
                                <Th style={columnTitleStyle} >Identity Provider</Th>

                                <Th style={columnTitleStyle}>	Username</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td style={rowValueStyle}>Anypoint</Td>
                                <Td style={rowValueStyle}>{user?.user_metadata.full_name}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                <Divider />
                <Flex direction="column" gap={5} m={10} >
                    <Flex direction="row" maxW="800px" justifyContent="space-between">
                        <Text fontSize="xs">Username</Text>
                        <Text fontSize="xs">{user?.user_metadata.full_name}</Text>
                        <PiPencilLight />
                    </Flex>

                    <Flex direction="row" maxW="415px" justifyContent="space-between">
                        <Text fontSize="xs">Exempt from MFA requirement</Text>
                        <Checkbox isDisabled />

                    </Flex>

                </Flex>
                <Divider />
                <Flex direction="column" gap={5} m={10}>
                    <Flex direction="row" maxW="930px" justifyContent="space-between">
                        <Text fontSize="xs">Email</Text>
                        <Text fontSize="xs">{user?.email}</Text>
                        <Box>
                            <PiPencilLight />
                        </Box>
                    </Flex>

                    <Flex direction="row" maxW="455px" justifyContent="space-between">
                        <Text></Text>
                        <Text>Verified</Text>
                    </Flex>

                </Flex>
            </Box>

        </Box>
    );
};

export default UserNameBreadcrumb;
