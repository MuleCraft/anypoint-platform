import { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Link,
} from "@chakra-ui/react";
import BusinessGroupMenu from "./BusinessGroupMenu";

export default function ({ tableData, onOpenCreateChildGroup }) {

  const [hoveredRows, setHoveredRows] = useState([]);
  const rows = tableData || [];

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
            <Th style={columnTitleStyle} w={"150px"}>
              Environments
            </Th>
            <Th style={columnTitleStyle} w={"120px"}>
              Total vCores
            </Th>
            <Th style={columnTitleStyle} w={"80px"}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((dataValue, index) => (
            <Tr
              key={index}
              fontWeight={500}
              onMouseOver={() => handleRowHover(index)}
              onMouseLeave={() => handleRowNotHover(index)}
              _hover={{ bgColor: "#ececec" }}
            >
              <Td style={rowValueStyle}>
                <Link href={`/accounts/businessGroups/${dataValue.businessGroupId}`}
                  _hover={{ textDecoration: "underline" }}
                  color={hoveredRows[index] ? "#0176d3" : "#444444"}
                >
                  {dataValue.businessGroupName}
                </Link>
              </Td>
              <Td style={rowValueStyle}>{dataValue.environments.length}</Td>
              <Td style={rowValueStyle}>{dataValue.totalVcores}</Td>
              <Td style={rowValueStyle}>
                <BusinessGroupMenu onOpenCreateChildGroup={onOpenCreateChildGroup}/>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
