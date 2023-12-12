import {
  VStack,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  Flex,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { SiSalesforce } from "react-icons/si";
import { CiMenuBurger } from "react-icons/ci";
import { RxQuestionMarkCircled } from "react-icons/rx";
import DrawerComponent from "./DrawerComponent";
import { useState } from "react";

import { CiLogout } from "react-icons/ci";
import { CgProfile, CgNotes } from "react-icons/cg";
import { RxLapTimer } from "react-icons/rx";
import { LiaUserGraduateSolid } from "react-icons/lia";
import { ImCompass2 } from "react-icons/im";
import { PiChatsFill } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { PiBookOpenText } from "react-icons/pi";
import "../assets/Common.css";

export default function PageHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
    console.log("drawer opened!");
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    console.log("drawer closed!");
  };

  return (
    <Flex
      as="nav"
      direction={"column"}
      wrap="wrap"
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={2}
      boxShadow={"rgba(17, 17, 26, 0.3) 0px 1px 0px;"}
    >
      <HStack
        h={"28px"}
        bgColor={"#eef4ff"}
        padding={"0px 16px"}
        alignItems={"center"}
      >
        <SiSalesforce />
        <Text fontSize={"11px"} color={"#5c5c5c"}>
          Salesforce
        </Text>
      </HStack>
      <HStack
        h={"56px"}
        display={"flex"}
        justifyContent={"space-between"}
        p={"0px 16px"}
      >
        <HStack maxW={"270px"}>
          <IconButton
            variant={"text"}
            icon={<CiMenuBurger />}
            fontSize={"20px"}
            onClick={handleDrawerOpen}
            _hover={{ bgColor: "#eaeaea" }}
            borderRadius={"full"}
          ></IconButton>
          <Link
            href="accounts"
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            _hover={{ bgColor: "#eaeaea" }}
            p={1}
            borderRadius={"25px"}
          >
            <Image src="/Images/access-management-color.svg" w={"20%"} />
            <Text
              fontWeight={600}
              fontSize={"16px"}
              w={"fit-content"}
              pr={"12px"}
            >
              Access Management
            </Text>
          </Link>
        </HStack>
        <HStack>
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
              <RxQuestionMarkCircled size="25" />
            </MenuButton>
            <MenuList alignItems={"center"} minW="320px" p={6} mt="1">
              <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">
                ACCESS MANAGEMENT HELP
              </Text>
              <VStack fontSize="xs" maxW="250px">
                <MenuItem
                  border="1px soild #fff"
                  padding="2px"
                  borderRadius="4px"
                  _hover={{ bg: "#e5e5e5" }}
                >
                  <HStack>
                    <PiBookOpenText size="25" />
                    <Text>About Access Management</Text>
                  </HStack>
                </MenuItem>
                <MenuItem
                  border="1px soild #fff"
                  padding="2px"
                  borderRadius="4px"
                  _hover={{ bg: "#e5e5e5" }}
                >
                  <HStack>
                    <PiBookOpenText size="25" />
                    <Text>Access Management Release Notes</Text>
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
                    <PiBookOpenText size="25" />
                    <Text>Troubleshoot Access Management</Text>
                  </HStack>
                </MenuItem>
                <Spacer height={"25px"} />
                <MenuItem
                  border="1px soild #fff"
                  padding="2px"
                  borderRadius="4px"
                  _hover={{ bg: "#e5e5e5" }}
                >
                  <HStack>
                    <PiBookOpenText size="25" />
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
                    <PiChatsFill size={25} />
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
                    <BiSupport size={25} />
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
                    <LiaUserGraduateSolid size={25} />
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
                    <ImCompass2 size={25} />
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
              borderRadius="full"
              // color="#fff"
              px="5px"
              py="5px"
              // bg="profileTextIcon"
              _hover={{ textDecoration: "none", bgColor: "#eaeaea" }}
              _active={{ color: "#ff" }}
            >
              <Avatar
                size={"sm"}
                bg="teal.500"
                name="Shanmathy Prabakaran"
                src=""
                color={"white"}
              />
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
        </HStack>
      </HStack>
      <DrawerComponent isOpen={isDrawerOpen} onClose={handleDrawerClose} />
    </Flex>
  );
}
