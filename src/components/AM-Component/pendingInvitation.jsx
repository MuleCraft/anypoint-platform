import { useContext, useEffect, useState } from 'react';
import adminAuthClient from '../../Utils/api';
import { Menu, MenuButton, MenuItem, MenuList, Table, Tbody, Td, Th, Thead, Tr, IconButton, Tooltip, Text, Input, useDisclosure, useToast, Flex, Button, Modal, ModalOverlay, ModalContent, Box, ModalHeader, Divider, ModalBody, FormControl, FormLabel, ModalFooter, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { AuthContext } from '../../Utils/AuthProvider';
import { FiSearch } from "react-icons/fi";
import supabase from '../../Utils/supabase';
import axios from 'axios';

const UserTable = () => {
  const [userTable, setUserData] = useState(null);
  const { userData } = useContext(AuthContext);
  const [filter, setFilter] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmails] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
        const response = await axios.get(import.meta.env.VITE_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': `application/json`,
          }
        });
        setUserData(response.data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateExpirationStatus = (invited_at) => {
    if (!invited_at) return null;
    const invitedDate = new Date(invited_at);
    const currentDate = new Date();
    const differenceInTime = Math.abs(currentDate.getTime() - invitedDate.getTime());
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays > 7) {
      return `${differenceInDays - 1} days )`;
    } else {
      return `${1 - (-differenceInDays + 1)} days `;
    }
  };


  const calculateSendStatus = (invited_at) => {
    if (!invited_at) return null;
    const invitedDate = new Date(invited_at);
    const currentDate = new Date();
    const differenceInTime = invitedDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays < 0) {
      return `${Math.abs(differenceInDays + 1)} days ago`;
    } else if (differenceInDays === 1) {
      return `an hour ago`;
    } else {
      return `${differenceInDays} days to go`;
    }
  };

  const columnTitleStyle = { fontSize: 14, color: '#444444', fontWeight: 800, textTransform: 'capitalize', };
  const rowValueStyle = { fontSize: 14, };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


  const company = userData?.company
  const organizationId = userData?.organizationId

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
    try {
      await Promise.all(
        emailList.map(async (email) => {
          const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
          const response = await axios.post(import.meta.env.VITE_API_URL_INVITE, { email, company, organizationId }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            }

          });
          console.log(response)
        })
      );

      setSubmissionStatus("success");
      window.location.reload();
      onClose();
      toast({
        title: "Invitations sent successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right"

      }
      );
    } catch (error) {
      console.error("Error inviting users:", error.message);
      toast({
        title: "Error inviting users",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    }
  };
  console.log(submissionStatus)


  const cancelInvitation = async (id) => {
    try {

      const { error: deleteError } = await supabase
        .schema('mc_cap_develop')
        .from('users')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error(`Error deleting user ${id}:`, deleteError.message);
        throw deleteError;
      } else {
        console.log(`User with ID ${id} deleted successfully`);
        toast({
          title: "canceled invitation",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right"
        });

        await insertAdditional(id);
      }
    } catch (error) {
      console.error("Error canceling invitation:", error.message);
      toast({
        title: "Error canceling invitation",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right"
      });
    }
  };

  const insertAdditional = async (id) => {
    try {
      const { error } = await adminAuthClient.deleteUser(id);

      if (error) {
        console.error(`Error canceling invitation for user ${id}:`, error.message);
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
        position: "top-right"
      });
    }
  };



  const ResendInvitation = async (email) => {
    const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
    const response = await axios.post(import.meta.env.VITE_API_URL_INVITE, { email, company, organizationId }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }

    });
    console.log(response)
    if (response) {
      console.error(`Error inviting user ${email}:`, response.message);

    }

    setSubmissionStatus("success");
    onClose();
    toast({
      title: "Invitations sent successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right"

    }
    );

  }

  return (
    <div>
      <Flex alignItems="center" justifyContent="space-between" >
        <Button colorScheme="blue" onClick={onOpen} zIndex={0} >Invite Users</Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <Box bg="modelColor" borderRadius="4px">
              <ModalHeader fontSize="lg" fontWeight="800">Invite users</ModalHeader>
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
                <FormLabel fontSize="md" pt={3}>Teams</FormLabel>
                <Text pb={3} maxW="450px" fontSize="sm" color="textColor">

                  Invited users will be added to these teams, with the selected membership type.
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
              <Button variant="homePageButtons" onClick={onClose}>Close</Button>
              <Button onClick={handleSubmit} colorScheme="blue">
                Send invitation
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
      </Flex>

      <Table variant="simple" size="md">
        <Thead borderBottomWidth="3px">
          <Tr>
            <Th style={columnTitleStyle}>Email</Th>
            <Th style={columnTitleStyle}>Sent</Th>
            <Th style={columnTitleStyle}>Expires</Th>
            <Th style={columnTitleStyle}>Teams</Th>
            <Th style={columnTitleStyle} w={'10px'}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {Array.isArray(userTable) && userTable
            .filter(user =>
              user.email.toLowerCase().includes(filter.toLowerCase()) && !user.last_sign_in_at
            )
            .map((conversion, index) => (
              <Tr key={index}>
                <Td style={rowValueStyle}>{conversion.email}</Td>
                <Td style={rowValueStyle}>{calculateSendStatus(conversion.invited_at)}</Td>
                <Td style={rowValueStyle}>{calculateExpirationStatus(conversion.invited_at)}</Td>
                <Td style={rowValueStyle}>
                  <Tooltip fontSize="12px" label={`Everyone at ${userData?.company} (Member)`} placement='auto'>
                    <Text>1 team</Text>
                  </Tooltip>
                </Td>
                <Td style={rowValueStyle}>
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label='Options'
                      icon={<HiEllipsisHorizontal width="10px" />}
                      variant='outline'
                      h={'30px'} color="gray.500"
                      border={'1px solid #5c5c5c'}
                    />
                    <MenuList borderRadius={0}>
                      <MenuItem fontSize="sm" onClick={() => ResendInvitation(conversion.email)}>
                        Resend Invitation...
                      </MenuItem>
                      <MenuItem fontSize="sm" color="red" onClick={() => cancelInvitation(conversion.id)}>
                        Cancel Invitation...
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
        </Tbody>

      </Table>
    </div>
  );
};

export default UserTable;
