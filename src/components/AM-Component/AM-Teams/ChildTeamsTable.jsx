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
    useToast,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    VStack,
    FormLabel
} from "@chakra-ui/react";
import { HiEllipsisHorizontal, HiChevronRight, HiChevronDown } from "react-icons/hi2";
import supabase from "../../../Utils/supabase";

const ChildTeamsTable = ({ tableData, onOpenCreateChildGroup, id, fetchTableData }) => {
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [targetGroupName, setTargetGroupName] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteInputValue, setDeleteInputValue] = useState("");
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
    const [filteredRows, setFilteredRows] = useState([]);
    const [hoveredRows, setHoveredRows] = useState([]);
    const toast = useToast();

    useEffect(() => {
        if (selectedTeamId) {
            setTargetGroupName(selectedTeamId.teamname);
        }
    }, [selectedTeamId]);

    useEffect(() => {
        const filteredData = tableData.filter(dataValue => {
            return dataValue.parentteamId === id || expandedRows.includes(dataValue.parentteamId);
        });

        filteredData.sort((a, b) => {
            const idA = a.id === "" ? -1 : parseInt(a.id, 10);
            const idB = b.id === "" ? -1 : parseInt(b.id, 10);
            return idA - idB || a.id - b.id;
        });

        setFilteredRows(filteredData);
    }, [tableData, expandedRows, id]);

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

    const handleMenuOpen = (team) => {
        setSelectedTeamId(team);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteInputValue("");
        setIsDeleteButtonDisabled(true);
    };

    const handleDeleteInputChange = (e) => {
        const value = e.target.value;
        setDeleteInputValue(value);
        setIsDeleteButtonDisabled(value.toLowerCase() !== selectedTeamId?.teamname?.toLowerCase());
    };

    const handleDeleteTeam = async () => {
        const teamId = selectedTeamId.teamid;
        try {
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
                    position: "top-right"
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
                    console.error(`Error deleting child team ${childTeam.teamid}:`, error.message);
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
                    position: "top-right"
                });
            } else {
                toast({
                    title: "Team Deleted",
                    description: "The team and its child teams have been deleted successfully.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                handleDeleteClose();
                fetchTableData(); // Refetch the table data
            }
        } catch (error) {
            console.error("Error deleting team:", error);
            toast({
                title: "Error",
                description: "An error occurred while deleting the team.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top-right"
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
                                    />
                                    <MenuList p={"5px 0"} minW={"150px"} maxW={"240px"}>
                                        <MenuItem
                                            fontSize={14}
                                            onClick={() => onOpenCreateChildGroup(dataValue.teamid, dataValue.teamname)}
                                        >
                                            Create child team
                                        </MenuItem>
                                        {(dataValue.ancestors.length === 0) ? (
                                            ""
                                        ) : (
                                            <MenuItem
                                                fontSize={14}
                                                onClick={() => handleMenuOpen(dataValue)}
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
                                    <b>This action cannot be undone.</b> This will delete the <b>{selectedTeamId?.teamname}</b> team and all of its associated information.
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
                            onClick={handleDeleteTeam}
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

export default ChildTeamsTable;
