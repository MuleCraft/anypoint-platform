import { useState, useEffect, useContext } from "react";
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
  HStack,
  Text,
  IconButton,
  VStack,
  Avatar,
} from "@chakra-ui/react";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { GoQuestion } from "react-icons/go";
import { RxLapTimer } from "react-icons/rx";
import { CgNotes, CgProfile } from "react-icons/cg";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import DrawerComponent from "./DrawerComponent";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Utils/AuthProvider";
import { Link as ReactRouterLink } from "react-router-dom";
import supabase from "../Utils/supabase";
import Images from "./Images";
import DynamicContent from "./AccessManagemntHelpCard";


const Nav = ({ name, pathValue }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const selectedImage = Images[name];

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserData();
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
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      px={4}
      borderBottom="1px solid #747474"
      bg="forWhiteText"
      className={hasScrolled ? "fixed-header" : ""}
      position={"fixed"}
      top={hasScrolled ? 0 : "auto"}
      width="100%"
      zIndex={"1"}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex align="center" gap="3">
          <IconButton
            bg="none"
            borderRadius="40px"
            icon={<CiMenuBurger />}
            _hover={{ bg: "#e5e5e5", borderRadius: "40px" }}
            onClick={handleDrawerOpen}
          />
          <ReactRouterLink to={pathValue}>
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
              <Image src={selectedImage} alt="mule icon" className="mule-icon" />
              <Text fontSize={{ base: "xs", sm: "sm" }} fontWeight="medium">
                {name}
              </Text>
            </Flex>
          </ReactRouterLink>
        </Flex>
        <Flex alignItems="center">
          <Stack direction="row" spacing={7}>
            <Menu>
              {name === "Anypoint Platform" && (
                <MenuButton
                  as={Button}
                  display={{ base: "none", md: "block" }}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                  minW={0}
                  _hover={{ bg: "#e5e5e5" }}
                  borderRadius="40px"
                  px="2"
                >

                  <Flex align="center" gap="1" fontSize="base" color="navText">
                    <HiOutlineBuildingOffice />
                    <Text>{userData?.company}</Text>
                    <IoIosArrowDown />
                  </Flex>


                </MenuButton>
              )}
              <MenuList
                px="20px"
                minWidth="280px"
                minH="100px"
                py="25px"
                mt="3px"
                alignItems="center"
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
                    <Text>{userData?.company}</Text>
                  </VStack>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                display={{ base: "none", md: "block" }}
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
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
              <MenuList
                alignItems="center"
                minW="320px"
                p={6}
                mt="1"
                sx={{ overflow: "scroll" }}
              >
                <DynamicContent name={name} />
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
                borderRadius="full"
                px="5px"
                py="5px"
                _hover={{ textDecoration: "none", bgColor: "#eaeaea" }}
                _active={{ color: "#ff" }}
              >
                <Avatar
                  size="sm"
                  bg="teal.500"
                  name={userData?.full_name}
                  src=""
                  color="white"
                />
              </MenuButton>
              <MenuList
                alignItems="center"
                px={5}
                pt={3}
                pb={2}
                minW="250px"
                minH="220px"
                mt={1}
              >
                <Text fontSize="sm" fontWeight="medium">
                  {userData ? userData.full_name : "Loading..."}
                </Text>
                <Text fontSize="xs">
                  {userData ? userData.display_name : "Loading..."}
                </Text>
                <VStack spacing={3} pt={2}>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius="4px"
                  >
                    <HStack>
                      <RxLapTimer />
                      <Text>Usage</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius="4px"
                  >
                    <HStack>
                      <CgProfile />
                      <Text>Profile</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius="4px"
                  >
                    <HStack>
                      <CgNotes />
                      <Text>Privacy Policy</Text>
                    </HStack>
                  </MenuItem>
                  <MenuItem
                    fontSize="xs"
                    _hover={{ bg: "#e5e5e5" }}
                    borderRadius="4px"
                    onClick={handleLogout}
                  >
                    <HStack>
                      <CiLogout />
                      <Text>Sign Out</Text>
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
