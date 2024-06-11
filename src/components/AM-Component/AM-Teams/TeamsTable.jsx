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
  Box,
} from "@chakra-ui/react";
import { HiEllipsisHorizontal, HiChevronRight, HiChevronDown } from "react-icons/hi2";

const TeamTable = ({ tableData = [], onOpenCreateChildteam }) => {
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [filteredRows, setFilteredRows] = useState([]);
  const [hoveredRows, setHoveredRows] = useState([]);

  useEffect(() => {
    if (selectedTeamId) {
      setTargetGroupName(selectedTeamId.teamname);
    }
  }, [selectedTeamId]);

  useEffect(() => {
    const filteredData = tableData.filter(dataValue => {
      return dataValue.parentteamId === null ||
        expandedRows.includes(dataValue.teamId) ||
        expandedRows.includes(dataValue.parentteamId);
    });


    filteredData.sort((a, b) => {
      const idA = a.teamid === "" ? -1 : parseInt(a.teamid, 10);
      const idB = b.teamid === "" ? -1 : parseInt(b.teamid, 10);
      return idA - idB;
    });

    setFilteredRows(filteredData);
  }, [tableData, expandedRows]);

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
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleMenuOpen = (teamId) => {
    setSelectedTeamId(teamId);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
    setDeleteInputValue("");
    setDeleteButtonDisabled(true);
    setTargetGroupName(selectedTeamId.teamname);
  };

  const handleDeleteInputChange = (e) => {
    const value = e.target.value;
    setDeleteInputValue(value);
    setDeleteButtonDisabled(value.toLowerCase() !== targetGroupName.toLowerCase());
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
            <Th style={columnTitleStyle}>Name</Th>
            <Th style={columnTitleStyle} w={"80px"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRows.map((dataValue, index) => (
            <Tr
              key={index}
              fontWeight={500}
              onMouseOver={() => handleRowHover(index)}
              onMouseLeave={() => handleRowNotHover(index)}
              _hover={{ bgColor: "#ececec" }}
            >
              <Td style={rowValueStyle}>
                <Box paddingLeft={dataValue.ancestors.length === 0 ? 0 : `${index * 55}px`}>
                  <IconButton
                    aria-label="Toggle Details"
                    icon={expandedRows.includes(dataValue.teamid) ? <HiChevronDown /> : <HiChevronRight />}
                    size=""
                    variant="ghost"
                    onClick={() => handleRowClick(index, dataValue.teamid)}
                    mr={2}
                    display={(dataValue.ancestors.length === 0 || dataValue.childTeams === true) ? "inline-flex" : "none"}
                  />
                  <Link
                    href={`/accounts/teams/${dataValue.teamid}`}
                    _hover={{ textDecoration: "underline" }}
                    color={hoveredRows[index] ? "#0176d3" : "#444444"}
                  >
                    {dataValue.childGroups === false ? (
                      <Box paddingLeft={25}>
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
                    h={"28px"}
                    color="gray.500"
                    border={"1px solid #5c5c5c"}
                    onClick={() => handleMenuOpen(dataValue)}
                  />
                  <MenuList p={"5px 0"} minW={"150px"} maxW={"240px"}>
                    <MenuItem
                      fontSize={14}
                      onClick={() => onOpenCreateChildteam(dataValue.teamid, dataValue.teamname)}
                    >
                      Create child team
                    </MenuItem>
                    {(dataValue.ancestors.length === 0) ? (
                      ""
                    ) : (
                      <MenuItem
                        fontSize={14}
                        onClick={() => setDeleteOpen(true)}
                        color={"red.600"}
                        _hover={{
                          color: "#000",
                          bgColor: "red.600",
                        }}
                      >
                        Delete team...
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
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
                  <b>This action cannot be undone.</b> This will delete the <b>{targetGroupName}</b> team and all of its associated information.
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
              // onClick={() => invokeGroupDeleteFunction(selectedTeamId)}
              variant={"formButtons"}
              isDisabled={isDeleteButtonDisabled}
              _hover={{ bgColor: "navy" }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </TableContainer>
  );
};

export default TeamTable;
