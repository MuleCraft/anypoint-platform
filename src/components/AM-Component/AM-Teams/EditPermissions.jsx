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
    FormLabel,
    Text,
    Input,
    ModalFooter,
    InputGroup,
    InputLeftElement,

    Accordion,

} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Switch from "../../Switch";
import CustomAccordionItem from "../../Accordion";

const Members = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
    }, []);


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

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const AccessManagement = [
        { title: "Organization Administrator", tooltip: "Enables the user to manage the whole organization" },
        { title: "Audit Log Viewer", tooltip: "Audit Log Viewer" },
        { title: "Audit Log Config Manager", tooltip: "For Managing Audit Log Retention Settings. Applicable only for the root organization." },
    ];
    const AnypointCodeBuilder = [
        { title: "Anypoint Code Builder Developer", tooltip: "Gives the ability to create and use Anypoint Code Builder WebIDE instances" },
    ];
    const AnypointMonitoring = [
        { title: "Monitoring Viewer", tooltip: "Role for Anypoint Monitoring Viewer" },
        { title: "Monitoring Administrator", tooltip: "Role for Anypoint Monitoring Administrator" },
    ];
    const APICatalog = [
        { title: "API Catalog Contributor", tooltip: "Grants permission to catalog assets and other resources using API Catalog" },
    ];
    const APIGovernance = [
        { title: "Governance Administrator", tooltip: "Manage profiles and view reports" },
        { title: "Governance Viewer", tooltip: "View reports" },

    ];
    const APIManager = [
        { title: "API Group Administrator", tooltip: "Manage groups" },
        { title: "API Creator", tooltip: "API Creator allows the user to create APIs" },
        { title: "API Versions Owner", tooltip: "Owner of all API versions in the sub-organization" },
        { title: "Portals Viewer", tooltip: "Viewer of all portals in the sub-organization" },
        { title: "View Client Applications", tooltip: "View all client applications in the organization" },
        { title: "Manage Client Applications", tooltip: "Manage all client applications in the organization" },
    ];
    const DesignCenterDeveloper = [
        { title: "Design Center Developer", tooltip: "Gives the ability to create and manage any project from the organization" },
        { title: "Design Center Creator", tooltip: "Allow users to create and administrate their own projects projects" },
        { title: "Design Center Viewer", tooltip: "Allow users to view all Design Center projects" },
    ];
    const Exchange = [
        { title: "Exchange Administrator", tooltip: "Gives permission to view, create, share, deprecate, delete, and download assets within a business group. Also gives permission to edit asset portal content for an existing asset version" },
        { title: "Exchange Contributor", tooltip: "Gives permission to view, create, and download assets within a business group. Also gives permission to edit asset portal content in an existing asset version" },
        { title: "Exchange Viewer", tooltip: "Gives permission to view and download assets within a business group" },
        { title: "Exchange Creator", tooltip: "Gives permission to create assets within a business group" },
    ];

    const RuntimeManager = [
        { title: "Cloudhub Network Administrator", tooltip: "Manage Cloudhub network resources" },
        { title: "Cloudhub Network Viewer", tooltip: "Gives the ability to view Cloudhub network resources" },
        { title: "Read Runtime Fabrics", tooltip: "Role for querying Runtime Fabrics in the organization" },
        { title: "Manage Runtime Fabrics", tooltip: "Read, create, update and delete Runtime Fabric resources" },
    ];
    const Usage = [
        { title: "Usage Viewer", tooltip: "Role needed to view Usage Reports" },
    ];
    const Visualizer = [
        { title: "Visualizer Editor", tooltip: "Grants write and read access to Visualizer" },
    ];



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
                        Add members
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={3}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Edit Permissions
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody pb={7}>
                                <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'}>
                                    <HStack spacing={6}>
                                        <Text fontSize={14} color={"#747474"} fontWeight={500}>
                                            Select permissions this team should have for MC.
                                        </Text>
                                    </HStack>
                                    <InputGroup maxW={"fit-content"} ml={0}>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<FiSearch />}
                                            color="gray.500"
                                        />
                                        <Input
                                            placeholder="Filter"
                                            fontSize={14}
                                            fontWeight={500}
                                            onChange={(e) => { setFilterValue(e.target.value) }}
                                        />
                                    </InputGroup>
                                </Stack>
                                <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'}>
                                    <HStack spacing={6}>
                                        <FormLabel fontWeight={600} fontSize="base">
                                            Permissions
                                        </FormLabel>
                                    </HStack>
                                    <Switch />
                                </Stack>
                                <Box pt={2} maxHeight="50vh" overflowY="auto">
                                    <Accordion allowToggle>
                                        <CustomAccordionItem sectionTitle="Access Management" subtitles={AccessManagement} />
                                        <CustomAccordionItem sectionTitle="Anypoint Code Builder" subtitles={AnypointCodeBuilder} />
                                        <CustomAccordionItem sectionTitle="Anypoint Monitoring" subtitles={AnypointMonitoring} />
                                        <CustomAccordionItem sectionTitle="API Catalog" subtitles={APICatalog} />
                                        <CustomAccordionItem sectionTitle="API Governance" subtitles={APIGovernance} />
                                        <CustomAccordionItem sectionTitle="API Manager" subtitles={APIManager} />
                                        <CustomAccordionItem sectionTitle="Design Center Developer" subtitles={DesignCenterDeveloper} />
                                        <CustomAccordionItem sectionTitle="Exchange" subtitles={Exchange} />
                                        <CustomAccordionItem sectionTitle="Runtime Manager" subtitles={RuntimeManager} />
                                        <CustomAccordionItem sectionTitle="Usage" subtitles={Usage} />
                                        <CustomAccordionItem sectionTitle="Visualizer" subtitles={Visualizer} />
                                    </Accordion>
                                </Box>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                                    Cancel
                                </Button>
                                <Button variant="homePageButtons" onClick="" fontSize="base" >
                                    Done
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
                            <Td style={rowValueStyle}> <Menu>
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
                            </Menu></Td>
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
