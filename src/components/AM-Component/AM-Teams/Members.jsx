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
    Radio,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Members = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
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
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const [user, setUser] = useState('');
    const [role, setRole] = useState('');
    const [isUserInvalid, setIsUserInvalid] = useState(false);
    const [isRoleInvalid, setIsRoleInvalid] = useState(false);

    const handleCreate = () => {
        let isValid = true;

        if (!user) {
            setIsUserInvalid(true);
            isValid = false;
        }

        if (!role) {
            setIsRoleInvalid(true);
            isValid = false;
        }

        if (isValid) {
            // Handle create action here
            console.log('User:', user);
            console.log('Role:', role);
            // After handling, you might want to close the modal
            onClose();
        }
    };

    const handleUserBlur = () => {
        if (!user) {
            setIsUserInvalid(true);
        } else {
            setIsUserInvalid(false);
        }
    };

    const handleRoleBlur = () => {
        if (!role) {
            setIsRoleInvalid(true);
        } else {
            setIsRoleInvalid(false);
        }
    };

    const handleMenuItemClick = (value) => {
        setUser(value);
        setIsUserInvalid(false);
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
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${id}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${id}/limits` },
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
            <Flex alignItems="center" justify="space-between" >
                <Breadcrumb >
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
                    )}
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
                        Add members
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={4}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Add team members
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody>
                                <FormControl pl={4} isInvalid={isUserInvalid}>
                                    <FormLabel fontSize="base">Users</FormLabel>
                                    <Flex gap={5} alignItems="center" justifyContent="center">
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<FiSearch />}
                                                color="gray.500"
                                            />

                                            <Input as={Input}
                                                type="text"
                                                value={user}
                                                onChange={(e) => setUser(e.target.value)}
                                                onBlur={handleUserBlur}
                                                placeholder="Select..."
                                                borderColor={isUserInvalid ? 'red.500' : 'inherit'}
                                            />

                                        </InputGroup>
                                        {isUserInvalid && <FormErrorMessage>required.</FormErrorMessage>}
                                    </Flex>
                                </FormControl>

                                <FormControl pl={4} isInvalid={isRoleInvalid}>
                                    <FormLabel fontSize="base" pt={5}>
                                        Type
                                    </FormLabel>
                                    <Stack onBlur={handleRoleBlur}>
                                        <Radio
                                            size='lg'
                                            name='role'
                                            value='member'
                                            isChecked={role === 'member'}
                                            onChange={(e) => setRole(e.target.value)}
                                            color='boxColor'
                                            alignItems="flex-end"
                                        >
                                            <FormLabel fontSize="base">
                                                Member
                                            </FormLabel>
                                            <Text fontSize="base" color="gray">
                                                Inherits permissions from this team and its parents.
                                            </Text>
                                        </Radio>
                                        <Radio
                                            size='lg'
                                            name='role'
                                            value='maintainer'
                                            isChecked={role === 'maintainer'}
                                            onChange={(e) => setRole(e.target.value)}
                                            color='boxColor'
                                            alignItems="flex-end"
                                        >
                                            <FormLabel fontSize="base">
                                                Maintainer
                                            </FormLabel>
                                            <Text fontSize="base" color="gray">
                                                Also manages team membership and child teams.
                                            </Text>
                                        </Radio>
                                    </Stack>
                                    {isRoleInvalid && <FormErrorMessage pt={3}>Type is required.</FormErrorMessage>}
                                </FormControl>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                                    Cancel
                                </Button>
                                <Button onClick={handleCreate} colorScheme="blue" fontSize="base">
                                    Create
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
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
                        <Tr>
                            <Th style={columnTitleStyle}>Name</Th>
                            <Th style={columnTitleStyle}>Username</Th>
                            <Th style={columnTitleStyle}>Email</Th>
                            <Th style={columnTitleStyle}>Type</Th>
                            <Th style={columnTitleStyle} w={"80px"}></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }}>
                            <Td style={rowValueStyle}><Box display="flex" alignItems="center" gap={3}><Text>Kavi kasi</Text><Text fontSize="12" fontWeight="500" color="gray">This is you</Text></Box></Td>
                            <Td style={rowValueStyle}>kaizee1</Td>
                            <Td style={rowValueStyle}>kaviyarasumaran@gmail.com</Td>
                            <Td style={rowValueStyle}>
                                <Menu>
                                    <MenuButton as={Link} variant="" rightIcon={<ChevronDownIcon />}>
                                        Actions
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>Download</MenuItem>
                                        <MenuItem>Create a Copy</MenuItem>
                                        <MenuItem>Mark as Draft</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                        <MenuItem>Attend a Workshop</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                            <Td style={rowValueStyle}>
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
                                        <MenuItem fontSize="base" color="white" onClick="" bgColor="delete">
                                            Delete team...
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Members;
