
import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../Utils/AuthProvider";
import supabase from "../../Utils/supabase";

const BusinessGroupTable = () => {
    const { session } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (session) {
            fetchUserData();
            console.log("useEffect triggered");
        }
    }, [session]);

    const fetchUserData = async () => {
        try {
            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("users")
                .select("full_name, display_name, company")
                .eq("id", session.user.id)
                .single();

            if (error) {
                throw error;
            }
            setUserData(data);
            console.log("User data: ", userData);
        } catch (error) {
            console.error("Error fetching user data:", error.message);
        }
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

    const groupDetails = [
        { name: "MC", environments: 2, totalvCores: 2 },
        { name: "MC", environments: 2, totalvCores: 2 },
    ];

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
                    {groupDetails.map((conversion, index) => (
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
                                    {conversion.name}
                                </Link>
                            </Td>
                            <Td style={rowValueStyle}>{conversion.environments}</Td>
                            <Td style={rowValueStyle}>{conversion.totalvCores}</Td>
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
