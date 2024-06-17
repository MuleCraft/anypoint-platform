import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
  Menu,
  MenuButton,
  IconButton,
  Box,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalBody,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Accordion,
  ModalFooter,
  Stack,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";
import supabase from "../../../Utils/supabase";
import { FiSearch } from "react-icons/fi";
import CustomAccordionItem from "../../Accordion";
import CustomSwitch from "../../Switch";

const PermissionsTable = ({ tableData, permissionData, id, fetchRows }) => {
  const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [openRow, setOpenRow] = useState(null);
  const [applyCondition, setApplyCondition] = useState(false);
  const [clickedRowId, setClickedRowId] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [teamPermissions, setTeamPermissions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterValue, setFilterValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [GroupData, setGroupData] = useState();
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    fetchPermissionsData();
  }, []);

  const fetchPermissionsData = async () => {
    try {
      const { data: permissionsData, error: permissionsError } = await supabase
        .schema("mc_cap_develop")
        .from("permissions")
        .select("*");

      if (permissionsError) {
        console.error("Error fetching permissions:", permissionsError.message);
        return;
      }

      setPermissions(permissionsData);

      const { data: teamData, error: teamError } = await supabase
        .schema("mc_cap_develop")
        .from("teams")
        .select("permissions")
        .eq("teamid", id)
        .single();

      if (teamError) {
        console.error("Error fetching team data:", teamError.message);
        return;
      }

      if (teamData && teamData.permissions) {
        setTeamPermissions(teamData.permissions);
        setGroupData(teamData.permissions[0]);
        const initialSelectedIds = teamData.permissions.map((permission) => permission.roleid);
        setSelectedIds(initialSelectedIds);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (id, isChecked) => {
    setSelectedIds((prevIds) => {
      if (isChecked) {
        return [...prevIds, id];
      } else {
        return prevIds.filter((selectedId) => selectedId !== id);
      }
    });
  };

  const filteredPermissions = permissions.filter((item) => {
    if (item.targetmodule !== "Access Management") return false;
    if (showSelectedOnly && !selectedIds.includes(item.roleid)) return false;
    if (filterValue && !item.rolename.toLowerCase().includes(filterValue.toLowerCase())) return false;
    return true;
  });


  const subtitles = filteredPermissions.map((perm) => ({
    title: perm.rolename,
    tooltip: perm.roledetail,
    id: perm.id,
    roleid: perm.roleid,
    isChecked: selectedIds.includes(perm.roleid),
  }));

  const handleUpdatePermissions = async () => {
    try {
      const selectedPermissions = permissions.filter((permission) => selectedIds.includes(permission.roleid));
      const updatedPermissions = selectedPermissions.map((permission) => {
        const teamPermission = teamPermissions.find((tp) => tp.roleid === permission.roleid);
        return {
          groupid: teamPermission ? teamPermission.groupid : GroupData.groupid,
          groupname: teamPermission ? teamPermission.groupname : GroupData.groupname,
          roleid: permission.roleid,
          rolename: permission.rolename,
          roledetail: permission.roledetail,
          targetmodule: permission.targetmodule,
        };
      });

      const { data, error } = await supabase
        .schema("mc_cap_develop")
        .from("teams")
        .update({ permissions: updatedPermissions })
        .eq("teamid", id);

      if (error) {
        console.error("Error updating permissions:", error.message);
      } else {
        console.log("Permissions updated:", data);
        fetchPermissionsData();
        await fetchRows()
        onClose();
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  useEffect(() => {
    if (selectedBusinessGroupId) {
      setTargetGroupName(selectedBusinessGroupId.businessGroupName);
    }
  }, [selectedBusinessGroupId]);

  useEffect(() => {
    const filteredData = tableData.filter((dataValue) => {
      if (applyCondition) {
        return dataValue.ancestor_group_ids === clickedRowId || dataValue.ancestor_group_ids === null;
      } else {
        return dataValue.ancestor_group_ids === null;
      }
    });
    setFilteredRows(filteredData);
  }, [tableData, applyCondition, clickedRowId]);

  if (!tableData || tableData.length === 0) return null;

  const handleRowClick = (index, id) => {
    if (openRow === index) {
      // If the clicked row is already open, close it
      setOpenRow(null);
      setApplyCondition(false);
      setClickedRowId(null);
    } else {
      // If the clicked row is not open, open it
      setOpenRow(index);
      setApplyCondition(true);
      setClickedRowId(id);
    }
  };

  const columnTitleStyle = {
    fontSize: 14,
    color: "#444444",
    fontWeight: 800,
    textTransform: "capitalize",
    padding: "10px",
  };
  const rowValueStyle = { fontSize: 14, padding: "10px" };

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead borderBottomWidth="3px">
          <Tr>
            <Th style={columnTitleStyle}>Business Groups</Th>
            <Th style={columnTitleStyle}>Permissions</Th>
            <Th style={columnTitleStyle} w={"80px"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {permissionData.map((dataValue, index) => (
            <Tr
              key={index}
              fontWeight={500}
              _hover={{ bgColor: "#ececec" }}
            >
              <Td style={rowValueStyle}>
                <Box paddingLeft={dataValue.ancestor_group_ids === null ? 0 : 35}>
                  <IconButton
                    aria-label="Toggle Details"
                    icon={openRow === index ? <HiChevronDown /> : <HiChevronRight />}
                    size=""
                    variant="ghost"
                    onClick={() => handleRowClick(index, dataValue.teamid)}
                    mr={2}
                    display={(dataValue.ancestor_group_ids === "" || dataValue.childTeams === true) ? "inline-flex" : "none"}
                  />
                  <Link
                    href={`/accounts/teams/${dataValue.teamid}`}
                    _hover={{ textDecoration: "underline" }}
                  >
                    {dataValue.childTeams === false ? (
                      <Box paddingLeft={55}>{dataValue.groupname}</Box>
                    ) : (
                      dataValue.groupname
                    )}
                  </Link>
                </Box>
              </Td>
              <Td style={rowValueStyle}>{dataValue.rolename}</Td>
              <Td style={rowValueStyle}>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    variant="outline"
                    h={"28px"}
                    color="gray.500"
                    border={"1px solid #5c5c5c"}
                    onClick={onOpen}
                    fontSize={14}
                  >
                    Edit
                  </MenuButton>
                </Menu>
                <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                  <ModalOverlay />
                  <ModalContent>
                    <Box bg="modelColor" borderRadius="4px" p={3}>
                      <ModalHeader fontSize="lg" fontWeight="800">
                        Edit Permissions
                      </ModalHeader>
                    </Box>
                    <Divider />
                    <ModalBody pb={7} minH={500}>
                      <Flex justify="space-between" align="center" mt={6}>
                        <Text fontSize="base" color={"#747474"} fontWeight={500}>
                          Select permissions this team should have for {GroupData.groupname}.
                        </Text>
                        <InputGroup maxW={"fit-content"} ml={0}>
                          <InputLeftElement pointerEvents="none" children={<FiSearch />} color="gray.500" />
                          <Input placeholder="Filter" fontSize={14} fontWeight={500} onChange={(e) => setFilterValue(e.target.value)} />
                        </InputGroup>
                      </Flex>
                      <Stack mt={"18px"} direction={"row"} spacing={6} align={"center"} justify={"space-between"}>
                        <HStack spacing={6}>
                          <FormLabel fontWeight={600} fontSize="base">
                            Permissions
                          </FormLabel>
                        </HStack>
                        <Flex alignItems="center" gap={3} justifyContent="center">
                          <Text fontSize="xs">Show Selected Only</Text>
                          <CustomSwitch isChecked={showSelectedOnly} onToggle={setShowSelectedOnly} />
                        </Flex>
                      </Stack>
                      <Accordion allowToggle mt={6}>
                        <CustomAccordionItem sectionTitle="Access Management" subtitles={subtitles} onCheckboxChange={handleCheckboxChange} />
                      </Accordion>
                    </ModalBody>
                    <Divider />
                    <ModalFooter justifyContent="space-between">
                      <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                        Cancel
                      </Button>
                      <Button variant="homePageButtons" fontSize="base" onClick={handleUpdatePermissions}>
                        Done
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PermissionsTable;
