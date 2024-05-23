import { useContext, useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Checkbox,
    Divider,
    Flex,
    HStack,
    Input,
    Stack,
    Text,
    Textarea,
    Button,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
    InputLeftElement,
    Link,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../Utils/supabase";
import FlexableTabs from "../FlexableTabs";
import { FiSearch } from "react-icons/fi";
import BusinessGroupTable from "./BusinessGroupTable";
import fetchBgTableRows from "../../Utils/BgTableRows";
import { AuthContext } from "../../Utils/AuthProvider";
import EmptyRows from "./EmptyRows";
import CreateBusinessGroup from "./CreateBusinessGroup";

const BGChildGroup = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const toast = useToast();
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
    }, []);

    const [activeItem, setActiveItem] = useState("Child Groups");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [

                { name: 'Settings', label: 'Settings', path: `/accounts/businessGroups/${id}` },
                { name: 'Child Groups', label: 'Child Groups', path: `/accounts/businessGroups/${id}/children` },

            ],
        },

    ];


    const { userData } = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentOrganization, setCurrentOrganization] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (userData && (currentUserName === '')) {
        setCurrentUserEmail(userData.email);
        setCurrentUserName(userData.display_name);
        setCurrentOrganization(userData.company);
    }

    const fetchRows = async () => {
        const tableRowData = await fetchBgTableRows(currentUserName);
        setTableData(tableRowData);
    }

    if (userData && (tableData.length === 0)) {
        fetchRows();
    }

    const filteredTableData = tableData.filter((data) =>
        (data.businessGroupId === id || data.parentGroupID === id) &&
        data.organizationName === group.organizationName || group.parentGroupID === ""
    );

    console.log(filteredTableData)
    return (

        <Box w={'100%'} h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={190} mt={'90px'}>
            <Flex alignItems="center" justify="space-between" ml={7}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/businessGroups">
                            Business Groups
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID === "" ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/businessGroups/${id}`}
                            >
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )

                    }
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

            </Flex>
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Flex alignItems="center" justifyContent="space-between" zIndex={0} width="1550px" mt={7} ml={7} >
                <Flex alignItems="center" gap={5}>
                    <CreateBusinessGroup
                        currentUserEmail={currentUserEmail}
                        currentUserName={currentUserName}
                        currentOrganization={currentOrganization}
                        filteredTableData={filteredTableData}
                        isOpen={isModalOpen} onClose={closeModal} onOpen={openModal}
                    />
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Business groups are isolated scopes for managing access. Users
                        and teams may access resources in a business group through
                        their permissions.{" "}
                        <Link
                            color={"#0176d3"}
                            textDecoration={"underline"}
                            href="https://docs.mulesoft.com/access-management/business-groups"
                            target="_blank"
                        >
                            Learn more
                        </Link>
                    </Text>
                </Flex>
                <Flex gap={10} alignItems="center">
                    <InputGroup maxW={"fit-content"}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<FiSearch />}
                            color="gray.500"
                        />
                        <Input placeholder="Filter Business Group" fontSize={14}
                            onChange={(e) => { setFilterValue(e.target.value) }}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {filteredTableData.length === 0 ? (
                <EmptyRows message={'No data to show'} />
            ) : (
                <Box m={7}>
                    <BusinessGroupTable tableData={filteredTableData} onOpenCreateChildGroup={openModal} userData={userData} />
                </Box>
            )}
        </Box >
    );
};

export default BGChildGroup;
