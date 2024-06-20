import { useContext, useEffect, useState } from "react";
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
  useToast,
  Text,
} from "@chakra-ui/react";
import {
  HiEllipsisHorizontal,
  HiChevronRight,
  HiChevronDown,
} from "react-icons/hi2";
import supabase from "../../../Utils/supabase";
import { AuthContext } from "../../../Utils/AuthProvider";

const TeamTable = ({
  tableData = [],
  onOpenCreateChildteam,
  refetchTableData,
}) => {
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteInputValue, setDeleteInputValue] = useState("");
  const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
  const [filteredRows, setFilteredRows] = useState([]);
  const [hoveredRows, setHoveredRows] = useState([]);
  const toast = useToast();
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (selectedTeamId) {
      setTargetGroupName(selectedTeamId.teamname);
    }
  }, [selectedTeamId]);

  useEffect(() => {
    const filteredData = tableData.filter((dataValue) => {
      return (
        dataValue.parentteamId === null ||
        expandedRows.includes(dataValue.teamId) ||
        expandedRows.includes(dataValue.parentteamId)
      );
    });

    filteredData.sort((a, b) => {
      const idA = a.id === "" ? -1 : parseInt(a.id, 10);
      const idB = b.id === "" ? -1 : parseInt(b.id, 10);
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
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
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
    setDeleteButtonDisabled(
      value.toLowerCase() !== targetGroupName.toLowerCase()
    );
  };

  const handleDeleteTeam = async () => {
    try {
      const teamId = selectedTeamId.teamid;
      const { data: teamData, error: fetchError } = await supabase
        .schema("mc_cap_develop")
        .from("teams")
        .select("*")
        .eq("teamid", teamId)
        .single();

      if (fetchError) {
        console.error("Error fetching team data:", fetchError.message);
        toast({
          title: "Error",
          description: "An error occurred while fetching the team data.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      if (teamData.organizationId !== userData.organizationId) {
        toast({
          title: "Error",
          description: "You do not have permission to delete this team.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      const { data: childTeams, error: childTeamsError } = await supabase
        .schema("mc_cap_develop")
        .from("teams")
        .select("*")
        .eq("parentteamId", teamId);

      if (childTeamsError) {
        console.error("Error fetching child teams:", childTeamsError.message);
        toast({
          title: "Error",
          description: "An error occurred while fetching the child teams.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      const deletePromises = childTeams.map(async (childTeam) => {
        const { error } = await supabase
          .schema("mc_cap_develop")
          .from("teams")
          .delete()
          .eq("teamid", childTeam.teamid);

        if (error) {
          console.error(
            `Error deleting child team ${childTeam.teamid}:`,
            error.message
          );
          throw new Error(`Error deleting child team ${childTeam.teamid}`);
        }
      });

      await Promise.all(deletePromises);

      const { error: deleteError } = await supabase
        .schema("mc_cap_develop")
        .from("teams")
        .delete()
        .eq("teamid", teamId);

      if (deleteError) {
        console.error("Error deleting team:", deleteError.message);
        toast({
          title: "Error Deleting Team",
          description: deleteError.message,
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Team Deleted",
          description: "",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
        handleDeleteClose();
        refetchTableData(); // Call the refetch function after successful deletion
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the team.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
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
                <Box
                  paddingLeft={
                    dataValue.ancestors.length === 0 ? 0 : `${index * 55}px`
                  }
                  display="flex"
                >
                  <IconButton
                    aria-label="Toggle Details"
                    icon={
                      expandedRows.includes(dataValue.teamid) ? (
                        <HiChevronDown />
                      ) : (
                        <HiChevronRight />
                      )
                    }
                    size=""
                    variant="ghost"
                    onClick={() => handleRowClick(index, dataValue.teamid)}
                    mr={2}
                    display={
                      dataValue.ancestors.length === 0 ||
                      dataValue.childTeams === true
                        ? "inline-flex"
                        : "none"
                    }
                  />
                  <Link
                    href={`/accounts/teams/${dataValue.teamid}`}
                    _hover={{ textDecoration: "underline" }}
                    color={hoveredRows[index] ? "#0176d3" : "#444444"}
                  >
                    {dataValue.childGroups === false ? (
                      <Box paddingLeft={25}>{dataValue.teamname}</Box>
                    ) : (
                      <Box display="flex" gap={4}>
                        {dataValue.teamname}
                        {dataValue.members?.[index]?.membership_type && (
                          <Text key={index} fontSize="base" color="gray">
                            You’re a {dataValue.members[index].membership_type}
                          </Text>
                        )}
                      </Box>
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
                      fontWeight={500}
                      onClick={() =>
                        onOpenCreateChildteam(
                          dataValue.teamid,
                          dataValue.teamname
                        )
                      }
                    >
                      Create child team
                    </MenuItem>
                    {dataValue.ancestors.length === 0 ? (
                      ""
                    ) : (
                      <MenuItem
                        fontSize={14}
                        fontWeight={500}
                        onClick={() => setDeleteOpen(true)}
                        color={"red.600"}
                        _hover={{
                          color: "white",
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
                  <b>This action cannot be undone.</b> This will delete the{" "}
                  <b>{targetGroupName}</b> team and all of its associated
                  information. Please type the name of the team to confirm.
                </FormLabel>
                <Input
                  placeholder="team name"
                  mt={1}
                  fontSize={14}
                  fontWeight={500}
                  value={deleteInputValue}
                  onChange={handleDeleteInputChange}
                />
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter
            borderBottomRadius={15}
            justifyContent={"space-between"}
            borderTop={"1px solid #e5e5e5"}
          >
            <Button
              onClick={handleDeleteClose}
              variant={"outline"}
              fontSize={14}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTeam}
              variant={"DeleteButtonFilled"}
              isDisabled={isDeleteButtonDisabled}
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
