import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  VStack,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import UserData from "../data/UserData.json";
import "../App.css";

export default function UsersSection() {
  const tabSelectedStyle = {
    borderBottom: "4px solid #0077d4",
    fontWeight: 700,
    color: "#0077d4",
  };
  const checkboxTextStyle = { fontSize: "14px", fontWeight: 500 };
  const supabase = createClient(
    "https://lbtsbocemahbdavnlodi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM",
    { db: { schema: "mc_dev" } }
  );
  const columnDetails = UserData;
  const [userData, setUserData] = useState([]);

  async function fetchUserData() {
    const { data: capUsers, error } = await supabase
      .from("capUsers")
      .select("*");

    if (error) {
      setUserData([]);
      console.log("Error fetching user data!", error);
    } else {
      setUserData(capUsers);
      console.log(userData);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Tabs>
      <TabList>
        <Tab fontSize="14px" fontWeight={500} _selected={tabSelectedStyle}>
          Users
        </Tab>
        <Tab fontSize="14px" fontWeight={500} _selected={tabSelectedStyle}>
          Pending invitations
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <HStack
            display={"flex"}
            justifyContent={"space-between"}
            mb={"30px"}
            mt={"10px"}
          >
            <Button
              bgColor={"#0077d4"}
              color={"white"}
              fontSize={"14px"}
              p={"0px 15px"}
              w={"109px"}
              minH={"40px"}
              _hover={{ bgColor: "#0a5dac" }}
            >
              Invite Users
            </Button>
            <HStack>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="grey" />
                </InputLeftElement>
                <Input
                  variant="text"
                  placeholder="Filter users"
                  w={"200px"}
                  fontSize={"14px"}
                  fontWeight={500}
                ></Input>
              </InputGroup>
              <InputGroup>
                <Input
                  variant="text"
                  placeholder="Columns (5/10)"
                  fontSize={"14px"}
                  fontWeight={500}
                  w={"200px"}
                  p={"0px 15px"}
                ></Input>
                <InputRightElement>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                      _hover={{ bg: "#e5e5e5" }}
                      borderRadius="40px"
                      px="10px"
                      py="10px"
                      fontSize="base"
                      color="navText"
                    >
                      <SlArrowDown size="15px" />
                    </MenuButton>
                    <MenuList alignItems={"center"} p={"15px"} mt="1">
                      <HStack spacing={2} mb={"10px"}>
                        <Button
                          variant={"outline"}
                          fontSize={"14px"}
                          color={"grey"}
                          _hover={{ bgColor: "#444", color: "white" }}
                        >
                          Select All
                        </Button>
                        <Button
                          variant={"outline"}
                          fontSize={"14px"}
                          color={"grey"}
                          _hover={{ bgColor: "#444", color: "white" }}
                        >
                          Clear Selection
                        </Button>
                      </HStack>
                      <VStack fontSize="xs" maxW="250px">
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox
                            defaultChecked
                            size={"lg"}
                            mr={"10px"}
                          ></Checkbox>
                          <Text sx={checkboxTextStyle}>Name</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox
                            defaultChecked
                            size={"lg"}
                            mr={"10px"}
                          ></Checkbox>
                          <Text sx={checkboxTextStyle}>Username</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox
                            defaultChecked
                            size={"lg"}
                            mr={"10px"}
                          ></Checkbox>
                          <Text sx={checkboxTextStyle}>Email</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox size={"lg"} mr={"10px"}></Checkbox>
                          <Text sx={checkboxTextStyle}>
                            Email verified date
                          </Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox
                            defaultChecked
                            size={"lg"}
                            mr={"10px"}
                          ></Checkbox>
                          <Text sx={checkboxTextStyle}>Identity provider</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox
                            defaultChecked
                            size={"lg"}
                            mr={"10px"}
                          ></Checkbox>
                          <Text sx={checkboxTextStyle}>Multi-factor auth</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox size={"lg"} mr={"10px"}></Checkbox>
                          <Text sx={checkboxTextStyle}>Created date</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox size={"lg"} mr={"10px"}></Checkbox>
                          <Text sx={checkboxTextStyle}>Last modified date</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox size={"lg"} mr={"10px"}></Checkbox>
                          <Text sx={checkboxTextStyle}>Last login date</Text>
                        </MenuItem>
                        <MenuItem
                          border="1px soild #fff"
                          padding="2px"
                          borderRadius="4px"
                          _hover={{ bg: "#e5e5e5" }}
                        >
                          <Checkbox size={"lg"} mr={"10px"}></Checkbox>
                          <Text sx={checkboxTextStyle}>Status</Text>
                        </MenuItem>
                      </VStack>
                    </MenuList>
                  </Menu>
                </InputRightElement>
              </InputGroup>
            </HStack>
          </HStack>
          <HStack className="users-table">
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    {columnDetails.map((columns) => (
                      <Th color={"#444444"} minW={"100px"}>
                        {columns.columnName}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                {userData.map((userInfo) => (
                  <Tbody>
                    <Tr>
                      <Td fontSize={"14px"}>{userInfo.userFullname}</Td>
                      <Td fontSize={"14px"}>{userInfo.userName}</Td>
                      <Td fontSize={"14px"}>{userInfo.userEmail}</Td>
                      <Td fontSize={"14px"}>{userInfo.created_at}</Td>
                      <Td fontSize={"14px"}>{userInfo.identityProvider}</Td>
                      <Td fontSize={"14px"}>{userInfo.multiFactorAuth}</Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </TableContainer>
          </HStack>
        </TabPanel>
        <TabPanel>
          <HStack display={"flex"} justifyContent={"space-between"} mb={"15px"}>
            <Button
              bgColor={"#0077d4"}
              color={"white"}
              fontSize={"14px"}
              p={"0px 15px"}
              w={"109px"}
              minH={"40px"}
              _hover={{ bgColor: "#0a5dac" }}
            >
              Invite Users
            </Button>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color="grey" />
              </InputLeftElement>
              <Input
                variant="text"
                placeholder="Filter users"
                w={"200px"}
                fontSize={"14px"}
                fontWeight={500}
              ></Input>
            </InputGroup>
          </HStack>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
