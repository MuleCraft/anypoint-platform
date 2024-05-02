import { useEffect, useState } from "react";
import adminAuthClient from "../../Utils/api";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  IconButton,
  Text,
  BreadcrumbItem,
  Heading,
  Checkbox,
  BreadcrumbLink,
  Flex,
  Box,
  Breadcrumb,
  Divider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Stack,
  Input,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import userId from "../../pages/Access-Management/utils/AM-UserID";
import FlexableTabs from "../FlexableTabs";
import { PiPencilLight } from "react-icons/pi";
import supabase from "../../Utils/supabase";
import { filterFns } from "@tanstack/react-table";
import axios from "axios";

const UserNameBreadcrumb = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [userTable, setUserData] = useState(null);
  const [activeItem, setActiveItem] = useState("Settings");
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editableName, setEditableName] = useState("");
  const [editableEmail, setEditableEmail] = useState("");
  const [iconButtonVisible, setIconButtonVisible] = useState(true);
  const [emailButtonVisible, setEmailButtonVisible] = useState(true); // State to control the visibility of the email icon button
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [email, setUserEmail] = useState(null);
  const toast = useToast();
  const handleEdit = () => {
    setIsEditing(true);
    setEditableName(user?.user_metadata?.full_name || "");
    setIconButtonVisible(false);
    setEmailButtonVisible(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableName(user?.user_metadata?.full_name || "");
    setIconButtonVisible(true);
    setEmailButtonVisible(true);
  };

  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setEditableEmail(user?.email || "");
    setIconButtonVisible(false);
    setEmailButtonVisible(false);
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setEditableEmail(user?.email || "");
    setIconButtonVisible(true);
    setEmailButtonVisible(true);
  };

  const handleItemSelect = (itemName) => {
    setActiveItem(itemName);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await adminAuthClient.listUsers();
        const user = data.users.find((user) => user.id === id);

        if (error) {
          console.error("Error fetching user data:", error.message);
        } else {
          console.log("User data fetched successfully");
          setUserData(data.users);
          setUser(user);
          setUserEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const validateEmailFormat = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const checkForDuplicateEmail = (email) => {
    return userTable.some(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  };

  const checkForDuplicateName = (name) => {
    return (
      userTable &&
      typeof filter === "string" &&
      userTable.some(
        (user) =>
          user.user_metadata.full_name.toLowerCase() === name.toLowerCase()
      )
    );
  };

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setEditableName(value);
    if (!value.trim() || value.trim().split(" ").length < 2) {
      setNameError("Enter your first name and last name");
    } else {
      setNameError("");
    }
  };
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEditableEmail(value);
    if (!value.trim()) {
      setEmailError("");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handleNameSubmit = async () => {
    let isFormValid = true;
    if (!editableName.trim() || editableName.trim().split(" ").length < 2) {
      setNameError("Name cannot be empty");
      isFormValid = false;
    } else if (checkForDuplicateName(editableName.trim())) {
      setNameError("This name is already in use");
      isFormValid = false;
    } else {
      setNameError("");
      isFormValid = true;
    }
    if (!isFormValid) {
      return;
    }
    try {
      const { error } = await supabase
        .schema("mc_cap_develop")
        .from("users")
        .upsert([
          {
            id: id,
            full_name: editableName.trim(),
          },
        ]);
      if (error) {
        console.error("Error updating username:", error.message);
      } else {
        console.log("Username updated successfully:");
        const requestBody = {
          id: id,
          full_name: editableName,
        };
        const { data, error } = await axios.put(
          `${import.meta.env.VITE_UPDATE_FULL_NAME_URL}`,
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
              }`,
            },
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          user_metadata: { ...prevUser.user_metadata, full_name: editableName },
        }));
        toast({
          title: "Full name updated successfully",
          description: "Your full name has been successfully updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating username:", error);
      toast({
        title: "Error",
        description:
          "There was an error updating your full name. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } finally {
      setIsEditing(false);
      setEmailButtonVisible(true);
      setIconButtonVisible(true);
    }
  };

  const handleEmailSubmit = async () => {
    let isFormValid = true;
    if (!editableEmail.trim()) {
      setEmailError("Email cannot be empty");
      isFormValid = false;
    } else if (!validateEmailFormat(editableEmail)) {
      setEmailError("Invalid email format");
      isFormValid = false;
    } else if (checkForDuplicateEmail(editableEmail)) {
      setEmailError("This email is already in use");
      isFormValid = false;
    } else {
      setEmailError("");
    }

    try {
      if (!isFormValid) {
        return isFormValid;
      }

      const { data: supabaseData, error: supabaseError } = await supabase
        .schema("mc_cap_develop")
        .from("users")
        .upsert([
          {
            id: id,
            email: editableEmail.trim(),
          },
        ]);
      if (supabaseError) {
        console.error(
          "Error updating email in Supabase:",
          supabaseError.message
        );
      } else {
        console.log("Email updated successfully in Supabase:", supabaseData);
        setUser((prevUser) => ({ ...prevUser, email: editableEmail }));
      }
      const requestBody = {
        id: id,
        email: editableEmail.trim(),
      };

      const { data, error } = await axios.put(
        `${import.meta.env.VITE_UPDATE_EMAIL_URL}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
            }`,
          },
        }
      );

      if (error) {
        console.error("Error updating email:", error.message);
      } else {
        console.log("Email updated successfully:", data);
        setUser((prevUser) => ({ ...prevUser, email: editableEmail }));
        toast({
          title: "Email update!",
          description: "Your Email has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
      setEmailButtonVisible(true);
      setIconButtonVisible(true);
      setIsEditingEmail(false);
    } catch (error) {
      console.error("Error updating email:", error);
    }

    onClose();

    return isFormValid;
  };

  const deleteInvitation = async () => {
    try {
      const { error: deleteError } = await supabase
        .schema("mc_cap_develop")
        .from("users")
        .delete()
        .eq("id", id);

      if (deleteError) {
        console.error(`Error deleting user ${id}:`, deleteError.message);
        throw deleteError;
      } else {
        console.log(`User with ID ${id} deleted successfully`);
        toast({
          title: "User deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });

        await insertAdditional(id);
      }
    } catch (error) {
      console.error("Error User deleting:", error.message);
      toast({
        title: "Error User deleting",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const insertAdditional = async (id) => {
    try {
      const { error } = await adminAuthClient.deleteUser(id);

      if (error) {
        console.error(
          `Error canceling invitation for user ${id}:`,
          error.message
        );
        throw error;
      } else {
        console.log(`Invitation canceled for user with ID: ${id}`);
      }
    } catch (error) {
      console.error("Error delete user:", error.message);
      toast({
        title: "Error inserting additional details",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleRequestCredentials = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        throw new Error(error.message);
      }
      setSubmissionStatus("success");
      toast({
        title: "Send reset Password link",
        description: "check your email ",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      setSubmissionStatus("failed");
    }
  };

  const columnTitleStyle = {
    fontSize: 14,
    color: "#444444",
    fontWeight: 800,
    textTransform: "capitalize",
  };
  const rowValueStyle = { fontSize: 14 };

  return (
    <Box mt="-60px">
      <Flex alignItems="center" justify="space-between">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink fontSize="lg" href="/accounts/users/">
              Users
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink
              fontSize="lg"
              fontWeight="600"
              href={`/accounts/users/${user?.id}`}
            >
              {user?.user_metadata.full_name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HiEllipsisHorizontal width="10px" />}
            variant="outline"
            h={"30px"}
            color="gray.500"
            border={"1px solid #5c5c5c"}
          />
          <MenuList borderRadius={0}>
            <MenuItem fontSize="sm" onClick={handleRequestCredentials}>
              Reset Password...
            </MenuItem>
            <MenuItem fontSize="sm" isDisabled>
              Reset Multi-factor auth...
            </MenuItem>
            <MenuItem fontSize="sm" color="red">
              Disable user...
            </MenuItem>
            <MenuItem fontSize="sm" color="red" onClick={deleteInvitation}>
              Delete user...
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Box pt={7}>
        <FlexableTabs
          sections={userId}
          activeItem={activeItem}
          onItemSelect={handleItemSelect}
        />
      </Box>
      <Stack spacing={3} mt={7} mb={7}>
        <HStack justify="space-between">
          <Box w="full" h="40px">
            <Text fontSize="xs">Full name</Text>
          </Box>
          <Box w="full" h="40px">
            <Text fontSize="xs">{user?.user_metadata.full_name}</Text>
          </Box>
          <Box w="full" h="40px"></Box>
        </HStack>
        <HStack justify="space-between">
          <Box w="full" h="40px">
            <Text fontSize="xs">Created</Text>
          </Box>
          <Box w="full" h="40px">
            <Text fontSize="xs">
              {moment(user?.created_at).format("  YYYY/MM/DD")}
            </Text>
          </Box>
          <Box w="full" h="40px"></Box>
        </HStack>
        <HStack justify="space-between">
          <Box w="full" h="40px">
            <Text fontSize="xs">Multi-factor auth</Text>
          </Box>
          <Box w="full" h="40px">
            <Text fontSize="xs">Not Enabled</Text>
          </Box>
          <Box w="full" h="40px"></Box>
        </HStack>
        <Divider mt={5} />
      </Stack>
      <Box mt="10">
        <Box mt={5} mb={10}>
          <Heading fontSize="sm" mb={7}>
            Identity Provider Profiles
          </Heading>
          <Table variant="simple" size="md">
            <Thead borderBottomWidth="3px">
              <Tr>
                <Th style={columnTitleStyle}>Identity Provider</Th>
                <Th style={columnTitleStyle}>Full name</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td style={rowValueStyle}>Anypoint</Td>
                <Td style={rowValueStyle}>{user?.user_metadata.full_name}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Divider />
        <Stack spacing={6} mt={7} mb={7}>
          <HStack justify="space-between">
            <Box w="full" h="40px">
              <Text fontSize="xs">Full name</Text>
            </Box>
            <Box w="full" h="40px">
              {isEditing ? (
                <>
                  <Input
                    fontSize="xs"
                    value={editableName}
                    onChange={handleFullNameChange}
                    size="sm"
                    width={500}
                    height={10}
                  />
                  <Text fontSize="xs" color="red.500">
                    {nameError}
                  </Text>
                </>
              ) : (
                <Text fontSize="xs" textAlign="left">
                  {user?.user_metadata.full_name}
                </Text>
              )}
            </Box>
            <Box w="full" h="40px">
              {iconButtonVisible ? (
                <IconButton
                  icon={<PiPencilLight />}
                  onClick={handleEdit}
                  variant="ghost"
                  size="sm"
                />
              ) : (
                <Box />
              )}
            </Box>
          </HStack>
          <HStack justify="space-between">
            <Box w="full" h="40px">
              <Text fontSize="xs">Exempt from MFA requirement</Text>
            </Box>
            <Box w="full" h="40px">
              <Checkbox defaultChecked />
            </Box>
            <Box w="full" h="40px"></Box>
          </HStack>
          <Divider mt={5} />
          <HStack justify="space-between" mt={5}>
            <Box w="full" h="40px">
              <Text fontSize="xs">Email</Text>
            </Box>
            <Box w="full" h="40px">
              {isEditingEmail ? (
                <>
                  <Input
                    fontSize="xs"
                    value={editableEmail}
                    onChange={handleEmailChange}
                    isInvalid={emailError !== ""}
                    errorBorderColor="red.300"
                    size="sm"
                    width={500}
                    height={10}
                  />
                  {emailError && (
                    <Text fontSize="xs" color="red.500">
                      {emailError}
                    </Text>
                  )}
                </>
              ) : (
                <Text fontSize="xs" textAlign="left">
                  {user?.email}
                </Text>
              )}
            </Box>
            <Box w="full" h="40px">
              {emailButtonVisible ? (
                <IconButton
                  icon={<PiPencilLight />}
                  onClick={handleEditEmail}
                  variant="ghost"
                  size="sm"
                />
              ) : (
                <Box />
              )}
            </Box>
          </HStack>
        </Stack>
      </Box>
      {isEditing && (
        <Stack
          direction="row"
          spacing={5}
          mt={20}
          px={4}
          justifyContent="space-between"
        >
          <Button
            size="md"
            variant="outline"
            onClick={handleCancel}
            colorScheme="blue"
          >
            Discard Changes
          </Button>
          <Button size="md" onClick={handleNameSubmit} colorScheme="blue">
            Save Changes
          </Button>
        </Stack>
      )}

      {isEditingEmail && (
        <Stack
          direction="row"
          spacing={5}
          mt={20}
          px={4}
          justifyContent="space-between"
        >
          <Button
            variant="outline"
            size="md"
            onClick={handleCancelEmail}
            colorScheme="blue"
          >
            Discard Changes
          </Button>
          <Button size="md" onClick={onOpen} colorScheme="blue">
            Save Changes
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent>
              <Box bg="modelColor" borderRadius="4px">
                <ModalHeader fontSize="lg" fontWeight="800">
                  Confirm Change of Email
                </ModalHeader>
              </Box>
              <Divider />
              <ModalBody>
                <Text
                  py={3}
                  fontWeight="600"
                  maxW="450px"
                  fontSize="sm"
                  color="#000"
                  textAlign="center"
                >
                  Are you sure to update your email address?
                </Text>
              </ModalBody>
              <Divider />
              <ModalFooter justifyContent="space-between">
                <Button variant="homePageButtons" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleEmailSubmit} colorScheme="blue">
                  Confirm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Stack>
      )}
    </Box>
  );
};

export default UserNameBreadcrumb;
