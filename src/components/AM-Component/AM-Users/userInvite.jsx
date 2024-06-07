import { useContext, useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Input,
  useDisclosure,
  useToast,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  ModalHeader,
  Divider,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { AuthContext } from "../../../Utils/AuthProvider";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import moment from "moment";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import EmptyRows from "../EmptyRows";

const UserInvite = () => {
  const [userTable, setUserData] = useState(null);
  const { userData } = useContext(AuthContext);
  const [filter, setFilter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmails] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const toast = useToast();
  const [showNameColumn, setShowNameColumn] = useState(true);
  const [showEmailColumn, setShowEmailColumn] = useState(true);
  const [showVerifiedDateColumn, setShowVerifiedDateColumn] = useState(true);
  const [showIdentityProviderColumn, setShowIdentityProviderColumn] =
    useState(true);
  const [showCreatedDateColumn, setShowCreatedDateColumn] = useState(true);
  const [showLastModifiedDateColumn, setShowLastModifiedDateColumn] =
    useState(true);
  const [showLastLoginDateColumn, setShowLastLoginDateColumn] = useState(true);
  const [showStatusColumn, setShowStatusColumn] = useState(true);
  const [orgId, setOrgId] = useState("");
  const handleReload = (event, path) => {
    event.preventDefault();
    window.location.href = path;
  };

  useEffect(() => {
    if (userData) {
      setOrgId(userData.organizationId);
    }
  }, [userData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orgId) {
          return;
        }
        const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
        const response = await axios.post(
          import.meta.env.VITE_FETCH_ORG_USERS,
          {
            organizationId: orgId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setUserData(response.data);
        console.log("org users", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [orgId]);

  const toggleNameColumn = () => {
    setShowNameColumn(!showNameColumn);
  };
  const toggleEmailColumn = () => {
    setShowEmailColumn(!showEmailColumn);
  };
  const toggleVerifiedDateColumn = () => {
    setShowVerifiedDateColumn(!showVerifiedDateColumn);
  };
  const toggleIdentityProviderColumn = () => {
    setShowIdentityProviderColumn(!showIdentityProviderColumn);
  };
  const toggleCreatedDateColumn = () => {
    setShowCreatedDateColumn(!showCreatedDateColumn);
  };
  const toggleLastModifiedDateColumn = () => {
    setShowLastModifiedDateColumn(!showLastModifiedDateColumn);
  };
  const toggleLastLoginDateColumn = () => {
    setShowLastLoginDateColumn(!showLastLoginDateColumn);
  };
  const toggleStatusColumn = () => {
    setShowStatusColumn(!showStatusColumn);
  };

  const countCheckedColumns = () => {
    let count = 0;
    if (showNameColumn) count++;
    if (showEmailColumn) count++;
    if (showVerifiedDateColumn) count++;
    if (showIdentityProviderColumn) count++;
    if (showCreatedDateColumn) count++;
    if (showLastModifiedDateColumn) count++;
    if (showLastLoginDateColumn) count++;
    if (showStatusColumn) count++;
    return count;
  };

  const columnTitleStyle = {
    fontSize: 14,
    color: "#444444",
    fontWeight: 800,
    textTransform: "capitalize",
  };
  const rowValueStyle = { fontSize: 14 };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmails(value);
    setEmailError("");
  };

  const validateEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  };

  const handleSubmit = async () => {
    const emailList = email.split(",").map((email) => email.trim());

    const invalidEmails = emailList.filter((email) => !validateEmail(email));

    if (invalidEmails.length > 0) {
      setEmailError("Please enter valid email addresses.");
      return;
    }

    const existingEmails = userTable.map((user) => user.email.toLowerCase());
    const duplicateEmails = emailList.filter((email) =>
      existingEmails.includes(email.toLowerCase())
    );

    if (duplicateEmails.length > 0) {
      toast({
        title: "Error",
        description: "One or more emails already exist in the table.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    const company = userData?.company;
    const organizationId = userData?.organizationId;
    const role = userData?.role;
    if (role !== "Admin") {
      toast({
        title: "Error",
        description: "You do not have permission to invite users.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    try {
      await Promise.all(
        emailList.map(async (email) => {
          const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
          const response = await axios.post(
            import.meta.env.VITE_API_URL_INVITE,
            { email, company, organizationId, role },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
        })
      );
      setSubmissionStatus("success");

      onClose();
      toast({
        title: "Invitations sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.error("Error inviting users:", error.message);
      toast({
        title: "Error inviting users",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };
  const filteredData = userTable
    ? userTable
      .filter(
        (user) =>
          userData?.organizationId === user?.organizationId ||
          (user.invited_at && userData?.company === user?.user_metadata?.company)
      )
      .filter((user) => {
        if (!user.full_name) {
          return false;
        }
        return (
          typeof filter === "string" &&
          (user.full_name.toLowerCase().includes(filter.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(filter.toLowerCase())))
        );
      })
    : [];
  return (
    <div>
      <Flex alignItems="center" justifyContent="space-between" zIndex={0}>
        <Button colorScheme="blue" onClick={onOpen}>
          Invite Users
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <Box bg="modelColor" borderRadius="4px">
              <ModalHeader fontSize="lg" fontWeight="800">
                Invite users
              </ModalHeader>
            </Box>
            <Divider />
            <ModalBody>
              <FormControl id="email">
                <FormLabel fontSize="md">Email addresses</FormLabel>
                <Text pb={3} maxW="450px" fontSize="sm" color="textColor">
                  Users will be invited to create a username and password.
                  Separate multiple addresses with commas.
                </Text>
                <Input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="max@community.com"
                  isInvalid={emailError !== ""}
                  h="55px"
                  borderRadius="0px"
                />
                {emailError && <Text color="red.500">{emailError}</Text>}
                <FormLabel fontSize="md" pt={3}>
                  Teams
                </FormLabel>
                <Text pb={3} maxW="450px" fontSize="sm" color="textColor">
                  Invited users will be added to these teams, with the selected
                  membership type.
                </Text>
                <Input
                  type="text"
                  value={userData?.company}
                  isDisabled
                  h="55px"
                />
              </FormControl>
            </ModalBody>
            <Divider />
            <ModalFooter justifyContent="space-between">
              <Button variant="homePageButtons" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} colorScheme="blue">
                Send invitation
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex gap={10} alignItems="center">
          <InputGroup maxW="-webkit-fit-content">
            <InputLeftElement
              pointerEvents="none"
              top={4}
              left={4}
              children={<FiSearch color="gray" />}
            />
            <Input
              placeholder="Filter users"
              value={filter}
              onChange={handleFilterChange}
              my={4}
              ml={4}
            />
          </InputGroup>
          <Menu>
            <MenuButton
              variant="hideShow"
              borderColor="#000"
              borderWidth="1px"
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Columns ({countCheckedColumns()}/8)
            </MenuButton>
            <MenuList p={4}>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showNameColumn}
                  onChange={toggleNameColumn}
                  readOnly
                />
                <Text>Name</Text>
              </Flex>

              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showEmailColumn}
                  onChange={toggleEmailColumn}
                  readOnly
                />
                <Text>Email</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showVerifiedDateColumn}
                  onChange={toggleVerifiedDateColumn}
                  readOnly
                />
                <Text>Verified Date</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showIdentityProviderColumn}
                  onChange={toggleIdentityProviderColumn}
                  readOnly
                />
                <Text>Identity Provider</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showCreatedDateColumn}
                  onChange={toggleCreatedDateColumn}
                  readOnly
                />
                <Text> Created Date</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showLastModifiedDateColumn}
                  onChange={toggleLastModifiedDateColumn}
                  readOnly
                />
                <Text>Last Modified Date</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showLastLoginDateColumn}
                  onChange={toggleLastLoginDateColumn}
                  readOnly
                />
                <Text>Last Login Date</Text>
              </Flex>
              <Flex alignItems="center" gap={2} p={"0.5"}>
                <input
                  style={{ height: 18, width: 18 }}
                  type="checkbox"
                  checked={showStatusColumn}
                  onChange={toggleStatusColumn}
                  readOnly
                />
                <Text>Status</Text>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {filteredData.length === 0 ? (
        <EmptyRows message="No users found" />
      ) : (
        <Table variant="simple" size="md">
          <Thead borderBottomWidth="3px">
            <Tr>
              {showNameColumn && <Th style={columnTitleStyle}>Name</Th>}
              {showEmailColumn && <Th style={columnTitleStyle}>Email</Th>}
              {showVerifiedDateColumn && (
                <Th style={columnTitleStyle}>Verified Date</Th>
              )}
              {showIdentityProviderColumn && (
                <Th style={columnTitleStyle}>Identity Provider</Th>
              )}
              {showCreatedDateColumn && (
                <Th style={columnTitleStyle}>Created Date</Th>
              )}
              {showLastModifiedDateColumn && (
                <Th style={columnTitleStyle}>Last Modified Date</Th>
              )}
              {showLastLoginDateColumn && (
                <Th style={columnTitleStyle}>Last Login Date</Th>
              )}
              {showStatusColumn && <Th style={columnTitleStyle}>Status</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((user, index) => (
              <Tr key={index} _hover={{ bgColor: "#ececec" }}>
                <Td
                  style={rowValueStyle}
                  hidden={!showNameColumn}
                  _hover={{ color: "boxColor" }}
                >
                  <RouterLink
                    to={`/accounts/users/${user.id}`}
                    onClick={(event) =>
                      handleReload(event, `/accounts/users/${user.id}`)
                    }
                  >
                    {user.full_name}
                  </RouterLink>
                </Td>
                <Td style={rowValueStyle} hidden={!showEmailColumn}>
                  {user.email}
                </Td>
                <Td style={rowValueStyle} hidden={!showVerifiedDateColumn}>
                  {moment(user.confirmation_sent_at).format(
                    "h:mm A MMM D, YYYY"
                  )}
                </Td>
                <Td
                  style={rowValueStyle}
                  hidden={!showIdentityProviderColumn}
                >
                  {user.identities}Anypoint
                </Td>
                <Td style={rowValueStyle} hidden={!showCreatedDateColumn}>
                  {" "}
                  {moment(user.created_at).format("h:mm A MMM D, YYYY")}
                </Td>
                <Td
                  style={rowValueStyle}
                  hidden={!showLastModifiedDateColumn}
                >
                  {moment(user.updated_at).format("h:mm A MMM D, YYYY")}
                </Td>
                <Td style={rowValueStyle} hidden={!showLastLoginDateColumn}>
                  {moment(user.last_sign_in_at).format(
                    "h:mm A MMM D, YYYY"
                  )}
                </Td>
                <Td style={rowValueStyle} hidden={!showStatusColumn}>
                  Enabled
                </Td>
                <Td></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </div>
  );
};

export default UserInvite;