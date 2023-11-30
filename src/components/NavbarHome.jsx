import React from "react";
import muleicon from "/Images/mulecommunity.svg";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Image,
  Text,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import "../assets/Common.css";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import "../assets/Common.css";
import { GoQuestion } from "react-icons/go";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
const Nav = () => {
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
              <MenuList alignItems={"center"} minW="350px" p={5}>
                <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">
                  ANYPOINT PLATFORM HELP
                </Text>
                <VStack>
                  <MenuItem p={0}>Publishing API Specifications</MenuItem>
                  <MenuItem p={0}>
                    Create an API Specification with the Text Editor
                  </MenuItem>
                  <MenuItem p={0} mb={10}>
                    API Specification for MuleSoft Connectivity Ecosystem
                  </MenuItem>
                  <MenuItem p={0}>Documentation</MenuItem>
                  <MenuItem p={0}>Forums</MenuItem>
                  <MenuItem p={0}>Help Center</MenuItem>
                  <MenuItem p={0}>Training</MenuItem>
                  <MenuItem p={0}>Tutorials</MenuItem>
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
              <MenuList alignItems={"center"}>
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <Center>
                  <p>Username</p>
                </Center>
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Nav;
