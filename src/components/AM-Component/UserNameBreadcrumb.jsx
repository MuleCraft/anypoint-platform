import { useEffect, useState } from 'react';
import adminAuthClient from '../../Utils/api';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Text, BreadcrumbItem, Heading, Checkbox, BreadcrumbLink, Flex, Box, Breadcrumb, Divider, Table, Thead, Tr, Th, Tbody, Td, Stack, Input, Button, HStack } from '@chakra-ui/react';
import moment from 'moment';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import userId from '../../pages/Access-Management/utils/AM-UserID';
import FlexableTabs from '../FlexableTabs';
import { PiPencilLight } from "react-icons/pi";
import supabase from '../../Utils/supabase';

const UserNameBreadcrumb = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [, setUserData] = useState(null);
    const [activeItem, setActiveItem] = useState('Settings');
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [editableName, setEditableName] = useState('');
    const [editableEmail, setEditableEmail] = useState('');
    const [iconButtonVisible, setIconButtonVisible] = useState(true);
    const [emailButtonVisible, setEmailButtonVisible] = useState(true); // State to control the visibility of the email icon button

    const handleEdit = () => {
        setIsEditing(true);
        setEditableName(user?.user_metadata?.full_name || '');
        setIconButtonVisible(false);
        setEmailButtonVisible(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditableName(user?.user_metadata?.full_name || '');
        setIconButtonVisible(true);
        setEmailButtonVisible(true);
    };

    const handleEditEmail = () => {
        setIsEditingEmail(true);
        setEditableEmail(user?.email || '');
        setIconButtonVisible(false);
        setEmailButtonVisible(false);
    };

    const handleCancelEmail = () => {
        setIsEditingEmail(false);
        setEditableEmail(user?.email || '');
        setIconButtonVisible(true);
        setEmailButtonVisible(true);
    }

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

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

    const handleNameSubmit = async (id) => {
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("users")
            .upsert([
                {
                    id: id,
                    full_name: editableName,

                },
            ]);
        if (error) {
            console.error("Error inserting additional details:", error.message);
        } else {
            console.log("Additional details inserted:", data);
        }
    }

    const handleEmailSubmit = async (id) => {
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("users")
            .upsert([
                {
                    id: id,
                    email: editableEmail,

                },
            ]);
        if (error) {
            console.error("Error inserting additional details:", error.message);
        } else {
            console.log("Additional details inserted:", data);
        }
    }



    const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize' };
    const rowValueStyle = { fontSize: 14 };

    return (
        <Box mt="-60px" >
            <Flex alignItems="center" justify="space-between">
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
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Stack spacing={3} mt={7} mb={7}>
                <HStack justify="space-between">
                    <Box w='full' h='40px' >
                        <Text fontSize="xs">Username</Text>
                    </Box>
                    <Box w='full' h='40px'>
                        <Text fontSize="xs">{user?.user_metadata.full_name}</Text>
                    </Box>
                    <Box w='full' h='40px'>
                    </Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w='full' h='40px' >
                        <Text fontSize="xs">Created</Text>
                    </Box>
                    <Box w='full' h='40px'>
                        <Text fontSize="xs">{moment(user?.created_at).format('  YYYY/MM/DD')}</Text>
                    </Box>
                    <Box w='full' h='40px'>
                    </Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w='full' h='40px' >
                        <Text fontSize="xs">Multi-factor auth</Text>
                    </Box>
                    <Box w='full' h='40px'>
                        <Text fontSize="xs">Not Enabled</Text>
                    </Box>
                    <Box w='full' h='40px'>
                    </Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Box mt="10">
                <Box mt={5} mb={10} >
                    <Heading fontSize="sm" mb={7}>Identity Provider Profiles</Heading>
                    <Table variant="simple" size="md">
                        <Thead borderBottomWidth="3px">
                            <Tr>
                                <Th style={columnTitleStyle}>Identity Provider</Th>
                                <Th style={columnTitleStyle}>Username</Th>
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
                <Stack spacing={3} mt={7} mb={7}>
                    <HStack justify="space-between">
                        <Box w='full' h='40px'>
                            <Text fontSize="xs">Username</Text>
                        </Box>
                        <Box w='full' h='40px'>
                            {isEditing ? (
                                <Input
                                    fontSize="xs"
                                    value={editableName}
                                    onChange={(e) => setEditableName(e.target.value)}
                                    size="sm"
                                    width={500}
                                    height={10}
                                />
                            ) : (
                                <Text fontSize="xs" textAlign="left">{user?.user_metadata.full_name}</Text>
                            )}
                        </Box>
                        <Box w='full' h='40px'>
                            {iconButtonVisible ? (
                                <IconButton
                                    icon={<PiPencilLight />}
                                    onClick={handleEdit}
                                    variant="ghost"
                                    size="sm"

                                />
                            ) : (<Box />)}
                        </Box>
                    </HStack>
                    <HStack justify="space-between">
                        <Box w='full' h='40px' >
                            <Text fontSize="xs">Exempt from MFA requirement</Text>
                        </Box>
                        <Box w='full' h='40px'>
                            <Checkbox defaultChecked />
                        </Box>
                        <Box w='full' h='40px'>
                        </Box>
                    </HStack>
                    <Divider mt={5} />
                    <HStack justify="space-between" mt={5}>
                        <Box w='full' h='40px' >
                            <Text fontSize="xs">Email</Text>
                        </Box>
                        <Box w='full' h='40px'>
                            {isEditingEmail ? (
                                <Input
                                    fontSize="xs"
                                    value={editableEmail}
                                    onChange={(e) => setEditableEmail(e.target.value)}
                                    size="sm"
                                    width={500}
                                    height={10}
                                />
                            ) : (
                                <Text fontSize="xs" textAlign="left">{user?.email}</Text>
                            )}
                        </Box>
                        <Box w='full' h='40px'>
                            {emailButtonVisible ? (
                                <IconButton
                                    icon={<PiPencilLight />}
                                    onClick={handleEditEmail}
                                    variant="ghost"
                                    size="sm"
                                />
                            ) : (<Box />)}
                        </Box>
                    </HStack>
                </Stack>

            </Box>
            {(isEditing) && (
                <Stack direction="row" spacing={5} mt={20} px={4} justifyContent="space-between">
                    <Button size="md" variant="outline" onClick={handleCancel} colorScheme="blue">Discard Changes</Button>
                    <Button size="md" onClick={handleNameSubmit} colorScheme="blue">Save Changes</Button>
                </Stack>
            )}

            {
                (isEditingEmail) && (
                    <Stack direction="row" spacing={5} mt={20} px={4} justifyContent="space-between">
                        <Button variant="outline" size="md" onClick={handleCancelEmail} colorScheme="blue">Discard Changes</Button>
                        <Button size="md" onClick={handleEmailSubmit} colorScheme="blue">Save Changes</Button>
                    </Stack>
                )
            }
        </Box>
    );
};

export default UserNameBreadcrumb;
