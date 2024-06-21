import { useContext, useEffect, useState, useMemo } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Input,
    Text,
    InputGroup,
    InputLeftElement,
    Stack,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    HStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../Utils/supabase";
import FlexableTabs from "../FlexableTabs";
import { FiSearch } from "react-icons/fi";
import fetchBgTableRows from "../../Utils/BgTableRows";
import { AuthContext } from "../../Utils/AuthProvider";
import EmptyRows from "./EmptyRows";
import CreateBusinessGroup from "./CreateBusinessGroup";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import ChildGroupTable from "./AM-BusinessGroup/ChildGroupTable";

const BGChildGroup = () => {
    const { id } = useParams();
    const { userData } = useContext(AuthContext);

    const [group, setGroup] = useState(null);
    const [activeItem, setActiveItem] = useState("Child Groups");
    const [tableData, setTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .schema("mc_cap_develop")
                    .from("businessgroup")
                    .select("*")
                    .eq("businessGroupId", id);

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
    }, [id]);

    useEffect(() => {
        const fetchRows = async () => {
            if (userData?.organizationId) {
                const tableRowData = await fetchBgTableRows(userData.organizationId);
                setTableData(tableRowData);
            }
        };

        if (userData) {
            fetchRows();
        }
    }, [userData]);

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const filtered = useMemo(() => {
        return tableData.filter((data) => data.businessGroupId === id);
    }, [tableData, id]);

    const userId = useMemo(() => [
        {
            heading: 'Access Management',
            items: [
                { name: 'Settings', label: 'Settings', path: `/accounts/businessGroups/${id}` },
                { name: 'AccessOverview', label: 'Access Overview', path: `/accounts/businessGroups/${id}/access` },
                { name: 'Child Groups', label: 'Child Groups', path: `/accounts/businessGroups/${id}/children` },
                { name: 'Environments', label: 'Environments', path: `/accounts/businessGroups/${id}/environments` },
            ],
        },
    ], [id]);

    return (
        <Box w={'100%'} h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/businessGroups">
                            Business Groups
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID !== "" && (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/businessGroups/${id}`}
                            >
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/businessGroups/${id}`}
                        >
                            {group?.businessGroupName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {group?.childGroups === false && (
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
                            <MenuItem fontSize="sm" color="red" onClick="">
                                Delete business group...
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
                    <CreateBusinessGroup
                        currentUserEmail={userData?.email}
                        currentUserName={userData?.display_name}
                        currentOrganization={userData?.company}
                        currentOrgId={userData?.organizationId}
                        filteredTableData={filtered}
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        onOpen={openModal}
                    />
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Permissions for a business group do not apply to its child business groups.
                    </Text>
                </HStack>
                <InputGroup maxW={"fit-content"} ml={0}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch />}
                        color="gray.500"
                    />
                    <Input placeholder="Filter business group" fontSize={14} fontWeight={500}
                        onChange={(e) => setFilterValue(e.target.value)}
                    />
                </InputGroup>
            </Stack>
            <Box m={7}>
                <ChildGroupTable tableData={tableData} onOpenCreateChildGroup={openModal} userData={userData} id={id} />
            </Box>
        </Box>
    );
};

export default BGChildGroup;
