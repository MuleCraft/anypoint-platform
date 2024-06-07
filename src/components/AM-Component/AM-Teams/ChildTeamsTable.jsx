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
} from "@chakra-ui/react";
import { HiEllipsisHorizontal, HiChevronRight, HiChevronDown } from "react-icons/hi2";

const ChildTeamsTable = ({ tableData, onOpenCreateChildGroup, id }) => {

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

            return dataValue.parentteamId === id || expandedRows.includes(dataValue.parentteamId);
        });

        filteredData.sort((a, b) => {
            // Convert empty strings to -1 for sorting
            const idA = a.id === "" ? -1 : parseInt(a.id, 10);
            const idB = b.id === "" ? -1 : parseInt(b.id, 10);
            return idA - idB || a.id - b.id;
        });

        setFilteredRows(filteredData);
    }, [tableData, expandedRows]);


    console.log("filteredRows", filteredRows);

    console.log(expandedRows);


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

        </TableContainer>
    );
};

export default ChildTeamsTable;
