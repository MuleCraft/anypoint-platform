import React, { useState } from "react";
import muleicon from "/Images/mulecommunity.svg";
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Image,
  Text,
  IconButton,
  HStack,
  VStack,
} from "@chakra-ui/react";
import "../assets/Common.css";

import { CiLogout } from "react-icons/ci";
import { CgProfile, CgNotes } from "react-icons/cg";
import { RxLapTimer } from "react-icons/rx";
import { LiaUserGraduateSolid } from "react-icons/lia";
import { FaRegCompass } from "react-icons/fa";
import { PiNotebook, PiChatsFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import "../assets/Common.css";
import { GoQuestion } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import DrawerComponent from "./DrawerComponent";
const Nav = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <Box px={4} borderBottom="1px solid #747474">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Flex align="center" gap="3">
            <IconButton
              bg="none"
              borderRadius="40px"
              icon={<BiMenu size="25px" />}
              _hover={{ bg: "#e5e5e5", borderRadius: "40px" }}
              onClick={handleDrawerOpen}
            />
            <Flex
              align="center"
              gap="2"
              _hover={{ bg: "#e5e5e5" }}
              ml="15px"
              mr="15px"
              border="1px solid white"
              borderRadius="40px"
              p={2}
            >
              <Image src={muleicon} alt="mule icon " className="mule-icon" />
              <Text fontSize="sm" fontWeight="medium">
                Community Platform
              </Text>
            </Flex>
          </Flex>
        </Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                _hover={{ bg: "#e5e5e5" }}
                borderRadius="40px"
                px="2"
              >
                <Flex align="center" gap="1" fontSize="base" color="navText">
                  <HiOutlineBuildingOffice />
                  <Text>mulecraft</Text>
                  <IoIosArrowDown />
                </Flex>
              </MenuButton>
              <MenuList
                px="20px"
                minWidth="280px"
                minH="100px"
                py="25px"
                mt="3px"
                alignItems={"center"}
              >
                <Text
                  fontSize="sm"
                  fontWeight="medium"
                  pl={1}
                  py={1}
                  mb="10px"
                  _hover={{ bg: "#e5e5e5", borderRadius: "10px" }}
                >
                  Business Groups
                  <ExternalLinkIcon mx="2px" />
                </Text>
                <MenuItem
                  p={0}
                  color="navText"
                  _hover={{ bg: "#e5e5e5", borderRadius: "10px" }}
                >
                  <VStack
                    spacing={0}
                    align="flex-start"
                    pl={1}
                    fontSize="xs"
                    color="navText"
                  >
                    <Text>-root-</Text>
                    <Text>Mulecraft</Text>
                  </VStack>
                </MenuItem>
              </MenuList>
            </Menu>
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
                <GoQuestion size="25" />
              </MenuButton>
              <MenuList alignItems={"center"} minW="320px" p={5} mt="1">
                <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">
                  ANYPOINT PLATFORM HELP
                </Text>
                <VStack fontSize="xs" maxW="250px">
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <PiNotebook size="18" />
                      <Text>Publishing API Specifications</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <PiNotebook size="22" />
                      <Text>
                        Create an API Specification with the Text Editor
                      </Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                    mb={10}
                  >
                    <HStack>
                      <PiNotebook size="25" />
                      <Text>
                        API Specification for MuleSoft Connectivity Ecosystem
                      </Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <PiNotebook size="17" />
                      <Text>Documentation</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <PiChatsFill size={17} />
                      <Text> Forums</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <BiSupport size={17} />
                      <Text> Help Center</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <LiaUserGraduateSolid size={17} />
                      <Text> Training</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    border="1px soild #fff"
                    padding="2px"
                    borderRadius="4px"
                    _hover={{ bg: "#e5e5e5" }}
                  >
                    <HStack>
                      <FaRegCompass size={17} />
                      <Text>Tutorials</Text>
                    </HStack>
                  </MenuItem>
                </VStack>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                borderRadius="100px"
                color="#fff"
                px="10px"
                py="1px"
                bg=" profileTextIcon"
                _hover={{ textDecoration: "none" }}
                _active={{ color: "#ff" }}
              >
                KM
              </MenuButton>
              <MenuList
                alignItems={"center"}
                px={5}
                pt={3}
                pb={2}
                minW="250px"
                minH="220px"
              >
                <Text fontSize="sm" fontWeight="medium">
                  FullName
                </Text>
                <Text fontSize="xs">Username</Text>
                <VStack>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius={"4px"}
                  >
                    <HStack>
                      <RxLapTimer />
                      <Text> Usage</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius={"4px"}
                  >
                    <HStack>
                      <CgProfile />
                      <Text> Profile</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius={"4px"}
                  >
                    <HStack>
                      <CgNotes />
                      <Text> Privacy Policy</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius={"4px"}
                  >
                    <HStack>
                      <CiLogout />
                      <Text> Sign Out</Text>
                    </HStack>
                  </MenuItem>
                </VStack>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
        <DrawerComponent isOpen={isDrawerOpen} onClose={handleDrawerClose} />
      </Flex>
    </Box>
  );
};

export default Nav;
