import { Box, Button, ButtonGroup, Checkbox, Divider, Flex, FormControl, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { TriangleDownIcon } from '@chakra-ui/icons';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import Sidebar from '../../../sidebar';
export const DashboardMain = ({ name }) => {
    const { name: routerName } = useParams();
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
                { name: 'Logs', label: 'Logs', path: `/cloudhub/sandbox/home/applications/${routerName}/settings?option=Sandbox` },
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

                </Box>
            </Flex></>

    )
}
