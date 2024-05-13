import { Box, Button, Text, VStack, Image, Flex, InputGroup, Input, InputRightElement, InputLeftElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Stack, Table, Thead, Tr, Th, Tbody, Td, Heading, MenuDivider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalBody, FormControl, RadioGroup, Radio, TableContainer, ModalFooter, Link, Spinner, Tabs, TabList, Tab, TabPanels, TabPanel, Textarea } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs";
import { CloseIcon, InfoOutlineIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
import { IoMdCloudOutline } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
export const RuntimeServersSandbox = () => {
    const data = [
        {

            "Name": "CloudHub",
            "TargetName": "CloudHub",
            "TargetType": "Started",
            "Status": "Started",
            "RuntimeVersion": "4.6.2:5e",
        },
        {

            "Name": "demo",
            "TargetName": "CloudHub",
            "TargetType": "Started",
            "Status": "Started",
            "RuntimeVersion": "4.6.2:5e",
        }
    ]


    const DrawerData = [
        {

            "Name": "CloudHub",
            "TargetName": "CloudHub",

        },
    ]
    const defaultSortField = 'Name';
    const defaultHeaderBorderWidth = 5;
    const defaultHeaderBorderColor = '#6b8a99';
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [sortField, setSortField] = useState(defaultSortField);
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedHeader, setSelectedHeader] = useState(defaultSortField);
    const [hoveredRow, setHoveredRow] = useState(null);

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortField && sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortField && sortOrder === 'desc') {
            return a[sortField] < b[sortField] ? 1 : -1;
        } else {
            return 0;
        }
    });
    const DreawerSortedData = [...DrawerData].sort((a, b) => {
        if (sortField && sortOrder === 'asc') {
            return a[sortField] > b[sortField] ? 1 : -1;
        } else if (sortField && sortOrder === 'desc') {
            return a[sortField] < b[sortField] ? 1 : -1;
        } else {
            return 0;
        }
    });

    const handleSort = (field) => {
        setSortField(field);
        toggleSortOrder();
        setSelectedHeader(field);
    };

    const headers = [
        'Name',
        'Status',
        'Type',
        'Version',
        'Java',
    ];
    const DrawerHeaders = [
        'Name',
        'Status',

    ];

    const columnTitleStyle = {
        fontSize: 14,
        color: '#444444',
        fontWeight: 800,
        textTransform: 'capitalize',

    };

    const rowValueStyle = { fontSize: 14 };
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };


    const customWidth = "700px";
    const customHeight = "500px";


    const [selectedOption, setSelectedOption] = useState('Deploying');

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const getMenuStyle = (option) => {
        if (option === selectedOption) {
            return {
                borderRightWidth: 3,
                borderRightColor: "boxColor",
                borderLeftWidth: 3,
                borderLeftColor: "boxColor",
                backgroundColor: "gray.900",
                textColor: "boxColor",
                borderBottomWidth: 1,
                borderTopWidth: 1,


            };
        } else {
            return {};
        }
    };



    return (

        <><Flex alignItems="center" gap={4} style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
            <Button colorScheme="blue" size="md" onClick={onOpen}><Text fontSize="xs" p={4}>Add Server</Text></Button>
            <NavLink to="/cloudhub/sandbox/home/servers/serverGroup/create?option=Sandbox">
                <Button variant="homePageButtons" colorScheme="blue" size="md"><Text fontSize="xs">Create Group</Text></Button>
            </NavLink>
            <NavLink to="/cloudhub/sandbox/home/servers/cluster/create?option=Sandbox">
                <Button variant="homePageButtons" colorScheme="blue" size="md"><Text fontSize="xs">Create Cluster</Text></Button>
            </NavLink>
            <InputGroup size='md' flexDirection="column" py={3}>
                <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search Servers' size=' base' height={10} borderRadius={8} />
                <InputRightElement width='4.5rem' pt={6}>
                    <CloseIcon color="formLabelColor" />
                </InputRightElement>
                <InputLeftElement width='2.5rem' pt={6}>
                    <BsSearch />
                </InputLeftElement>
            </InputGroup>
        </Flex>
            <Box style={{ marginRight: isDrawerOpen ? '400px' : 0 }} py={4}>
                <Table >
                    <Thead>
                        <Tr>
                            {headers.map(header => (
                                <Th
                                    key={header}
                                    onClick={() => handleSort(header)}
                                    borderBottomWidth={selectedHeader === header ? defaultHeaderBorderWidth : 1}
                                    borderColor={selectedHeader === header ? defaultHeaderBorderColor : 'inherit'}
                                    style={{ ...columnTitleStyle, borderBottomWidth: 3 }}
                                >
                                    <Flex alignItems="center" gap={3}>
                                        {header}{' '}
                                        {sortField === header && (
                                            <>
                                                {sortOrder === 'asc' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                            </>
                                        )}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedData.map((item) => (
                            <Tr key={item.id} onClick={toggleDrawer}>
                                <Td style={rowValueStyle} _hover={{ color: "boxColor" }}
                                    onMouseEnter={() => setHoveredRow(item)}
                                    onMouseLeave={() => setHoveredRow(null)}><NavLink to={`/cloudhub/sandbox/home/applications/${item.Name}?option=Sandbox`}>
                                        <Flex gap={2} align="center">
                                            {item.Name}
                                            {hoveredRow == !item.Name && <IoArrowRedo />}
                                        </Flex>
                                    </NavLink></Td>
                                <Td style={rowValueStyle} textColor="#18bc65"><Flex gap={2} align="center"><FaCircle color='#18bc65' />{item.Status}</Flex></Td>
                                <Td style={rowValueStyle}><Flex gap={2} align="center"><IoMdCloudOutline style={{ height: 25 }} />{item.TargetName}</Flex></Td>
                                <Td style={rowValueStyle}>{item.TargetType}</Td>

                                <Td style={rowValueStyle}>{item.RuntimeVersion}</Td>

                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            {
                isDrawerOpen && (
                    <Box
                        position="fixed"
                        top="65px"
                        right={0}
                        bottom={0}
                        width={400}
                        bg="Drawerbg"
                        borderWidth={1}
                        zIndex={9999}
                    >
                        <Flex borderRadius="0px" bg="Drawerheadbg" p={8} gap={3} align="center">
                            <IoMdCloudOutline style={{ height: 25, marginLeft: -10 }} />
                            <Flex align="center" gap={150}>
                                <Heading color="#3a3b3c" fontSize="lg " fontWeight="400">demo-mulecraft</Heading>
                                <CloseIcon onClick={toggleDrawer} />
                            </Flex>
                        </Flex>
                        <Stack direction="row" ps={4} py={2} gap={20} alignItems="center">
                            <Stack direction="row" alignItems="center" >
                                {selectedOption === "Deploying" && (
                                    <FaCircle color='#18bc65' />
                                )}
                                {selectedOption === "Update" && (
                                    <Spinner h={3} w={3} color="gray.400" />
                                )}
                                {selectedOption === "Undeployed" && (
                                    <FaRegCircle color='gray' />
                                )}

                                <Menu value={selectedOption} as={Button}>
                                    <MenuButton
                                        as={Button}
                                        variant=""
                                        borderRadius={0}
                                        rightIcon={<TriangleDownIcon color="gray.400" height={3} />}
                                        height="38px"

                                    >
                                        {selectedOption}
                                    </MenuButton>
                                    <MenuList mt="-10" borderWidth={2} borderRadius={0} borderColor="#8a8a8a" borderTopWidth={0}>
                                        <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Deploying')} onClick={() => handleOptionSelect('Deploying')}>Start</MenuItem>
                                        <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Update')} onClick={() => handleOptionSelect('Update')}>Restart</MenuItem>
                                        <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Undeployed')} onClick={() => handleOptionSelect('Undeployed')}>Stop</MenuItem>
                                        <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Deleted')} onClick={() => handleOptionSelect('Deleted')}>Delete</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Stack>
                        </Stack>

                        <Stack ps="55px" direction="row">
                            <Text width={130} fontSize="sm" >Gateway version:</Text>
                            <Text width={160} fontSize="sm">4.6.2</Text>
                        </Stack>
                        <Stack ps="55px" py={2} direction="row">
                            <Text width={130} fontSize="sm" >Agent version:</Text>
                            <Text width={160} fontSize="sm"> 2.6.1</Text>
                        </Stack>
                        <Stack ps={6} pt={5} direction="row" gap={5}>
                            <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                                <Button colorScheme="blue" size="md" borderRadius={5}><Text fontSize="xs">Manage application</Text></Button>
                            </Link>
                            <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                                <Button bg="#6b8a99" size="md" borderRadius={5} _hover={{ bg: '#adbcc3' }}><Text fontSize="xs" textColor="white">View Dashboard</Text></Button>
                            </Link>
                        </Stack>
                        <Box ps={6} py={6}>
                            <Text color="boxColor" fontSize="sm" ml={1} display="inline">
                                <Link>View Associated Alerts</Link>
                            </Text>
                        </Box>
                        <Tabs ps={6} width={385}>
                            <TabList borderBottomWidth={4}>
                                <Tab width={500}>Applications</Tab>
                                <Tab width={500}>Plugins</Tab>

                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Table>
                                        <Thead>
                                            <Tr>
                                                {DrawerHeaders.map(header => (
                                                    <Th
                                                        key={header}
                                                        onClick={() => handleSort(header)}
                                                        borderBottomWidth={selectedHeader === header ? defaultHeaderBorderWidth : 1}
                                                        borderColor={selectedHeader === header ? defaultHeaderBorderColor : 'inherit'}
                                                        style={{ ...columnTitleStyle, borderBottomWidth: 3 }}
                                                    >
                                                        <Flex alignItems="center" gap={3}>
                                                            {header}{' '}
                                                            {sortField === header && (
                                                                <>
                                                                    {sortOrder === 'asc' ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                                                </>
                                                            )}
                                                        </Flex>
                                                    </Th>
                                                ))}
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {DreawerSortedData.map((item) => (
                                                <Tr key={item.id} onClick={toggleDrawer}>
                                                    <Td style={rowValueStyle} _hover={{ color: "boxColor" }}
                                                        onMouseEnter={() => setHoveredRow(item)}
                                                        onMouseLeave={() => setHoveredRow(null)}><NavLink to={`/cloudhub/sandbox/home/applications/${item.Name}?option=Sandbox`}>
                                                            <Flex gap={2} align="center">
                                                                {item.Name}
                                                                {hoveredRow == !item.Name && <IoArrowRedo />}
                                                            </Flex>
                                                        </NavLink></Td>
                                                    <Td style={rowValueStyle} textColor="#18bc65"> <Stack direction="row" ps={4} py={2} gap={20} alignItems="center">
                                                        <Stack direction="row" alignItems="center" >
                                                            {selectedOption === "Deploying" && (
                                                                <FaCircle color='#18bc65' />
                                                            )}
                                                            {selectedOption === "Update" && (
                                                                <Spinner h={3} w={3} color="gray.400" />
                                                            )}
                                                            {selectedOption === "Undeployed" && (
                                                                <FaRegCircle color='gray' />
                                                            )}

                                                            <Menu value={selectedOption} as={Button}>
                                                                <MenuButton
                                                                    as={Button}
                                                                    variant=""
                                                                    borderRadius={0}
                                                                    rightIcon={<TriangleDownIcon color="gray.400" height={3} />}
                                                                    height="38px"

                                                                >
                                                                    {selectedOption}
                                                                </MenuButton>
                                                                <MenuList mt="-10" borderWidth={2} borderRadius={0} borderColor="#8a8a8a" borderTopWidth={0}>
                                                                    <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Deploying')} onClick={() => handleOptionSelect('Deploying')}>Start</MenuItem>
                                                                    <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Update')} onClick={() => handleOptionSelect('Update')}>Restart</MenuItem>
                                                                    <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Undeployed')} onClick={() => handleOptionSelect('Undeployed')}>Stop</MenuItem>
                                                                    <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Deleted')} onClick={() => handleOptionSelect('Deleted')}>Delete</MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Stack>
                                                    </Stack></Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </TabPanel>
                                <TabPanel >
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <InfoOutlineIcon style={{ color: "#6b8a99" }} />
                                        <Text fontSize="xs" textColor="#6b8a99">Configure the plugins in the Manage Server page.</Text>
                                    </Box>
                                    <Stack py={6} direction="row">
                                        <Text width={200} fontSize="md" fontWeight={500} textColor="navText" >Event Tracking</Text>
                                        <Text width={200} fontSize="md" fontWeight={500}>Level: None</Text>
                                    </Stack>
                                    <Stack direction="row">
                                        <Text width={200} fontSize="sm" >ELK</Text>
                                        <Text width={200} fontSize="sm"> Disabled</Text>
                                    </Stack>
                                    <Stack py={2} direction="row">
                                        <Text width={200} fontSize="sm" >Splunk</Text>
                                        <Text width={200} fontSize="sm">  Disabled</Text>
                                    </Stack>
                                    <Stack py={8} direction="row">
                                        <Text width={200} fontSize="md" fontWeight={500}>Agent version:</Text>
                                        <Text width={200} fontSize="md" fontWeight={500}> 2.6.1</Text>
                                    </Stack>
                                    <Stack direction="row">
                                        <Text width={200} fontSize="sm" >ELK</Text>
                                        <Text width={200} fontSize="sm"> Disabled</Text>
                                    </Stack>
                                    <Stack py={2} direction="row">
                                        <Text width={200} fontSize="sm" >Splunk</Text>
                                        <Text width={200} fontSize="sm">  Disabled</Text>
                                    </Stack>
                                </TabPanel>

                            </TabPanels>
                        </Tabs>


                    </Box >
                )
            }
            <Modal isOpen={isOpen} onClose={onClose} isCentered size={""} >
                <ModalOverlay />
                <ModalContent borderRadius="0" width={customWidth} height={customHeight}>
                    <Box bg="#f9fafb " borderRadius="4px">
                        <ModalHeader fontSize="xl" fontWeight="800" textColor="gray.700">Add Server</ModalHeader>
                    </Box>
                    <Divider />
                    <ModalBody p={5}>
                        <Box ps={7} display="flex" flexDirection="column" gap={2}>
                            <Text>First, define a unique name for your server.</Text>
                            <Input value="" variant="custom" borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} borderRadius={5} placeholder='Name' size='sm' height="40px" bgColor="#f4f5f6" />
                        </Box>
                        <Box py={6} ps={7} display="flex" flexDirection="column" gap={2}>
                            <Text>First, define a unique name for your server.</Text>
                            <Box pt={4} backgroundColor="white">
                                <Textarea variant="custom" bgColor="#f4f5f6" value="./amc_setup -H 7eb56820-5e5c-470b-8ec6-0fc4f49d9afb---1014655 server-name" borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} size='sm' height="200px" isDisabled />
                            </Box>
                        </Box>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>

    )

}
