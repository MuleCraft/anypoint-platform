import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";

const TeamLimits = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [ancestors, setAncestors] = useState(null);

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
    }, []);
    console.log("group", group)
    console.log("anc", ancestors)


    const [activeItem, setActiveItem] = useState("Limits");
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

            <TableContainer pt={5}>
                <Table variant="simple" size="md">
                    <Thead borderBottomWidth="3px">
                        <Tr >
                            <Th style={columnTitleStyle} w={"85%"}>Name</Th>
                            <Th style={columnTitleStyle}>Used</Th>
                            <Th style={columnTitleStyle}>Limit</Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }}>
                            <Td style={rowValueStyle}>inches</Td>
                            <Td style={rowValueStyle}>1</Td>
                            <Td style={rowValueStyle}>1000</Td>
                        </Tr>
                        <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }}>
                            <Td style={rowValueStyle}>inches</Td>
                            <Td style={rowValueStyle}>1</Td>
                            <Td style={rowValueStyle}>100</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    );
};

export default TeamLimits;
