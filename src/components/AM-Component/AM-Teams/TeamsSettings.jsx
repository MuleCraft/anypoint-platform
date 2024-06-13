import { useContext, useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Flex,
    HStack,
    Input,
    Stack,
    Text,
    Button,
    InputGroup,
    InputRightElement,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    ModalFooter,
    ModalBody,
    VStack,
    FormLabel,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";
import { AuthContext } from "../../../Utils/AuthProvider";

const TeamSetting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [group, setGroup] = useState(null);
    const [ancestors, setAncestors] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const toast = useToast();
    const { userData } = useContext(AuthContext);
    const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteInputValue, setDeleteInputValue] = useState("");
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);

    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("*")
                .eq("teamid", id);

            if (error) {
                console.error("Error fetching user data:", error.message);
            } else {
                setGroup(data[0]);
                setAncestors(data[0].ancestors);
                setEditedGroup(data[0]);  // Initialize editedGroup with the fetched data
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedGroup((prevGroup) => ({
            ...prevGroup,
            [name]: value,
        }));
        setChangesMade(true);
    };

    const handleSaveChanges = async () => {
        try {
            const { error: supabaseError } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .update({
                    teamname: editedGroup.teamname,
                    parentteamId: editedGroup.parentteamId,
                })
                .eq("teamid", id);

            if (supabaseError) {
                console.error("Error updating data in Supabase:", supabaseError.message);
                throw new Error(supabaseError.message);
            }

            toast({
                title: "Update successful",
                description: "Settings updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setChangesMade(false);
            fetchUserData();
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Setting update failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            console.error("Error saving changes:", error);
        }
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteInputValue("");
        setIsDeleteButtonDisabled(true);
    };

    const handleDeleteInputChange = (e) => {
        const value = e.target.value;
        setDeleteInputValue(value);
        setIsDeleteButtonDisabled(value.toLowerCase() !== group?.teamname?.toLowerCase());
    };

    const handleDeleteTeam = async () => {
        try {
            const { data: teamData, error: fetchError } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("*")
                .eq("teamid", id)
                .single();

            if (fetchError) {
                console.error("Error fetching team data:", fetchError.message);
                toast({
                    title: "Error",
                    description: "An error occurred while fetching the team data.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                return;
            }

            if (teamData.organizationId !== userData.organizationId) {
                toast({
                    title: "Error",
                    description: "You do not have permission to delete this team.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                return;
            }

            const { data: childTeams, error: childTeamsError } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .select("*")
                .eq("parentteamId", id);

            if (childTeamsError) {
                console.error("Error fetching child teams:", childTeamsError.message);
                toast({
                    title: "Error",
                    description: "An error occurred while fetching the child teams.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                return;
            }

            const deletePromises = childTeams.map(async (childTeam) => {
                const { error } = await supabase
                    .schema("mc_cap_develop")
                    .from("teams")
                    .delete()
                    .eq("teamid", childTeam.teamid);

                if (error) {
                    console.error(`Error deleting child team ${childTeam.teamid}:`, error.message);
                    throw new Error(`Error deleting child team ${childTeam.teamid}`);
                }
            });

            await Promise.all(deletePromises);

            const { error: deleteError } = await supabase
                .schema("mc_cap_develop")
                .from("teams")
                .delete()
                .eq("teamid", id);

            if (deleteError) {
                console.error("Error deleting team:", deleteError.message);
                toast({
                    title: "Error Deleting Team",
                    description: deleteError.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
            } else {
                toast({
                    title: "Team Deleted",
                    description: "The team and its child teams have been deleted successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                handleDeleteClose();
                navigate("/accounts/teams");
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

    const [activeItem, setActiveItem] = useState("Settings");
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

    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams">
                            Teams
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {ancestors && ancestors.map((ancestor) => (
                        <BreadcrumbItem key={ancestor.teamid}>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/teams/${ancestor.teamid}`}
                            >
                                {ancestor.teamname}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="400"
                            href={`/accounts/teams/${group?.teamid}`}
                        >
                            {group?.teamname}
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </Breadcrumb>
                {group?.parentteamId === null ? ("") : (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HiEllipsisHorizontal />}
                            variant='outline'
                            h={'28px'} color="gray.500"
                            border={'1px solid #5c5c5c'}
                        />
                        <MenuList p={'5px 0'} minW={'150px'} maxW={'240px'}>
                            <MenuItem fontSize={14} onClick={() => setDeleteOpen(true)} color={'white'}
                                bgColor='red.600'>
                                Delete Team...
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

            <Stack gap={50} mt={7} mb={7} ml={7}>
                {group?.parentteamId === null ? (
                    ""
                ) : (
                    <HStack justify="space-between" >
                        <Box w="full" h="40px" display="flex" flexDirection="column" gap={2}>
                            <Text fontSize="xs" fontWeight="500">Name</Text>
                            <Text fontSize="xs" w="85%" color="gray">A unique name. You can use alphanumeric characters, hyphens, and spaces.</Text>
                        </Box>
                        <Box w="100%" h="40px">
                            <Input
                                fontSize="xs"
                                name="teamname"
                                value={editedGroup?.teamname || ""}
                                onChange={handleInputChange}
                                size="sm"
                                width="100%"
                                height={10}
                            />
                        </Box>
                        <Box w="full" h="40px"></Box>
                    </HStack>
                )}
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px" display="flex" flexDirection="column" gap={2}>
                        <Text fontSize="xs" fontWeight="500">Parent Team</Text>
                        <Text fontSize="xs" w="85%" color="gray">Maintainers can move this team into another team they maintain. Any child teams will also be moved.</Text>
                    </Box>
                    {ancestors !== null && (
                        <InputGroup>
                            <Input
                                id="parentteam"
                                name="parentteam"
                                value={ancestors.find(ancestor => ancestor.teamid === editedGroup?.parentteamId)?.teamname || ''}
                                placeholder="Select parent team"
                                isReadOnly
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label="Select parent team"
                                    icon={<SlArrowDown />}
                                    onClick={() => setIsGroupMenuOpen(!isGroupMenuOpen)}
                                    variant="signin"
                                    position="absolute"
                                    right="8px"
                                    top="50%"
                                    transform="translateY(-50%)"
                                />
                                <Menu isOpen={isGroupMenuOpen} onClose={() => setIsGroupMenuOpen(false)}>
                                    <MenuList position="absolute" width='515px' right={-10} top={'50px'}>
                                        {ancestors.map((ancestor) => (
                                            <MenuItem
                                                key={ancestor.teamid}
                                                onClick={() => {
                                                    setEditedGroup((prevGroup) => ({
                                                        ...prevGroup,
                                                        parentteamId: ancestor.teamid,
                                                    }));
                                                    setIsGroupMenuOpen(false);
                                                }}
                                            >
                                                {ancestor.teamname}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </InputRightElement>
                        </InputGroup>
                    )}
                    <Box w="full" h="40px"></Box>
                </HStack>

                <Divider />
            </Stack>

            <Stack
                direction="row"
                spacing={5}
                px={4}
                justifyContent="space-between"
                ml={7}
            >
                <Button
                    size="md"
                    variant="outline"
                    onClick={() => {
                        setEditedGroup(group);
                        setChangesMade(false);
                    }}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                    borderRadius={4}
                    fontSize="base"
                >
                    Discard Changes
                </Button>
                <Button
                    size="md"
                    onClick={handleSaveChanges}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                    borderRadius={4}
                >
                    Save Changes
                </Button>
            </Stack>
            <Modal onClose={handleDeleteClose} isOpen={isDeleteOpen} isCentered>
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
                                    <b>This action cannot be undone.</b> This will delete the <b>{group?.teamname}</b> team and all of its associated information.
                                    Please type the name of the team to confirm.
                                </FormLabel>
                                <Input
                                    placeholder="Team name"
                                    mt={1}
                                    fontSize={14}
                                    fontWeight={500}
                                    value={deleteInputValue}
                                    onChange={handleDeleteInputChange}
                                />
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter borderBottomRadius={15} justifyContent={"space-between"} borderTop={"1px solid #e5e5e5"}>
                        <Button onClick={handleDeleteClose} variant={"outline"} fontSize={14}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteTeam}
                            variant={"formButtons"}
                            isDisabled={isDeleteButtonDisabled}
                            _hover={{ bgColor: "navy" }}
                        >
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default TeamSetting;
