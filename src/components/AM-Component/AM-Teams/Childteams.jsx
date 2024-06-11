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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
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
    const { userData } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState("ChildTeams");
    const [teamsTableData, setTeamsTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentOrganization, setCurrentOrganization] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const [group, setGroup] = useState(null);


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

                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (userData && (currentUserName === '')) {
        setCurrentUserEmail(userData.email);
        setCurrentUserName(userData.display_name);
        setCurrentOrganization(userData.organizationId);
    }

    const fetchRows = async () => {
        const tableRowData = await fetchTeamsTableRows(currentOrganization);
        setTeamsTableData(tableRowData);
        // console.log('teams table data:',teamsTableData);
    }

    if (userData && (teamsTableData.length === 0)) {
        fetchRows();
    }

    const filteredTableData = teamsTableData.filter((data) =>
        data.teamname.toLowerCase().includes(filterValue.toLowerCase()),

    );


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

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };


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
                    )

                    }

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
                        <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                            Delete team...
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
            <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={6}>
                    <CreateTeams
                        filteredTeamsTableData={filteredTableData}
                        orgId={currentOrganization}
                    />
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Child teams inherit permissions from their parents.
                    </Text>
                </HStack >
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
            </Stack >
            {
                filteredTableData.length === 0 ? (
                    <EmptyRows message={'No data to show'} />
                ) : (
                    <Box p={5}>
                        <ChildTeamsTable tableData={filteredTableData} onOpenCreateChildGroup={openModal} userData={userData} id={id} />
                    </Box>
                )
            }
        </Box >
    );
};

export default ChildTeams;
