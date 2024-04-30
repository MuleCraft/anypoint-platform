import { Box, Button, Text, VStack, Image, Flex, InputGroup, Input, InputRightElement, InputLeftElement, Menu, MenuButton, IconButton, MenuList, MenuItem, Stack } from "@chakra-ui/react"
import muleAvator from "/Images/Logo.svg"
import Notify from "/Images/RTpreload.webp"
import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons"
import { IoNotificationsOutline } from "react-icons/io5";
import SelectComponent from "../../SelectedComponent";
import { RMChannel, RMModel } from "./SelectMenuDatas/DeploymentTarget";
import TableOrder from "./DeployTable/TableOrder";

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
                <><Flex alignItems="center" gap={4}>
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
                </Flex><Stack flexDirection="row" justifyContent="space-between" py={5}>
                        <Stack width={500} flexDirection="row">
                            <Box width={250}>
                                <SelectComponent options={RMModel} />
                            </Box>
                            <Box width={250}>
                                <SelectComponent options={RMChannel} />
                            </Box>
                        </Stack>
                        <Link> <Text fontSize="xs">Clear filters</Text></Link>
                    </Stack><Box>
                        <TableOrder
                            data={data}
                            defaultSortField="name"
                            selectedHeaderBorderWidth={5}
                            selectedHeaderBorderColor="blue" />
                    </Box></>

            )}
        </>
    )
}
