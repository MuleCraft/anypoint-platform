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
import fetchUserSessionData from "../../Utils/SessionUserData";

const BusinessGroupTable = () => {

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

  const columnTitleStyle = {
    fontSize: 14,
    color: "#444444",
    fontWeight: 800,
    textTransform: "capitalize",
    padding: "10px",
  };
  const rowValueStyle = { fontSize: 14, padding: "10px" };

    const userTableData = fetchUserSessionData();
    let userMailAddress;
    // console.log('table data',userTableData);
    userTableData.then((response) => {
      // console.log(response.company);
      userMailAddress = response.email;
      console.log('user email: ',userMailAddress);
    })
    .catch((error) => {
        console.log(error.message);
    });

    const groupDetails = [
      { name: "MC", environments: 2, totalvCores: 2 },
      // tableDetails.map((data,index)=>(
      //   { groupName: "MC", environments: 2, totalvCores: 2 }
      // ))
    ];

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
          {groupDetails.map((dataValue, index) => (
            <Tr
              key={index}
              fontWeight={500}
              onMouseOver={() => handleRowHover(index)}
              onMouseLeave={() => handleRowNotHover(index)}
              _hover={{ bgColor: "#ececec" }}
            >
              <Td style={rowValueStyle}>
                <Link
                  _hover={{ textDecoration: "underline" }}
                  color={hoveredRows[index] ? "#0176d3" : "#444444"}
                >
                  {dataValue.name}
                </Link>
              </Td>
              <Td style={rowValueStyle}>2</Td>
              <Td style={rowValueStyle}>2</Td>
              <Td style={rowValueStyle}>
                <BusinessGroupMenu />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BusinessGroupTable;
