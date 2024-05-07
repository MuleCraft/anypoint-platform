import { Box, Button, Text, VStack, Image, Flex, InputGroup, Input, InputRightElement, InputLeftElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Stack, Table, Thead, Tr, Th, Tbody, Td, Heading, MenuDivider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalBody, FormControl, RadioGroup, Radio, TableContainer, ModalFooter, Link, Spinner } from "@chakra-ui/react"
import muleAvator from "/Images/Logo.svg"
import Notify from "/Images/RTpreload.webp"
import { BsSearch } from "react-icons/bs";
import { CloseIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { IoNotificationsOutline } from "react-icons/io5";
import SelectComponent from "../../SelectedComponent";
import { RMChannel, RMModel } from "./SelectMenuDatas/DeploymentTarget";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
import { IoMdCloudOutline } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
import { FaRegCircle } from "react-icons/fa";
import { AiOutlineCloudServer } from "react-icons/ai";
export const RuntimeApplicationSandbox = () => {
    const Application = 1
    const data = [
        {

            "Name": "CloudHub",
            "TargetName": "CloudHub",
            "TargetType": "",
            "Status": "Started",
            "RuntimeVersion": "4.6.2:5e",
            "UpdateAvailable": "None",
            "DateModified": "2024-04-18 16:16:31"
        },
        {

            "Name": "demo",
            "TargetName": "CloudHub",
            "TargetType": "Started",
            "Status": "Started",
            "RuntimeVersion": "4.6.2:5e",
            "UpdateAvailable": "None",
            "DateModified": "2024-04-18 16:16:31"
        }
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

    const handleSort = (field) => {
        setSortField(field);
        toggleSortOrder();
        setSelectedHeader(field);
    };

    const headers = [
        'Name',
        'Target Name',
        'Target Type',
        'Status',
        'Runtime Version',
        'Update Available',
        'Date Modified',
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
    const fileInputRef = useRef(null);
    const [selectedJar, setSelectedJar] = useState("");
    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedJar(selectedFile.name);
        }
    };
    const customWidth = "800px";
    const customHeight = "650px";
    const [value, setValue] = useState('1')
    const tableData = [
        { name: "Manufacturing SAP HANA Event Listener", organization: "Mulecraft" },
        { name: "Another Row", organization: "Organization 2" },
    ];

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

    const isSelected = (index) => {
        return index === selectedRow;
    };

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
        <>
            {Application === 0 && (
                <Box width="80vw" height="45vh" display="flex" alignItems="center" justifyContent="center">
                    <VStack spacing={4} alignItems="center" justifyContent="center">
                        <Box as={Image} src={muleAvator} width={100} />
                        <Text fontSize="xl" fontWeight="500" color="gray.300">There are no applications to show</Text>\
                        <NavLink to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                            <Button colorScheme="blue" size="md"><Text fontSize="xs">Deploy application</Text></Button>
                        </NavLink>
                    </VStack>
                </Box>
            )}
            {Application === 1 && (
                <><Flex alignItems="center" gap={4} style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
                    <NavLink to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                        <Button colorScheme="blue" size="md"><Text fontSize="xs">Deploy application</Text></Button>
                    </NavLink>
                    <InputGroup size='md' flexDirection="column" py={3}>
                        <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search Application' size=' base' height={10} borderRadius={8} />
                        <InputRightElement width='4.5rem' pt={6}>
                            <CloseIcon color="formLabelColor" />
                        </InputRightElement>
                        <InputLeftElement width='2.5rem' pt={6}>
                            <BsSearch />
                        </InputLeftElement>
                    </InputGroup>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            rounded="full"
                            variant="link"
                            cursor="pointer"
                            minW={8}
                            borderRadius="full"
                            px="10px"
                            py="10px"
                            _hover={{ textDecoration: "none", bgColor: "#eaeaea" }}
                            _active={{ color: "#ff" }}
                            icon={<IoNotificationsOutline />}
                            iconSize="1.5em"
                        />
                        <MenuList width="500px">
                            <VStack spacing={1} alignItems="center" justifyContent="center">
                                <Box as={Image} src={Notify} width={140} />
                                <Text fontSize=" base" fontWeight="500" color="gray.300">No unread notifications to show</Text>
                                <Text color="boxColor" fontSize="xs" ml={1} display="inline">
                                    <Link>Show all notifications</Link>
                                </Text>
                                <Text fontSize="xs" fontWeight="500" color="gray.300">0 unread in all apps</Text>
                            </VStack>
                        </MenuList>
                    </Menu>
                </Flex>
                    <Stack flexDirection="row" justifyContent="space-between" py={5} style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
                        <Stack width={500} flexDirection="row">
                            <Box width={250}>
                                <SelectComponent options={RMModel} />
                            </Box>
                            <Box width={250}>
                                <SelectComponent options={RMChannel} />
                            </Box>
                        </Stack>
                        <Link> <Text fontSize="xs">Clear filters</Text></Link>
                    </Stack>

                    <Box style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
                        <Table>
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
                                        <Td style={rowValueStyle}><Flex gap={2} align="center"><IoMdCloudOutline style={{ height: 25 }} />{item.TargetName}</Flex></Td>
                                        <Td style={rowValueStyle}>{item.TargetType}</Td>
                                        <Td style={rowValueStyle} textColor="#18bc65"><Flex gap={2} align="center"><FaCircle color='#18bc65' />{item.Status}</Flex></Td>
                                        <Td style={rowValueStyle}>{item.RuntimeVersion}</Td>
                                        <Td style={rowValueStyle}>{item.UpdateAvailable}</Td>
                                        <Td style={rowValueStyle}>{item.DateModified}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </>
            )}
            {isDrawerOpen && (
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
                    <Stack direction="row" p={5} gap={20} alignItems="center">
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
                        <Stack direction="row" alignItems="center" gap={4}>
                            <AiOutlineCloudServer />
                            <Text>Cloudhub</Text>
                        </Stack>
                    </Stack>
                    <Stack direction="row" p={5} alignItems="center" gap={3}>
                        <Box width={220}>
                            <Input bgColor="#ffff" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search Application' size=' base' height={10} borderRadius={8} value="mulecraft-demo-project-1.0.0-SNAPSHOT-mule-application.jar" />
                        </Box>
                        <Box width="10%">
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    variant="outline"
                                    borderRadius={0}
                                    borderColor="gray.400"
                                    rightIcon={<TriangleDownIcon color="gray.400" height={3} />}
                                    height="38px"
                                    backgroundColor="gray.100"
                                    _hover={{
                                        backgroundColor: "gray.100",
                                    }}
                                >
                                    <Text fontSize="xs">Choose file</Text>
                                </MenuButton>
                                <MenuList borderRadius={0} borderWidth={1} borderColor="gray.400" >
                                    <MenuItem
                                        borderBottomWidth={1}
                                        borderColor="gray.400"
                                        textColor="gray.500"
                                        fontSize=" base"
                                        onClick={onOpen}
                                        _hover={{
                                            borderRightWidth: 1.5,
                                            borderRightColor: "boxColor",
                                            borderLeftWidth: 1.5,
                                            borderLeftColor: "boxColor",
                                            backgroundColor: "gray.200",
                                            textColor: "boxColor"
                                        }}
                                    >
                                        Import file from Exchange
                                    </MenuItem>
                                    <MenuItem
                                        textColor="gray.500"
                                        fontSize=" base"
                                        onClick={handleChooseFile}
                                        _hover={{
                                            borderRightWidth: 1.5,
                                            borderRightColor: "boxColor",
                                            borderLeftWidth: 1.5,
                                            borderLeftColor: "boxColor",
                                            backgroundColor: "gray.200",
                                            textColor: "boxColor"
                                        }}
                                    >
                                        Upload file
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                accept=".jar"
                            />
                            <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"} >
                                <ModalOverlay />
                                <ModalContent borderRadius="0" width={customWidth} height={customHeight}>
                                    <Box bg="#f9fafb " borderRadius="4px">
                                        <ModalHeader fontSize="xl" fontWeight="200" textColor="gray.500">Get from Exchange</ModalHeader>
                                    </Box>
                                    <Divider />
                                    <ModalBody>
                                        <FormControl >
                                            <Text fontSize=" base" textColor="gray.500">Type</Text>
                                            <RadioGroup onChange={setValue} value={value} >
                                                <Stack direction='row' gap="10" py={2}>
                                                    <Radio value='1' Color="gray.500">Application</Radio>
                                                    <Radio value='2' Color="gray.500">Example</Radio>
                                                </Stack>
                                            </RadioGroup>
                                            <InputGroup size='md' flexDirection="column" py={3}>
                                                <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search asset by name' size=' base' height={10} />
                                                <InputRightElement width='4.5rem' pt={6}>
                                                    <BsSearch />
                                                </InputRightElement>
                                            </InputGroup>
                                        </FormControl>
                                        <Box height="200px" width="750px" borderWidth="1px" borderColor="gray.200">
                                            <TableContainer p={2}>
                                                <Table size=' base'>
                                                    <Thead>
                                                        <Tr>
                                                            <Th style={columnTitleStyle}>Name</Th>
                                                            <Th style={columnTitleStyle}>File</Th>
                                                            <Th style={columnTitleStyle}></Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        {tableData.map((rowData, index) => (
                                                            <Tr key={index} onClick={() => handleRowClick(index)} bg={isSelected(index) ? "gray.100" : ""}
                                                                borderRightWidth={isSelected(index) ? "2px" : ""}
                                                                borderLeftWidth={isSelected(index) ? "2px" : ""}
                                                                borderColor={isSelected(index) ? "blue.500" : ""}>
                                                                <Td style={rowValueStyle}>{rowData.name}</Td>
                                                                <Td style={rowValueStyle}>{rowData.organization}</Td>

                                                            </Tr>
                                                        ))}
                                                    </Tbody>

                                                </Table>
                                            </TableContainer>

                                        </Box>

                                    </ModalBody>
                                    <Divider />
                                    <ModalFooter gap={5}>
                                        <Button variant="outline" onClick={onClose} borderRadius={0}>Close</Button>
                                        <Button variant="outline" borderRadius={0}>
                                            Select
                                        </Button>
                                    </ModalFooter>

                                </ModalContent>
                            </Modal>
                        </Box>

                    </Stack>
                    <Stack ps={6} direction="row"><Text fontSize="xs" fontWeight="600">Last Updated</Text> <Text fontSize="xs">2024-05-06 17:27:29</Text></Stack>
                    <Stack ps={6} py={1} direction="row"><Text fontSize="xs" fontWeight="600">App url</Text> <Link href="https://mule-testing.us-e2.cloudhub.io/" target="_blank"><Text fontSize="xs" textColor="boxColor">mule-testing.us-e2.cloudhub.io</Text> </Link></Stack>
                    <Stack ps={12} pt={10}  >
                        <Stack direction="row" gap={5}>
                            <Text fontSize=" base" >
                                Runtime Version:</Text>
                            <Text fontSize=" base" >4.6-e-java8</Text>
                        </Stack>
                        <Stack direction="row" gap={5}>
                            <Text fontSize=" base" >
                                Worker size:</Text>
                            <Text fontSize=" base" >0.1 vCores</Text>
                        </Stack>
                        <Stack direction="row" gap={5}>
                            <Text fontSize=" base" >
                                Workers:</Text>
                            <Text fontSize=" base" >1</Text>
                        </Stack>
                        <Stack direction="row" gap={5}>
                            <Text fontSize=" base" >
                                Region:</Text>
                            <Text fontSize=" base" >US East (Ohio)</Text>
                        </Stack>
                    </Stack>
                    <Stack ps={6} pt={10} direction="row" gap={5}>
                        <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                            <Button colorScheme="blue" size="md"><Text fontSize="xs">Manage application</Text></Button>
                        </Link>
                        <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                            <Button variant="homePageButtons" colorScheme="blue" size="md"><Text fontSize="xs">Logs</Text></Button>
                        </Link>
                    </Stack>
                    <Box ps={6} py={8}>
                        <Text color="boxColor" fontSize="base" ml={1} display="inline">
                            <Link>View Associated Alerts</Link>
                        </Text>
                    </Box>

                </Box >
            )}
        </>
    )
}
