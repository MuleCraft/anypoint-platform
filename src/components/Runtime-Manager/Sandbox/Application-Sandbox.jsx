import { Box, Button, Text, VStack, Image, Flex, InputGroup, Input, InputRightElement, InputLeftElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Stack, Table, Thead, Tr, Th, Tbody, Td, Heading, MenuDivider } from "@chakra-ui/react"
import muleAvator from "/Images/Logo.svg"
import Notify from "/Images/RTpreload.webp"
import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons"
import { IoNotificationsOutline } from "react-icons/io5";
import SelectComponent from "../../SelectedComponent";
import { AppStatus, RMChannel, RMModel } from "./SelectMenuDatas/DeploymentTarget";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { FaCircle } from "react-icons/fa6";
import { IoMdCloudOutline } from "react-icons/io";
import { IoArrowRedo } from "react-icons/io5";
import SelectedComponent from "../../SelectedComponent";

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

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleMenuItemClick = (menuItem) => {
        console.log(`Clicked on ${menuItem}`);

    };

    return (
        <>
            {Application === 0 && (
                <Box width="80vw" height="45vh" display="flex" alignItems="center" justifyContent="center">
                    <VStack spacing={4} alignItems="center" justifyContent="center">
                        <Box as={Image} src={muleAvator} width={100} />
                        <Text fontSize="xl" fontWeight="500" color="gray.300">There are no applications to show</Text>\
                        <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                            <Button colorScheme="blue" size="md"><Text fontSize="xs">Deploy application</Text></Button>
                        </Link>
                    </VStack>
                </Box>
            )}
            {Application === 1 && (
                <><Flex alignItems="center" gap={4} style={{ marginRight: isDrawerOpen ? '400px' : 0 }}>
                    <Link to="/cloudhub/sandbox/home/applications/addapplication?option=Sandbox">
                        <Button colorScheme="blue" size="md"><Text fontSize="xs">Deploy application</Text></Button>
                    </Link>
                    <InputGroup size='md' flexDirection="column" py={3}>
                        <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Search Application' size='sm' height={10} borderRadius={8} />
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
                                <Text fontSize="sm" fontWeight="500" color="gray.300">No unread notifications to show</Text>
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
                                            onMouseLeave={() => setHoveredRow(null)}><NavLink to={`/accounts/users/`}>
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
                    <Stack direction="row" p={5}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={toggleMenu}
                                style={{
                                    padding: '8px',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                File
                            </button>
                            {isOpen && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '40px', // Adjust the top position as needed
                                        left: '0',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #cccccc',
                                        borderRadius: '4px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        zIndex: '999',
                                        minWidth: '120px', // Adjust the width as needed
                                    }}
                                >
                                    <div
                                        onClick={() => handleMenuItemClick('New File')}
                                        style={{
                                            padding: '8px',
                                            cursor: 'pointer',

                                        }}
                                    >
                                        New File
                                    </div>
                                    <div
                                        onClick={() => handleMenuItemClick('New Window')}
                                        style={{
                                            padding: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        New Window
                                    </div>
                                    <div style={{ borderTop: '1px solid #cccccc' }} />
                                    <div
                                        onClick={() => handleMenuItemClick('Open...')}
                                        style={{
                                            padding: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Open...
                                    </div>
                                    <div
                                        onClick={() => handleMenuItemClick('Save File')}
                                        style={{
                                            padding: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Save File
                                    </div>
                                </div>
                            )}
                        </div>
                    </Stack>


                </Box >
            )}
        </>
    )
}
