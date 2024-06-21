import { useState, useContext, useEffect } from "react";
import {
  Stack,
  Flex,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
} from "@chakra-ui/react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "./utils/AM-sidebar";
import CreateBusinessGroup from "../../components/AM-Component/CreateBusinessGroup";
import BusinessGroupTable from "../../components/AM-Component/BusinessGroupTable";
import { FiSearch } from "react-icons/fi";
import fetchBgTableRows from "../../Utils/BgTableRows";
import { AuthContext } from "../../Utils/AuthProvider";
import EmptyRows from "../../components/AM-Component/EmptyRows";

export default function AMBusinessGroup({ name, pathValue }) {
  const { userData } = useContext(AuthContext);

  const [activeItem, setActiveItem] = useState("BusinessGroups");
  const [tableData, setTableData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({
    userName: '',
    userEmail: '',
    organization: '',
    orgId: '',
  });

  useEffect(() => {
    if (userData) {
      setCurrentUser({
        userName: userData.display_name,
        userEmail: userData.email,
        organization: userData.company,
        orgId: userData.organizationId,
      });
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser.orgId && tableData.length === 0) {
        const tableRowData = await fetchBgTableRows(currentUser.orgId);
        setTableData(tableRowData);
      }
    };
    fetchData();
  }, [currentUser.orgId, tableData.length]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleItemSelect = (itemName) => {
    setActiveItem(itemName);
  };

  const filteredTableData = tableData.filter((data) =>
    data.businessGroupName.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <>
      <div className="home">
        <Nav name={name} pathValue={pathValue} />
        <div className="Wrapper">
          <Flex>
            <Box>
              <Sidebar
                sections={sections}
                activeItem={activeItem}
                onItemSelect={handleItemSelect}
              />
            </Box>
            <Flex direction="column" ml="200" mt="150" p={"20px 25px"} gap={8}>
              <Stack mt={"-60px"} direction={"row"} spacing={6} align={'center'}>
                <CreateBusinessGroup
                  currentUserEmail={currentUser.userEmail}
                  currentUserName={currentUser.userName}
                  currentOrganization={currentUser.organization}
                  currentOrgId={currentUser.orgId}
                  filteredTableData={filteredTableData}
                  isOpen={isModalOpen} onClose={closeModal} onOpen={openModal}
                />
                <Text fontSize={14} color={"#747474"} fontWeight={500}>
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
                <InputGroup maxW={"fit-content"}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiSearch />}
                    color="gray.500"
                  />
                  <Input placeholder="Filter business group" fontSize={14} fontWeight={500}
                    onChange={(e) => { setFilterValue(e.target.value) }}
                  />
                </InputGroup>
              </Stack>
              {filteredTableData.length === 0 ? (
                <EmptyRows message={'No data to show'} />
              ) : (
                <BusinessGroupTable tableData={filteredTableData} onOpenCreateChildGroup={openModal} userData={userData} />
              )}
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
}
