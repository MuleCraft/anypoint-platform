import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Stack,
    HStack,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Divider,
    ModalBody,
    FormControl,
    FormLabel,
    Text,
    Input,
    ModalFooter,
    InputGroup,
    InputLeftElement,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";

const Members = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
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
                    setEditedGroup(data[0]);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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



    const [activeItem, setActiveItem] = useState("Members");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [

                { name: 'Members', label: 'Members', path: `/accounts/teams/${id}/users` },
                { name: 'Permissions', label: 'Permissions', path: `/accounts/teams/${id}/permissions` },
                { name: 'ChildTeams', label: 'Child teams', path: `/accounts/teams/${id}/child_teams` },
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${1}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${1}/limits` },



            ],
        },

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
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams/">
                            Teams
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
                    />
                    <MenuList borderRadius={0}>
                        <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                            Delete team...
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
            <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={6}>
                    <Button colorScheme="blue" onClick={onOpen} fontSize="xs">
                        Create Team
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={4}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Create Team
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody>
                                <FormControl id="email" p={4}>
                                    <FormLabel fontSize="base">Name</FormLabel>
                                    <Text pb={2} maxW="450px" fontSize="base" color="textColor">
                                        You can use alphanumeric characters, hyphens, and spaces.
                                    </Text>
                                    <Input
                                        type="text"
                                        value=""
                                        onChange=""
                                        placeholder="e.g. MyTeam"
                                        isInvalid=""
                                    />

                                    <FormLabel fontSize="base" pt={5}>
                                        Parent team
                                    </FormLabel>
                                    <Text pb={2} maxW="450px" fontSize="base" color="textColor">
                                        Teams inherit permissions from their parents.
                                    </Text>
                                    <Input
                                        type="text"
                                    // value={userData?.company}
                                    />
                                </FormControl>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                                    Cancel
                                </Button>
                                <Button onClick="" colorScheme="blue" fontSize="base">
                                    Create
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Teams are groups of users. Manage access more efficiently by organizing teams to reflect your company structure.
                    </Text>
                </HStack>
                <InputGroup maxW={"fit-content"} ml={0}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch />}
                        color="gray.500"
                    />
                    <Input placeholder="Filter Teams" fontSize={14} fontWeight={500}
                        onChange={(e) => { setFilterValue(e.target.value) }}
                    />
                </InputGroup>
            </Stack>
            <TableContainer pt={5} px={5}>
                <Table variant="simple" size="md">
                    <Thead borderBottomWidth="3px">
                        <Tr >
                            <Th style={columnTitleStyle}>Name</Th>
                            <Th style={columnTitleStyle}>Username</Th>
                            <Th style={columnTitleStyle}>Email</Th>
                            <Th style={columnTitleStyle} >Type</Th>
                            <Th style={columnTitleStyle} w={"80px"} ></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }}>
                            <Td style={rowValueStyle}><Box display="flex" alignItems="center" gap={3}><Text >Kavi kasi</Text> <Text fontSize="12" fontWeight="500" color="gray">This is you</Text></Box></Td>
                            <Td style={rowValueStyle}>kaizee1</Td>
                            <Td style={rowValueStyle}>kaviyarasumaran@gmail.com</Td>
                            <Td style={rowValueStyle}>Maintainer</Td>
                            <Td style={rowValueStyle}><Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HiEllipsisHorizontal width="10px" />}
                                    variant="outline"
                                    h={"30px"}
                                    color="gray.500"
                                    border={"1px solid #5c5c5c"}
                                    right={30}
                                />
                                <MenuList borderRadius={0}>
                                    <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                                        Delete team...
                                    </MenuItem>
                                </MenuList>
                            </Menu></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    );
};

export default Members;
