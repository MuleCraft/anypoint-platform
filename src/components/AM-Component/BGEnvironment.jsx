import { useContext, useEffect, useState, useMemo } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../Utils/supabase";
import FlexableTabs from "../FlexableTabs";
import fetchBgTableRows from "../../Utils/BgTableRows";
import { AuthContext } from "../../Utils/AuthProvider";
import EmptyRows from "./EmptyRows";
import BGEnvironmentTable from "./BGEnvironmentTable";
import { HiEllipsisHorizontal } from "react-icons/hi2";

const BGEnvironment = () => {
    const { id } = useParams();
    const { userData } = useContext(AuthContext);

    const [group, setGroup] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [activeItem, setActiveItem] = useState("Environments");
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

        if (userData && tableData.length === 0) {
            fetchRows();
        }
    }, [userData, tableData.length]);

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const openModal = () => setIsModalOpen(true);

    const filteredTableData = useMemo(() => {
        return tableData.filter(
            (data) =>
                (data?.businessGroupId === id || data?.parentGroupID === id) &&
                (data?.organizationName === group?.organizationName || group?.parentGroupID === "")
        );
    }, [tableData, id, group?.organizationName, group?.parentGroupID]);

    const userId = useMemo(
        () => [
            {
                heading: "Access Management",
                items: [
                    { name: "Settings", label: "Settings", path: `/accounts/businessGroups/${id}` },
                    { name: "AccessOverview", label: "Access Overview", path: `/accounts/businessGroups/${id}/access` },
                    { name: "Child Groups", label: "Child Groups", path: `/accounts/businessGroups/${id}/children` },
                    { name: "Environments", label: "Environments", path: `/accounts/businessGroups/${id}/environments` },
                ],
            },
        ],
        [id]
    );

    return (
        <Box w={"100%"} h={"100%"} minW={0} flex={1} display={"flex"} flexDirection={"column"} ml={205} mt={"90px"}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/businessGroups">
                            Business Groups
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID && (
                        <BreadcrumbItem>
                            <BreadcrumbLink fontSize="lg" fontWeight="400" href={`/accounts/businessGroups/${id}`}>
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" fontWeight="600" href={`/accounts/businessGroups/${id}`}>
                            {group?.businessGroupName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {!group?.childGroups && (
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
                <FlexableTabs sections={userId} activeItem={activeItem} onItemSelect={handleItemSelect} />
            </Box>
            {filteredTableData.length === 0 ? (
                <EmptyRows message={"No data to show"} />
            ) : (
                <BGEnvironmentTable
                    tableData={filteredTableData}
                    onOpenCreateChildGroup={openModal}
                    userData={userData}
                    id={id}
                />
            )}
        </Box>
    );
};

export default BGEnvironment;
