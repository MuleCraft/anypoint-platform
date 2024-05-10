import { Box, Button, ButtonGroup, Checkbox, Divider, Flex, FormControl, Heading, IconButton, Image, Input, InputGroup, InputLeftElement, InputRightElement, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Table, TableContainer, Tabs, Tbody, Td, Text, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdOutlineNotificationsOff } from 'react-icons/md';
import Sidebar from '../../../sidebar';
import { AiOutlineMenuFold } from "react-icons/ai";
import { CloseIcon } from '@chakra-ui/icons';
import { BsSearch } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import "../../../../assets/Common.css";

export const DashboardMain = ({ name }) => {
    const { name: routerName } = useParams();
    const [view, setView] = useState('All');
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isAdvancesOpen, setAdvancesOpen] = useState(false);
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    const toggleAdvancesDrawer = () => {
        setAdvancesOpen(!isAdvancesOpen);
    };
    const [startDate, setStartDate] = useState("");

    return (

        <><Box>
            <Sidebar
                name={name}
                sections={RuntimeDashboardSection}
                activeItem={activeItem}
                onItemSelect={handleItemSelect} />

        </Box>
            <Flex direction="column" w="full" ml="190" mt="65" maxW={1600} position="fixed" borderWidth={1}>
                <Box >
                    <Box p={4}>
                        <Stack direction="row" justifyContent="space-between" align="center">
                            <Flex dir='row' alignItems="center" gap={3}>
                                <FaCircle color='#18bc65' />  <Text fontSize="lg" textColor="navText">{routerName}</Text>
                            </Flex>
                            <Flex dir='row' alignItems="center" gap={3}>

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
            </Flex>



        </>

    )
}
