import { Box, Button, ButtonGroup, Checkbox, Divider, Flex, FormControl, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import SelectComponent from '../../../SelectComponent';
import { env, options, versions } from '../SelectMenuDatas/DeploymentTarget';
import { useRef, useState } from 'react';
import { InfoOutlineIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { BsSearch } from 'react-icons/bs';
import { RuntimeSettings } from './TablePanelsSettings/Runtime';
import { PropertiesSettings } from './TablePanelsSettings/Properties';
import { IngressSettings } from './TablePanelsSettings/Insight';
import { LoggingSettings } from './TablePanelsSettings/Logging';
import { StaticIPsSettings } from './TablePanelsSettings/StaticIPs';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import Sidebar from '../../../sidebar';
export const DashboardMain = ({ name }) => {
    const { name: routerName } = useParams();
    const fileInputRef = useRef(null);
    const [selectedJar, setSelectedJar] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure();
    const customWidth = "800px";
    const customHeight = "650px";
    const [value, setValue] = useState('1')
    const columnTitleStyle = { fontSize: 14, color: '#686868', fontWeight: 800, textTransform: 'capitalize', padding: 15 };
    const rowValueStyle = { fontSize: 14, padding: 17, };
    const navigate = useNavigate();
    const handleChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setSelectedJar(selectedFile.name);
        }
    };
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
    console.log(selectedRow)
    const [view, setView] = useState('All');
    const [selectedOption, setSelectedOption] = useState('Stop');

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
    const RuntimeDashboardSection = [
        {
            items: [
                { name: 'Dashboard', label: 'Dashboard', path: `/cloudhub/sandbox/home/applications/${routerName}?option=Sandbox` },
                { name: 'Logs', label: 'Logs', path: `/cloudhub/sandbox/home/applications/${routerName}/logging?option=Sandbox` },
                { name: 'Settings', label: 'Settings', path: `/cloudhub/sandbox/home/applications/${routerName}/settings?option=Sandbox` },
            ],
        },
    ];

    const [activeItem, setActiveItem] = useState('Dashboard');
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    return (

        <><Box>
            <Sidebar
                name={name}
                sections={RuntimeDashboardSection}
                activeItem={activeItem}
                onItemSelect={handleItemSelect} />

        </Box>
            <Flex direction="column" w="full" ml="200" mt="75" maxW={1580}>

                <Box>
                    <Box p={4}>
                        <Stack direction="row" justifyContent="space-between" align="center">
                            <Flex dir='row' alignItems="center" gap={3}>
                                <FaCircle color='#18bc65' />  <Text fontSize="lg" textColor="navText">{routerName}</Text>
                            </Flex>
                            <Flex gap={4}>
                                <Flex>
                                    <Stack direction="row" alignItems="center">
                                        <Menu value={selectedOption} as={Button}>
                                            <MenuButton
                                                as={Button}
                                                variant=""
                                                borderRadius={0}
                                                borderWidth={1}
                                                color="gray.700"
                                                rightIcon={<TriangleDownIcon color="gray.400" height={3} />}
                                                height="38px"

                                            >
                                                {selectedOption}
                                            </MenuButton>
                                            <MenuList borderWidth={1} borderRadius={0} borderColor="#8a8a8a">
                                                <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Deploying')} onClick={() => handleOptionSelect('Start')}>Start</MenuItem>
                                                <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Stop')} onClick={() => handleOptionSelect('Stop')}>Stop</MenuItem>
                                                <MenuItem textColor="gray.900" fontSize=" base" _hover={{ backgroundColor: "#fff", textColor: "boxColor", borderRightColor: "boxColor", borderLeftColor: "boxColor", }} style={getMenuStyle('Delete')} onClick={() => handleOptionSelect('Deleted')}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Stack>
                                </Flex>
                                <Flex>
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
                                            iconSize="1.5em" />
                                        <MenuList width="500px">
                                            <VStack spacing={3} justifyContent="center">
                                                <Box mr="60">
                                                    <ButtonGroup isAttached variant="outline">
                                                        <Button
                                                            borderRadius="0"
                                                            borderWidth={2}
                                                            color="gray"
                                                            variant={view === 'Current' ? 'outline' : 'solid'}
                                                            onClick={() => setView('Current')}
                                                            fontSize="xs"
                                                            height={5}
                                                        >
                                                            Current Application
                                                        </Button>
                                                        <Button
                                                            borderRadius="0"
                                                            borderWidth={2}
                                                            color="#414141"
                                                            variant={view === 'All' ? 'outline' : 'solid'}
                                                            onClick={() => setView('All')}
                                                            fontSize="xs"
                                                            height={5}
                                                        >
                                                            All
                                                        </Button>
                                                    </ButtonGroup>
                                                </Box>
                                                <Flex alignItems="center" gap={6} p={4}>
                                                    <MdOutlineNotificationsOff style={{ height: 150, width: 60, color: "gray" }} />
                                                    <Text fontSize="xl" fontWeight="500" color="gray">No unread notifications to show</Text>
                                                </Flex>
                                                <Text color="boxColor" fontSize="xs" ml={1} display="inline">
                                                    <Link>Show all notifications</Link>
                                                </Text>
                                                <Flex gap={4}>
                                                    <Text fontSize="xs" fontWeight="500" color="gray.400">0 unread in this app</Text>
                                                    <Text fontSize="xs" fontWeight="500" color="gray.400">0 unread in all apps</Text>
                                                </Flex>
                                            </VStack>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Flex>
                        </Stack>
                    </Box>
                    <Box p={4}>
                        <Stack direction={['column', 'row']} spacing='4' alignItems="center">
                            <Box width="35%" py={2}>
                                <Text fontSize="sm" color="navText">Application File</Text>
                                <Input variant='filled' value={selectedJar} borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='No file has been loaded' size='sm' height="40px" isReadOnly bgColor="#f4f5f6" />
                            </Box>
                            <Box width="10%" pt={6}>
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
                                    <MenuList borderRadius={0} borderWidth={1} borderColor="gray.400">
                                        <MenuItem
                                            borderBottomWidth={1}
                                            borderColor="gray.400"
                                            textColor="gray.500"
                                            fontSize="sm"
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
                                            fontSize="sm"
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
                                    accept=".jar" />
                                <Modal isOpen={isOpen} onClose={onClose} isCentered size={"6xl"}>
                                    <ModalOverlay />
                                    <ModalContent borderRadius="0" width={customWidth} height={customHeight}>
                                        <Box bg="#f9fafb " borderRadius="4px">
                                            <ModalHeader fontSize="xl" fontWeight="200" textColor="gray.500">Get from Exchange</ModalHeader>
                                        </Box>
                                        <Divider />
                                        <ModalBody>
                                            <FormControl id="email">
                                                <Text fontSize="sm" textColor="gray.500">Type</Text>
                                                <RadioGroup onChange={setValue} value={value}>
                                                    <Stack direction='row' gap="10" py={2}>
                                                        <Radio value='1' Color="gray.500">Application</Radio>
                                                        <Radio value='2' Color="gray.500">Example</Radio>

                                                    </Stack>
                                                </RadioGroup>
                                                <InputGroup size='md' flexDirection="column" py={3}>
                                                    <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search asset by name' size='sm' height={10} />
                                                    <InputRightElement width='4.5rem' pt={6}>
                                                        <BsSearch />
                                                    </InputRightElement>
                                                </InputGroup>
                                            </FormControl>
                                            <Box height="200px" width="750px" borderWidth="1px" borderColor="gray.200">
                                                <TableContainer p={2}>
                                                    <Table size='sm'>
                                                        <Thead>
                                                            <Tr>
                                                                <Th style={columnTitleStyle}>Name</Th>
                                                                <Th style={columnTitleStyle}>Organization</Th>
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
                                                                    <Td style={rowValueStyle}>View in Exchange</Td>
                                                                </Tr>
                                                            ))}
                                                        </Tbody>

                                                    </Table>
                                                </TableContainer>

                                            </Box>
                                            <Box py={4}>
                                                <Text fontSize="sm" textColor="gray.500">Version</Text>

                                                <SelectComponent options={versions} selectedRow={selectedRow} />

                                            </Box>
                                            <Box>
                                                <Text fontSize="xs" textColor="boxColor"><InfoOutlineIcon /> Select an asset and asset version to continue.</Text>
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
                            <Box width="10%" ml="-5" pt={6}>
                                <Button variant="outline" backgroundColor="gray.100" onClick={onOpenOne} fontSize="xs" borderRadius={0} borderColor="gray.400">Get from sandbox</Button>
                                <Modal isOpen={isOpenOne} onClose={onCloseOne} isCentered size={"6xl"}>
                                    <ModalOverlay />
                                    <ModalContent borderRadius="0" width={customWidth} height={customHeight}>
                                        <Box bg="#f9fafb " borderRadius="4px">
                                            <ModalHeader fontSize="xl" fontWeight="200" textColor="gray.500">Get from sandbox</ModalHeader>
                                        </Box>
                                        <Divider />
                                        <ModalBody>
                                            <FormControl id="email">
                                                <Text fontSize="sm" textColor="gray.500" pb={4}>Environment</Text>
                                                <SelectComponent options={env} />
                                                <InputGroup size='md' flexDirection="column" py={3}>
                                                    <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search asset by name' size='sm' height={10} />
                                                    <InputLeftElement width='2.5rem' pt={6}>
                                                        <BsSearch />
                                                    </InputLeftElement>
                                                </InputGroup>
                                            </FormControl>
                                            <Box height="200px" width="750px" borderWidth="1px" borderColor="gray.200">
                                                <TableContainer p={2}>
                                                    <Table size='sm'>
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
                                            <Checkbox size='lg' color="boxColor" defaultChecked py={5}>
                                                <Text fontSize="14"> Select an asset and asset version to continue.</Text>
                                            </Checkbox>

                                        </ModalBody>
                                        <Divider />
                                        <ModalFooter gap={5}>
                                            <Button variant="outline" onClick={onCloseOne} borderRadius={0}>Close</Button>
                                            <Button variant="formButtons" borderRadius={0} isDisabled={selectedRow === null}>
                                                Select
                                            </Button>
                                        </ModalFooter>

                                    </ModalContent>
                                </Modal>
                            </Box>
                        </Stack>
                        <Stack direction="row"><Text fontSize="xs" fontWeight="600">Last Updated</Text> <Text fontSize="xs">2024-05-06 17:27:29</Text></Stack>
                        <Stack py={1} direction="row"><Text fontSize="xs" fontWeight="600">App url</Text> <Link href="https://mule-testing.us-e2.cloudhub.io/" target="_blank"><Text fontSize="xs" textColor="boxColor">mule-testing.us-e2.cloudhub.io</Text> </Link></Stack>
                    </Box>
                    <Box py={10}>
                        <Tabs position='relative' variant='unstyled'>
                            <TabList borderBottomWidth={3}>
                                <Tab width="20%">Runtime</Tab>
                                <Tab width="20%">Properties</Tab>
                                <Tab width="20%">Insight</Tab>
                                <Tab width="20%">Logging</Tab>
                                <Tab width="20%">Static IPs</Tab>
                            </TabList>
                            <TabIndicator mt='-1.5px' height='2px' bg='blue.500' borderRadius='1px' />
                            <TabPanels>
                                <TabPanel>
                                    <RuntimeSettings />
                                </TabPanel>
                                <TabPanel>
                                    <PropertiesSettings />
                                </TabPanel>
                                <TabPanel>
                                    <IngressSettings />
                                </TabPanel>
                                <TabPanel>
                                    <LoggingSettings />
                                </TabPanel>
                                <TabPanel>
                                    <StaticIPsSettings />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                    <Box py={10} justifyContent="space-between" display="flex" maxW="1560">
                        <Box></Box>
                        <Button variant="formButtons" borderRadius={0} isDisabled>
                            Apply Changes
                        </Button>
                    </Box>
                </Box>
            </Flex></>

    )
}
