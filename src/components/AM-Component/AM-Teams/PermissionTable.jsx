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
  useToast,
  Box,
} from "@chakra-ui/react";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";
// import supabase from "../../../Utils/supabase";
// import deleteBusinessGroup from "../../Utils/BusinessGroupDelete";
// import fetchPermissionsTableRows from "../../../Utils/PermissionsData";

const PermissionsTable = ({ tableData, permissionData, bgNames, userData, teamId }) => {
  // const [ownerData, setOwnerData] = useState([]);
  // const toast = useToast();

  // const [isDeleteOpen, setDeleteOpen] = useState(false);
  // const [deleteInputValue, setDeleteInputValue] = useState("");
  // const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

  const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);
  const [targetGroupName, setTargetGroupName] = useState("");
  const [openRow, setOpenRow] = useState(null); // State to track the open row
  const [applyCondition, setApplyCondition] = useState(false); // State to apply condition
  const [clickedRowId, setClickedRowId] = useState(null); // State to store clicked row ID

  console.log("permissionData for table:",permissionData);

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
    // console.log('filtered teams rows:',filteredData);
  }, [tableData, applyCondition, clickedRowId]);

    if (!tableData || tableData.length === 0) return null;
  
    const groupedPermissions = tableData.reduce((acc, permission) => {
      const { groupname, rolename } = permission;
      if (!acc[groupname]) {
        acc[groupname] = [];
      }
      acc[groupname].push(rolename);
      return acc;
    }, {});

  // const [hoveredRows, setHoveredRows] = useState([]);

  // const handleRowHover = (index) => {
  //   setHoveredRows((prevHoveredRows) => {
  //     const newHoveredRows = [...prevHoveredRows];
  //     newHoveredRows[index] = true;
  //     return newHoveredRows;
  //   });
  // };

  // const handleRowNotHover = (index) => {
  //   setHoveredRows((prevHoveredRows) => {
  //     const newHoveredRows = [...prevHoveredRows];
  //     newHoveredRows[index] = false;
  //     return newHoveredRows;
  //   });
  // };

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
            <>
              <Tr
                key={index}
                fontWeight={500}
                // onMouseOver={() => handleRowHover(index)}
                // onMouseLeave={() => handleRowNotHover(index)}
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
                      display={(dataValue.ancestor_group_ids === '' || dataValue.childTeams === true) ? "inline-flex" : "none"}
                    />

                    <Link 
                    href={`/accounts/teams/${dataValue.teamid}`}
                      _hover={{ textDecoration: "underline" }}
                      // color={hoveredRows[index] ? "#0176d3" : "#444444"}
                    >
                      {dataValue.childTeams === false ? (
                        <Box paddingLeft={55}>
                          {dataValue.groupname}
                        </Box>
                      ) : (
                        dataValue.groupname
                      )}

                    </Link>
                  </Box>
                </Td>
                <Td style={rowValueStyle}>
                    {dataValue.rolename}
                </Td>
                <Td style={rowValueStyle}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      // icon={<HiEllipsisHorizontal />}
                      variant="outline"
                      h={"28px"} color="gray.500"
                      border={"1px solid #5c5c5c"}
                      onClick={() => handleMenuOpen(dataValue)}
                      fontSize={14}
                    >Edit</MenuButton>
                  </Menu>
                </Td>
              </Tr>
            </>
           ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PermissionsTable;
