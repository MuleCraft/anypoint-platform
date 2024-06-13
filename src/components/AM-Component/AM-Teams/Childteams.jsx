import { useContext, useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Stack,
    HStack,
    Text,
    Input,
    InputLeftElement,
    InputGroup,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormLabel,
    VStack
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import EmptyRows from "../../../components/AM-Component/EmptyRows";
import fetchTeamsTableRows from "../../../Utils/TeamsTableRows";
import { AuthContext } from "../../../Utils/AuthProvider";
import CreateTeams from "./CreateTeams";
import ChildTeamsTable from "./ChildTeamsTable";
import supabase from "../../../Utils/supabase";

const ChildTeams = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("ChildTeams");
    const [teamsTableData, setTeamsTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentOrganization, setCurrentOrganization] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteInputValue, setDeleteInputValue] = useState("");
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
    const openModal = () => setIsModalOpen(true);
    const [group, setGroup] = useState(null);
    const toast = useToast();
    const [ancestors, setAncestors] = useState('');

    const fetchTableData = async () => {
        const tableRowData = await fetchTeamsTableRows(currentOrganization);
        setTeamsTableData(tableRowData);
    };

    useEffect(() => {
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
                    setAncestors(data[0].ancestors)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    useEffect(() => {
        if (userData && currentUserName === '') {
            setCurrentUserEmail(userData.email);
            setCurrentUserName(userData.display_name);
            setCurrentOrganization(userData.organizationId);
        }
    }, [userData, currentUserName]);

    useEffect(() => {
        if (userData && teamsTableData.length === 0) {
            fetchTableData();
        }
    }, [userData, teamsTableData.length]);

    const filteredTableData = teamsTableData.filter((data) =>
        data.teamname.toLowerCase().includes(filterValue.toLowerCase())
    );

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
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
                fetchTableData(); // Refetch the table data
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
                            aria-label="Options"
                            icon={<HiEllipsisHorizontal width="10px" />}
                            variant="outline"
                            h={"30px"}
                            color="gray.500"
                            border={"1px solid #5c5c5c"}
                            right={30}
                        />
                        <MenuList borderRadius={0}>
                            <MenuItem fontSize="base" color="white" onClick={() => setDeleteOpen(true)} bgColor="delete">
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
                    <CreateTeams
                        filteredTeamsTableData={filteredTableData}
                        orgId={currentOrganization}
                    />
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Child teams inherit permissions from their parents.
                    </Text>
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
            {
                filteredTableData.length === 0 ? (
                    <EmptyRows message={'No data to show'} />
                ) : (
                    <Box p={5}>
                        <ChildTeamsTable tableData={filteredTableData} onOpenCreateChildGroup={openModal} userData={userData} id={id} fetchTableData={fetchTableData} />
                    </Box>
                )
            }
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
        </Box >
    );
};

export default ChildTeams;
