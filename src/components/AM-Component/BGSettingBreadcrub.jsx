import { useEffect, useState, useContext } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Checkbox,
    Divider,
    Flex,
    HStack,
    Input,
    Stack,
    Text,
    Textarea,
    Button,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Tooltip,
    Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  FormLabel,
  ModalFooter,
  ModalContent,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../Utils/supabase";
import FlexableTabs from "../FlexableTabs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiSearch } from "react-icons/fi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { AuthContext } from "../../Utils/AuthProvider";
import deleteBusinessGroup from "../../Utils/BusinessGroupDelete";

const BGSettingsBreadcrumb = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const [ownerData, setOwnerData] = useState([]);
    const toast = useToast();
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [deleteInputValue, setDeleteInputValue] = useState("");
    const [isDeleteButtonDisabled, setDeleteButtonDisabled] = useState(true);
    const [targetGroupName, setTargetGroupName] = useState("");
    const { userData } = useContext(AuthContext);

    const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);

    useEffect(() => {
        const fetchBusinessGroups = async () => {
          const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .select("*")
            .eq("organizationName", userData.company);
    
          if (error) {
            console.error("Error fetching business groups:", error);
          } else {
            setOwnerData(data);
            // console.log("owner data:",ownerData);
            // console.log("user data:",userData);
          }
        };
    
        if (userData) {
          fetchBusinessGroups();
        }
      }, [userData]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .schema("mc_cap_develop")
                    .from("businessgroup")
                    .select("*")
                    .eq("businessGroupId", id);

                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    setGroup(data[0]);
                    // console.log("group:",group);
                    setEditedGroup(data[0]);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleMenuOpen = (businessGroupId) => {
        setSelectedBusinessGroupId(businessGroupId);
    };

    useEffect(() => {
        // console.log('Selected group ID:', selectedBusinessGroupId);
      }, [selectedBusinessGroupId]);

      const handleDeleteOpen = () => {
        setDeleteOpen(true);
        setTargetGroupName(selectedBusinessGroupId.businessGroupName);
      };
    
      const handleDeleteClose = () => {
        setDeleteOpen(false);
        setDeleteInputValue("");
        setDeleteButtonDisabled(true);
        setTargetGroupName(selectedBusinessGroupId.businessGroupName);
      };

      const handleDeleteInputChange = (e) => {
        const value = e.target.value;
        setDeleteInputValue(value);
        const matchingGroup = ownerData.find(
          (group) =>
            group.businessGroupName.toLowerCase() === value.toLowerCase() &&
            group.organizationName.toLowerCase() === selectedBusinessGroupId.organizationName.toLowerCase()
        );
        setDeleteButtonDisabled(!matchingGroup);
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedGroup((prevGroup) => ({
            ...prevGroup,
            [name]: value,
        }));
        setChangesMade(true);
    };

    const handleSaveChanges = async () => {
        try {
            const { data: supabaseData, error: supabaseError } = await supabase
                .schema("mc_cap_develop")
                .from("businessgroup")
                .update({
                    businessGroupName: editedGroup.businessGroupName,
                    groupOwner: editedGroup.groupOwner,
                    orgDomain: editedGroup.orgDomain,
                    sessionTimeout: editedGroup.sessionTimeout
                })
                .eq("businessGroupId", id);

            if (supabaseError) {
                console.error("Error updating data in Supabase:", supabaseError.message);
                throw new Error(supabaseError.message);
            }

            console.log("Saving changes:", editedGroup);
            toast({
                title: "update successfully",
                description: "Settings updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setChangesMade(false);
        } catch (error) {
            toast({
                title: "Update Failed",
                description:
                    "Setting update failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            console.error("Error saving changes:", error);
        }
    };

    async function invokeGroupDeleteFunction(selectedBusinessGroupId) {
        try {
          const response = await deleteBusinessGroup(selectedBusinessGroupId);
          handleDeleteClose();
    
          if (response === "Error occurred!") {
            toast({
              title: "Error",
              description: "Error occurred.",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          } else {
            toast({
              description: "Business group successfully deleted.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
          }
    
          setTimeout(() => {
            window.location.reload();
          }, 800);
        } catch (error) {
          console.error("Error occurred:", error);
        }
      }


    const [activeItem, setActiveItem] = useState("Settings");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [

                { name: 'Settings', label: 'Settings', path: `/accounts/businessGroups/${id}` },
                { name: 'AccessOverview', label: 'Access Overview', path: `/accounts/businessGroups/${id}/access` },
                { name: 'Child Groups', label: 'Child Groups', path: `/accounts/businessGroups/${id}/children` },
                { name: 'Environments', label: 'Environments', path: `/accounts/businessGroups/${id}/environments` },

            ],
        },

    ];

    return (
        <>
        <Box w={'100%'} h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/businessGroups">
                            Business Groups
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID === "" ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/businessGroups/${group?.businessGroupId}`}
                            >
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )

                    }
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/businessGroups/${id}`}
                        >
                            {group?.businessGroupName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                {group?.childGroups !== false ? (
                    ""
                ) : (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HiEllipsisHorizontal width="10px" />}
                            variant="outline"
                            h={"30px"}
                            color="gray.500"
                            border={"1px solid #5c5c5c"}
                            right={30}
                            onClick={() => handleMenuOpen(group)}
                        />
                        <MenuList borderRadius={0}>
                                <Tooltip label="Cannot delete a Business Group with children" placement="auto" fontSize="4xl" 
                                    isDisabled={selectedBusinessGroupId?.childGroups === false||selectedBusinessGroupId?.parentGroupID === ''}>
                                <MenuItem fontSize={14} onClick={handleDeleteOpen} color={"red.600"} isDisabled={selectedBusinessGroupId?.childGroups !== false||selectedBusinessGroupId?.parentGroupID === ''}
                                    _hover={{ color: selectedBusinessGroupId?.childGroups !== false ? '#000' : "white", bgColor: selectedBusinessGroupId?.childGroups !== false ? '' : 'red.600' }}>
                                    Delete business group...
                                </MenuItem>
                                </Tooltip>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Business Group ID</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">{group?.businessGroupId}</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Client ID</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">
                            {group?.clientId}
                        </Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Client Secret</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">{group?.clientSecret}</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Name</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Input
                            fontSize="xs"
                            name="businessGroupName"
                            value={editedGroup?.businessGroupName || ""}
                            onChange={(e) => handleInputChange(e)}
                            size="sm"
                            width={500}
                            height={10}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Owner</Text>
                    </Box>
                    <Box w="1500px" h="40px">
                        <InputGroup right={2}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<FiSearch color="gray" />}
                            />
                            <Input
                                name="groupOwner"
                                placeholder="Select..."
                                value={editedGroup?.groupOwner || ""}
                                onChange={(e) => handleInputChange(e)}
                            />

                        </InputGroup>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" >

                    </Box>
                    <VStack w="1500px" h="80px" gap={4} alignItems="flex-start">
                        <Checkbox
                            size='lg'
                            color='boxColor'
                            defaultChecked
                            isDisabled
                            value={group?.canCreateChildGroup}
                        >
                            Can create a business groups
                        </Checkbox>
                        <Checkbox
                            size='lg'
                            color='boxColor'
                            defaultChecked
                            isDisabled
                            value={group?.canCreateEnvironments}
                        >
                            Can create a environments
                        </Checkbox>
                    </VStack>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Organization domain</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Input
                            fontSize="xs"
                            name="orgDomain"
                            value={editedGroup?.orgDomain || ""}
                            onChange={(e) => handleInputChange(e)}
                            size="sm"
                            width={500}
                            height={10}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5} >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Default session timeout</Text>
                    </Box>
                    <HStack w="full" h="80px" right={200}>
                        <Input
                            fontSize="xs"
                            name="sessionTimeout"
                            value={editedGroup?.sessionTimeout || ""}
                            onChange={(e) => handleInputChange(e)}
                            height={10}
                            type="number"
                        />
                        <Text>minutes</Text>
                    </HStack>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Confidentiality Notification</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Textarea
                            placeholder="Enter your confidentiality prompt"
                            value={editedGroup?.confidentialityNotification || ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px" mt={20}>

                    </Box>
                    <Box w="1500px" h="40px">
                        <Checkbox size='lg' color='boxColor' defaultChecked isDisabled>
                            Can create a business groups
                        </Checkbox>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Runtime Manager</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Text fontSize="xs">
                            Default region</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" >
                    <Box w="full" h="40px" >
                    </Box>
                    <Box w="1500px" h="40px">
                        <InputGroup right={2}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<ChevronDownIcon color="gray" />}
                            />
                            <Input
                                placeholder="US East (Ohio)"
                                value={editedGroup?.defaultRegion || ""}
                                onChange={(e) => handleInputChange(e)}
                                isDisabled
                            />
                        </InputGroup>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
                <Divider />
            </Stack>
            <Stack
                direction="row"
                spacing={5}
                px={4}
                justifyContent="space-between"
                ml={7}
            >
                <Button
                    size="md"
                    variant="outline"
                    onClick={() => {
                        setEditedGroup(group);
                        setChangesMade(false);
                    }}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                >
                    Discard Changes
                </Button>
                <Button
                    size="md"
                    onClick={handleSaveChanges}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                >
                    Save Changes
                </Button>
            </Stack>

            <Divider mt={5} />
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" alignItems="center">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Audit Log Retention Period</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Text fontSize="xs">365 days</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
            </Stack>
        </Box>
        <Modal onClose={handleDeleteClose} isOpen={isDeleteOpen} isCentered>
        <ModalOverlay />
        <ModalContent minW={"600px"} >
          <ModalHeader bg={"#f3f3f3"} fontSize={20} fontWeight={800} color={"#444444"}
            borderTopRadius={15} borderBottom={"1px solid #e5e5e5"}>
            Are you sure?
          </ModalHeader>
          <ModalBody p={"32px 32px"}>
            <VStack spacing={4}>
              <VStack spacing={0} fontSize={14} align={"flex-start"}>
                <FormLabel color={"#747474"} fontWeight={500} fontSize={14}>
                  <b>This action cannot be undone.</b> This will delete the <b>{targetGroupName}</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                <Input placeholder="Business Group name" mt={1} fontSize={14} fontWeight={500}
                  value={deleteInputValue}
                  onChange={handleDeleteInputChange}
                />
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter borderBottomRadius={15} justifyContent={"space-between"} borderTop={"1px solid #e5e5e5"}>
            <Button onClick={handleDeleteClose} variant={"outline"} fontSize={14}>Cancel</Button>
            <Button onClick={() => invokeGroupDeleteFunction(selectedBusinessGroupId)}
              variant={"formButtons"}
              isDisabled={isDeleteButtonDisabled} 
              _hover={{ bgColor: 'navy' }}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    );
};

export default BGSettingsBreadcrumb;
