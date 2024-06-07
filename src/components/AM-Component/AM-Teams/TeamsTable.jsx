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
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  VStack,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  ModalContent,
  useToast,
  Tooltip,
  Box,
} from "@chakra-ui/react";
import { HiEllipsisHorizontal, HiChevronRight, HiChevronDown } from "react-icons/hi2";
import supabase from "../../../Utils/supabase";
// import deleteBusinessGroup from "../../Utils/BusinessGroupDelete";

const TeamsTable = ({ tableData, onOpenCreateChildGroup, userData }) => {
  const [ownerData, setOwnerData] = useState([]);
  const toast = useToast();

//   console.log('passed teams data:',tableData);

//   useEffect(() => {
//     const fetchBusinessGroups = async () => {
//       const { data, error } = await supabase
//         .schema("mc_cap_develop")
//         .from("businessgroup")
//         .select("*")
//         .eq("businessGroupName", userData.company);

//       if (error) {
//         console.error("Error fetching business groups:", error);
//       } else {
//         setOwnerData(data[0]);
//       }
//     };

//     if (userData) {
//       fetchBusinessGroups();
//     }
//   }, [userData.company]);

  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

  const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [openRow, setOpenRow] = useState(null); // State to track the open row
  const [applyCondition, setApplyCondition] = useState(false); // State to apply condition
  const [clickedRowId, setClickedRowId] = useState(null); // State to store clicked row ID

  useEffect(() => {
    if (selectedBusinessGroupId) {
      setTargetGroupName(selectedBusinessGroupId.businessGroupName);
    }
  }, [selectedBusinessGroupId]);

  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const filteredData = tableData.filter(dataValue => {
      if (applyCondition) {
        return dataValue.ancestor_group_ids === clickedRowId || dataValue.ancestor_group_ids === null;
      } else {
        return dataValue.ancestor_group_ids === null;
      }
    });
    setFilteredRows(filteredData);
    console.log('filtered teams rows:',filteredData);
  }, [tableData, applyCondition, clickedRowId]);

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
    setTargetGroupName(selectedBusinessGroupId.businessGroupName);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteInputValue("");
    setDeleteButtonDisabled(true);
    setTargetGroupName(selectedBusinessGroupId.businessGroupName);
  };

  const handleDeleteInputChange = (e) => {
    const value = e.target.value;
    setDeleteInputValue(value);
    const matchingGroup = tableData.find(
      (group) =>
        group.businessGroupName.toLowerCase() === value.toLowerCase() &&
        group.organizationName.toLowerCase() === ownerData.organizationName.toLowerCase()
    );
    setDeleteButtonDisabled(!matchingGroup);
  };

  const [hoveredRows, setHoveredRows] = useState([]);

  const handleRowHover = (index) => {
    setHoveredRows((prevHoveredRows) => {
      const newHoveredRows = [...prevHoveredRows];
      newHoveredRows[index] = true;
      return newHoveredRows;
    });
  };

  const handleRowNotHover = (index) => {
    setHoveredRows((prevHoveredRows) => {
      const newHoveredRows = [...prevHoveredRows];
      newHoveredRows[index] = false;
      return newHoveredRows;
    });
  };

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

  const handleMenuOpen = (businessGroupId) => {
    setSelectedBusinessGroupId(businessGroupId);
  };

  async function invokeGroupDeleteFunction(selectedBusinessGroupId) {
    try {
    //   const response = await deleteBusinessGroup(selectedBusinessGroupId);
      handleDeleteClose();

      if (response === "Error occurred!") {
        toast({
          title: "Error",
          description: "Error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          description: "Business group successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  return (
    <TableContainer>
      <Table variant="simple" size="md">
        <Thead borderBottomWidth="3px">
          <Tr>
            <Th style={columnTitleStyle}>Name</Th>
            <Th style={columnTitleStyle} w={"80px"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((dataValue, index) => (
            <>
              <Tr
                key={index}
                fontWeight={500}
                onMouseOver={() => handleRowHover(index)}
                onMouseLeave={() => handleRowNotHover(index)}
                _hover={{ bgColor: "#ececec" }}
              >
                <Td style={rowValueStyle}>
                  <Box paddingLeft={dataValue.ancestor_group_ids === null ? 0 : 35}>

                    <IconButton
                      aria-label="Toggle Details"
                      icon={openRow === index ? <HiChevronDown /> : <HiChevronRight />}
                      size=""
                      variant="ghost"
                      onClick={() => handleRowClick(index, dataValue.teamid)} // Pass the ID here
                      mr={2}
                      display={(dataValue.ancestor_group_ids === '' || dataValue.childTeams === true) ? "inline-flex" : "none"}
                    />

                    <Link href={`/accounts/teams/${dataValue.teamid}`}
                      _hover={{ textDecoration: "underline" }}
                      color={hoveredRows[index] ? "#0176d3" : "#444444"}
                    >
                      {dataValue.childTeams === false ? (
                        <Box paddingLeft={55}>
                          {dataValue.teamname}
                        </Box>
                      ) : (
                        dataValue.teamname
                      )}

                    </Link>
                  </Box>
                </Td>
                <Td style={rowValueStyle}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<HiEllipsisHorizontal />}
                      variant="outline"
                      h={"28px"} color="gray.500"
                      border={"1px solid #5c5c5c"}
                      onClick={() => handleMenuOpen(dataValue)}
                    />
                    <MenuList p={"5px 0"} minW={"150px"} maxW={"240px"}>
                      <Tooltip label="This business group is not entitled to create child groups" placement="auto" fontSize="4xl" isDisabled={selectedBusinessGroupId?.canCreateChildGroup !== false}>
                        <MenuItem fontSize={14} onClick={() => onOpenCreateChildGroup(dataValue.businessGroupId,dataValue.businessGroupName)} isDisabled={selectedBusinessGroupId?.canCreateChildGroup === false}>
                          Create child group
                        </MenuItem>
                      </Tooltip>
                      {ownerData.id !== selectedBusinessGroupId?.id &&
                        <Tooltip label="Cannot delete a Business Group with children" placement="auto" fontSize="4xl" isDisabled={selectedBusinessGroupId?.childGroups === false}>
                          <MenuItem fontSize={14} onClick={handleDeleteOpen} color={"red.600"} isDisabled={selectedBusinessGroupId?.childGroups !== false}
                            _hover={{ color: selectedBusinessGroupId?.childGroups !== false ? '#000' : "white", bgColor: selectedBusinessGroupId?.childGroups !== false ? '' : 'red.600' }}>
                            Delete business group...
                          </MenuItem>
                        </Tooltip>
                      }
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>

            </>
          ))}
        </Tbody>
      </Table>
      <Modal onClose={handleDeleteClose} isOpen={isDeleteOpen} isCentered>
        <ModalOverlay />
        <ModalContent minW={"600px"} >
          <ModalHeader bg={"#f3f3f3"} fontSize={20} fontWeight={800} color={"#444444"}
            borderTopRadius={15} borderBottom={"1px solid #e5e5e5"}>
            Are you sure?
          </ModalHeader>
          <ModalBody p={"32px 32px"}>
            <VStack spacing={4}>
              <VStack spacing={0} fontSize={14} align={"flex-start"}>
                <FormLabel color={"#747474"} fontWeight={500} fontSize={14}>
                  <b>This action cannot be undone.</b> This will delete the <b>{targetGroupName}</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                <Input placeholder="Business Group name" mt={1} fontSize={14} fontWeight={500}
                  value={deleteInputValue}
                  onChange={handleDeleteInputChange}
                />
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderBottomRadius={15} justifyContent={"space-between"} borderTop={"1px solid #e5e5e5"}>
            <Button onClick={handleDeleteClose} variant={"outline"} fontSize={14}>Cancel</Button>
            <Button onClick={() => invokeGroupDeleteFunction(selectedBusinessGroupId)}
              variant={"formButtons"}
              isDisabled={isDeleteButtonDisabled} _hover={{ bgColor: 'navy' }}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  )
}

export default TeamsTable;