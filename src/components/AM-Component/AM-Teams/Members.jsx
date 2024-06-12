import { useContext, useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Stack,
    HStack,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Divider,
    ModalBody,
    FormControl,
    FormLabel,
    Text,
    Input,
    ModalFooter,
    InputGroup,
    InputLeftElement,
    Radio,
    FormErrorMessage,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../../Utils/AuthProvider";

const Members = () => {
    const { id } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const toast = useToast();
    const { userData } = useContext(AuthContext);
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [selectedMemberName, setSelectedMemberName] = useState('');
    const [teamName, setTeamName] = useState('');

    const fetchGroupData = async () => {
        try {
            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("*")
                .eq("teamid", id)
                .single();

            if (error) {
                console.error("Error fetching group data:", error.message);
            } else {
                setGroup(data);
                setMembers(data.members || []);
                setTeamName(data.teamname);
            }
        } catch (error) {
            console.error("Error fetching group data:", error);
        }
    };

    useEffect(() => {
        fetchGroupData();
    }, [id]);

    useEffect(() => {
        const orgId = userData?.organizationId;

        if (orgId) {
            const fetchUsers = async () => {
                try {
                    const { data, error } = await supabase
                        .schema("mc_cap_develop")
                        .from("users")
                        .select("*")
                        .eq("organizationId", orgId);
                    if (error) {
                        console.error("Error fetching user data:", error.message);
                    } else {
                        setAllUsers(data);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUsers();
        }
    }, [userData]);

    const [user, setUser] = useState('');
    const [userSelectId, setUserId] = useState('');
    const [role, setRole] = useState('');
    const [isUserInvalid, setIsUserInvalid] = useState(false);
    const [isRoleInvalid, setIsRoleInvalid] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const handleCreate = async () => {
        let isValid = true;

        if (!user) {
            setIsUserInvalid(true);
            isValid = false;
        }

        if (!role) {
            setIsRoleInvalid(true);
            isValid = false;
        }

        if (isValid) {
            const selectedUser = allUsers.find((u) => u.id === userSelectId);
            const newMember = {
                memberid: selectedUser.id,
                memberfullname: selectedUser.full_name,
                memberusername: selectedUser.display_name,
                memberemail: selectedUser.email,
                membership_type: role
            };

            const updatedGroup = { ...group, members: [...group.members, newMember] };

            try {
                const { error } = await supabase
                    .schema("mc_cap_develop")
                    .from("teams")
                    .update({ members: updatedGroup.members })
                    .eq("teamid", id);

                if (error) {
                    console.error("Error updating environment:", error);
                } else {
                    toast({
                        title: "Environment Updated",
                        description: "",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setGroup(updatedGroup);
                    onClose();
                    fetchGroupData(); // Refetch the team data
                }
            } catch (error) {
                console.error("Error updating environment:", error);
            }
        }
    };

    const handleUserBlur = () => {
        if (!user) {
            setIsUserInvalid(true);
        } else {
            setIsUserInvalid(false);
        }
    };

    const handleRoleBlur = () => {
        if (!role) {
            setIsRoleInvalid(true);
        } else {
            setIsRoleInvalid(false);
        }
    };

    const handleMenuItemClick = (display_name) => {
        const selectedUser = allUsers.find((u) => u.display_name === display_name);
        if (selectedUser) {
            setUser(selectedUser.display_name);
            setUserId(selectedUser.id);
            setIsUserInvalid(false);
            setIsMenuOpen(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setUser(value);
        if (value.length > 0) {
            const filtered = allUsers.filter((u) =>
                u.display_name && u.display_name.toLowerCase().includes(value.toLowerCase()) &&
                !members.some(member => member.memberid === u.id)
            );
            setFilteredUsers(filtered);
            setIsMenuOpen(true);
        } else {
            setIsMenuOpen(false);
        }
    };

    const handleType = async (memberId, newType) => {
        const selectedMember = members.find((m) => m.memberid === memberId);
        if (selectedMember && selectedMember.membership_type !== newType) {
            const updatedMembers = members.map((m) =>
                m.memberid === memberId ? { ...m, membership_type: newType } : m
            );

            try {
                const { error } = await supabase
                    .schema("mc_cap_develop")
                    .from("teams")
                    .update({ members: updatedMembers })
                    .eq("teamid", id);

                if (error) {
                    console.error("Error updating membership type:", error);
                } else {
                    toast({
                        title: "Membership Type Updated",
                        description: "",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setGroup({ ...group, members: updatedMembers });
                    fetchGroupData(); // Refetch the team data
                }
            } catch (error) {
                console.error("Error updating membership type:", error);
            }
        }
    };

    const handleDeleteMember = async () => {
        const updatedMembers = members.filter(m => m.memberid !== selectedMemberId);

        try {
            const { error } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .update({ members: updatedMembers })
                .eq("teamid", id);

            if (error) {
                console.error("Error deleting member:", error);
            } else {
                toast({
                    title: "Member Deleted",
                    description: "",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                setGroup({ ...group, members: updatedMembers });
                fetchGroupData(); // Refetch the team data
                onDeleteClose(); // Close the delete modal
            }
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    const handleRemoveClick = (memberId, memberName) => {
        setSelectedMemberId(memberId);
        setSelectedMemberName(memberName);
        onDeleteOpen();
    };

    // const handleDeleteTeam = async () => {
    //     try {
    //         const { error } = await supabase
    //             .schema("mc_cap_develop")
    //             .from("teams")
    //             .delete()
    //             .eq("teamid", id);

    //         if (error) {
    //             console.error("Error deleting team:", error.message);
    //             toast({
    //                 title: "Error Deleting Team",
    //                 description: error.message,
    //                 status: "error",
    //                 duration: 2000,
    //                 isClosable: true,
    //                 position: "top-right"
    //             });
    //         } else {
    //             toast({
    //                 title: "Team Deleted",
    //                 description: "The team has been deleted successfully.",
    //                 status: "success",
    //                 duration: 2000,
    //                 isClosable: true,
    //                 position: "top-right"
    //             });
    //             history.push("/accounts/teams");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting team:", error);
    //         toast({
    //             title: "Error",
    //             description: "An error occurred while deleting the team.",
    //             status: "error",
    //             duration: 2000,
    //             isClosable: true,
    //             position: "top-right"
    //         });
    //     }
    // };

    const handleDeleteTeam = async () => {
        try {
            // Fetch teams where the id is present in ancestor_group_ids
            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("teamid")
                .contains("ancestor_group_ids", [id]);

            if (error) {
                console.error("Error checking ancestor_group_ids:", error.message);
                toast({
                    title: "Error",
                    description: error.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                return;
            }

            if (data.length > 0) {
                // Extract teamid of matched teams
                const teamIdsToDelete = data.map(team => team.teamid);

                // Delete the teams with matching teamid
                const { deleteError } = await supabase
                    .schema("mc_cap_develop")
                    .from("teams")
                    .delete()
                    .in("teamid", teamIdsToDelete);

                if (deleteError) {
                    console.error("Error deleting teams:", deleteError.message);
                    toast({
                        title: "Error Deleting Teams",
                        description: deleteError.message,
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    });
                } else {
                    toast({
                        title: "Teams Deleted",
                        description: "The selected teams have been deleted successfully.",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                        position: "top-right"
                    });
                    history.push("/accounts/teams");
                }
            } else {
                toast({
                    title: "No Teams Found",
                    description: "No teams found with the specified ancestor_group_ids.",
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
            }
        } catch (error) {
            console.error("Error deleting team:", error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the team.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
        }
    };

    const [activeItem, setActiveItem] = useState("Members");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [
                { name: 'Members', label: 'Members', path: `/accounts/teams/${id}/users` },
                { name: 'Permissions', label: 'Permissions', path: `/accounts/teams/${id}/permissions` },
                { name: 'ChildTeams', label: 'Child teams', path: `/accounts/teams/${id}/child_teams` },
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${id}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${id}/limits` },
            ],
        },
    ];

    const columnTitleStyle = {
        fontSize: 14,
        color: "#444444",
        fontWeight: 800,
        textTransform: "capitalize",
        padding: "10px",
    };
    const rowValueStyle = { fontSize: 14, padding: "15px" };

    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams">
                            Teams
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentteamId === null ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/teams/${group?.teamid}`}
                            >
                                {group?.teamname}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/teams/${id}/settings`}
                        >
                            {group?.teamname}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {group?.parentteamId === null ? ("") : (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HiEllipsisHorizontal width="10px" />}
                            variant="outline"
                            h={"30px"}
                            color="gray.500"
                            border={"1px solid #5c5c5c"}
                            right={30}
                        />
                        <MenuList borderRadius={0}>
                            <MenuItem fontSize="base" color="white" bgColor="delete" onClick={handleDeleteTeam} >
                                Delete team...
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}

            </Flex>
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={6}>
                    <Button colorScheme="blue" onClick={onOpen} fontSize="xs" isDisabled={group?.parentteamId === null}>
                        Add members
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={4}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Add team members
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody>
                                <FormControl pl={4} isInvalid={isUserInvalid}>
                                    <FormLabel fontSize="base">Users</FormLabel>
                                    <Flex gap={5} alignItems="center" justifyContent="center">
                                        <InputGroup>
                                            <InputRightElement
                                                pointerEvents="none"
                                                children={<FiSearch />}
                                                color="gray.500"
                                            />
                                            <Input
                                                type="text"
                                                value={user}
                                                onChange={handleInputChange}
                                                onBlur={handleUserBlur}
                                                placeholder="Select..."
                                                borderColor={isUserInvalid ? 'red.500' : 'inherit'}
                                            />
                                        </InputGroup>
                                        <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} size="300px">
                                            <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                            <MenuList position="absolute" width='432px' right={5} top={'20px'}>
                                                {filteredUsers.map((filteredUser) => (
                                                    <MenuItem key={filteredUser.id} onClick={() => handleMenuItemClick(filteredUser.display_name, filteredUser.id)}>
                                                        {filteredUser.display_name}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Menu>
                                    </Flex>
                                    {isUserInvalid && <FormErrorMessage>required.</FormErrorMessage>}
                                </FormControl>

                                <FormControl pl={4} isInvalid={isRoleInvalid}>
                                    <FormLabel fontSize="base" pt={5}>
                                        Type
                                    </FormLabel>
                                    <Stack onBlur={handleRoleBlur}>
                                        <Radio
                                            size='lg'
                                            name='role'
                                            value='member'
                                            isChecked={role === 'member'}
                                            onChange={(e) => setRole(e.target.value)}
                                            color='boxColor'
                                            alignItems="flex-end"
                                        >
                                            <FormLabel fontSize="base">
                                                Member
                                            </FormLabel>
                                            <Text fontSize="base" color="gray">
                                                Inherits permissions from this team and its parents.
                                            </Text>
                                        </Radio>
                                        <Radio
                                            size='lg'
                                            name='role'
                                            value='maintainer'
                                            isChecked={role === 'maintainer'}
                                            onChange={(e) => setRole(e.target.value)}
                                            color='boxColor'
                                            alignItems="flex-end"
                                        >
                                            <FormLabel fontSize="base">
                                                Maintainer
                                            </FormLabel>
                                            <Text fontSize="base" color="gray">
                                                Also manages team membership and child teams.
                                            </Text>
                                        </Radio>
                                    </Stack>
                                    {isRoleInvalid && <FormErrorMessage pt={3}>Type is required.</FormErrorMessage>}
                                </FormControl>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                                    Cancel
                                </Button>
                                <Button onClick={handleCreate} colorScheme="blue" fontSize="base">
                                    Create
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
                <InputGroup maxW={"fit-content"} ml={0}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch />}
                        color="gray.500"
                    />
                    <Input placeholder="Filter Teams" fontSize={14} fontWeight={500}
                        onChange={(e) => { setFilterValue(e.target.value) }}
                    />
                </InputGroup>
            </Stack>
            <TableContainer pt={5} px={5}>
                <Table variant="simple" size="md">
                    <Thead borderBottomWidth="3px">
                        <Tr>
                            <Th style={columnTitleStyle}>Name</Th>
                            <Th style={columnTitleStyle}>Username</Th>
                            <Th style={columnTitleStyle}>Email</Th>
                            <Th style={columnTitleStyle}>Type</Th>
                            {group?.parentteamId === null ? (
                                ""
                            ) : (
                                <Th style={columnTitleStyle} w={"80px"}></Th>)}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.length > 0 && members.map((dataValue, index) => (
                            <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }} key={index}>
                                <Td style={rowValueStyle}>
                                    {userData?.id === dataValue?.memberid ? (
                                        <Box display="flex" alignItems="center" gap={3}>
                                            <Text>{dataValue.memberfullname}</Text>
                                            <Text fontSize="12" fontWeight="500" color="gray">This is you</Text>
                                        </Box>) : (
                                        <Box display="flex" alignItems="center" gap={3}>
                                            <Text>{dataValue.memberfullname}</Text>
                                        </Box>
                                    )}
                                </Td>
                                <Td style={rowValueStyle}>{dataValue.memberusername}</Td>
                                <Td style={rowValueStyle}>{dataValue.memberemail}</Td>
                                <Td style={rowValueStyle}>
                                    <Menu>
                                        <MenuButton as={Box} display="flex" alignItems="center" cursor="pointer" flexDir="row">
                                            <Text mr={2}>{dataValue.membership_type}  <ChevronDownIcon w={10} h={5} /></Text>

                                        </MenuButton>
                                        <MenuList position="absolute" width='50px' right={-120} top={'10px'}>
                                            <MenuItem onClick={() => handleType(dataValue.memberid, 'member')}>
                                                <Flex flexDir="column" gap={1}>
                                                    <Text fontWeight="bold">Member</Text>
                                                    <Text fontSize="base" color="gray">Inherits permissions from this</Text>
                                                    <Text fontSize="base" color="gray">team and its parents.</Text>
                                                </Flex>
                                            </MenuItem>
                                            <MenuItem onClick={() => handleType(dataValue.memberid, 'maintainer')}>
                                                <Box>
                                                    <Text fontWeight="bold">Maintainer</Text>
                                                    <Text fontSize="base" color="gray">Also manages team</Text>
                                                    <Text fontSize="base" color="gray">membership and child teams.</Text>
                                                </Box>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                                {group?.parentteamId === null ? (
                                    ""
                                ) : (
                                    <Td style={rowValueStyle}>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Options"
                                                icon={<HiEllipsisHorizontal width="10px" />}
                                                variant="outline"
                                                h={"30px"}
                                                color="gray.500"
                                                border={"1px solid #5c5c5c"}
                                                right={30}
                                            />
                                            <MenuList borderRadius={0}>
                                                <MenuItem fontSize="base" color="white" bgColor="delete" onClick={() => handleRemoveClick(dataValue.memberid, dataValue.memberfullname)}>
                                                    Remove...
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                )}

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal onClose={onDeleteClose} isOpen={isDeleteOpen} isCentered>
                <ModalOverlay />
                <ModalContent minW={"600px"}>
                    <ModalHeader
                        bg={"#f3f3f3"}
                        fontSize={20}
                        fontWeight={800}
                        color={"#444444"}
                        borderTopRadius={15}
                        borderBottom={"1px solid #e5e5e5"}
                    >
                        Are you sure?
                    </ModalHeader>
                    <ModalBody p={"32px 32px"}>
                        <VStack spacing={4}>
                            <VStack spacing={0} fontSize={14} align={"flex-start"}>
                                <FormLabel color={"#747474"} fontWeight={500} fontSize={14}>
                                    <b>This action cannot be undone.</b> This will remove user <b>{selectedMemberName}</b> from the team
                                    "{teamName}" as well as all associated membership information.
                                </FormLabel>
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={"space-between"} borderTop={"1px solid #e5e5e5"}>
                        <Button onClick={onDeleteClose} variant={"outline"} fontSize={14}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteMember}
                            variant={"formButtons"}
                        >
                            Remove
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    );
};

export default Members;
