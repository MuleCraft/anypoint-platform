import { useState, useContext } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import {
    Box,
    Flex, Link,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    Text,
} from "@chakra-ui/react";
import CreateTeams from "../../../components/AM-Component/AM-Teams/CreateTeams";
import TeamsTable from "../../../components/AM-Component/AM-Teams/TeamsTable";
import EmptyRows from "../../../components/AM-Component/EmptyRows";
import fetchTeamsTableRows from "../../../Utils/TeamsTableRows";
import { AuthContext } from "../../../Utils/AuthProvider";
import { FiSearch } from "react-icons/fi";

export default function AMTeams({ name }) {

    const { userData } = useContext(AuthContext);
    const [activeItem, setActiveItem] = useState('teams');
    const [teamsTableData, setTeamsTableData] = useState([]);
    const [filterValue, setFilterValue] = useState("");

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [currentOrganization, setCurrentOrganization] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);


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
        data.teamname.toLowerCase().includes(filterValue.toLowerCase())
    );

    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <>
            <div className="home">
                <Nav name={name} />
                <div className="Wrapper">
                    <Flex>
                        <Box>
                            <Sidebar
                                sections={sections}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />
                        </Box>
                        <Flex direction="column" ml="200" mt="150" p={"20px 25px"} gap={8} w={'-webkit-fill-available'}>
                            <Stack mt={"-60px"} direction={"row"} spacing={6} align={'center'} justifyContent={'space-between'}>
                                <HStack spacing={5}>
                                    <CreateTeams
                                        filteredTeamsTableData={filteredTableData}
                                        orgId={currentOrganization}
                                    />
                                    <Text fontSize={14} color={"#747474"} fontWeight={500}>
                                        Teams are groups of users. Manage access more efficiently by organizing teams to reflect your company structure.{" "}
                                        <Link
                                            color={"#0176d3"}
                                            textDecoration={"underline"}
                                            href="https://docs.mulesoft.com/access-management/teams"
                                            target="_blank"
                                        >
                                            Learn more
                                        </Link>
                                    </Text>
                                </HStack>
                                <InputGroup maxW={"fit-content"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FiSearch />}
                                        color="gray.500"
                                    />
                                    <Input placeholder="Filter teams" fontSize={14} fontWeight={500}
                                        onChange={(e) => { setFilterValue(e.target.value) }}
                                    />
                                </InputGroup>
                            </Stack>
                            {filteredTableData.length === 0 ? (
                                <EmptyRows message={'No data to show'} />
                            ) : (
                                <TeamsTable tableData={filteredTableData} onOpenCreateChildGroup={openModal} userData={userData} />
                            )}
                        </Flex>
                    </Flex>
                </div>
            </div>
        </>
    );
}
