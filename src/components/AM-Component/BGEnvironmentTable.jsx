import { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    VStack,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    ModalContent,
    Flex,
    Box,
    Divider,
    FormControl,
    RadioGroup,
    useDisclosure,
    Stack,
    HStack,
    Radio,
    Text,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useToast,
    FormErrorMessage,
} from "@chakra-ui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import supabase from "../../Utils/supabase";
import { FiSearch } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import EmptyRows from "./EmptyRows";
const BGEnvironmentTable = ({ tableData, userData, id }) => {
    const toast = useToast();
    const [ownerData, setOwnerData] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [selectedEnvironment, setSelectedEnvironment] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isDetailModalOpen,
        onOpen: onDetailModalOpen,
        onClose: onDetailModalClose,
    } = useDisclosure();

    useEffect(() => {
        const fetchBusinessGroups = async () => {
            const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("businessgroup")
                .select("*")
                .eq("businessGroupName", userData.company);

            if (error) {
                console.error("Error fetching business groups:", error);
            } else {
                setOwnerData(data[0]);
            }
        };

        if (userData) {
            fetchBusinessGroups();
        }
    }, [userData.company]);

    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [selectedBusinessGroupId, setSelectedBusinessGroupId] = useState(null);
    const [inputValue, setInputValue] = useState("");

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setInputValue("");
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const [hoveredRows, setHoveredRows] = useState([]);
    const rows = tableData || [];

    const handleRowHover = (index) => {
        setHoveredRows((prevHoveredRows) => {
            const newHoveredRows = [...prevHoveredRows];
            newHoveredRows[index] = true;
            return newHoveredRows;
        });
    };

    const handleRowNotHover = (index) => {
        setHoveredRows((prevHoveredRows) => {
            const newHoveredRows = [...prevHoveredRows];
            newHoveredRows[index] = false;
            return newHoveredRows;
        });
    };

    const columnTitleStyle = {
        fontSize: 14,
        color: "#444444",
        fontWeight: 800,
        textTransform: "capitalize",
        padding: "10px",
    };
    const rowValueStyle = { fontSize: 14, padding: "10px" };

    const handleMenuOpen = (businessGroupId) => {
        setSelectedBusinessGroupId(businessGroupId);
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    const handleRowClick = (environment) => {
        setSelectedEnvironment(environment);
        onDetailModalOpen();
    };

    const handleDeleteOpen = (environment) => {
        setSelectedEnvironment(environment);
        onDetailModalClose(false)
        setDeleteOpen(true);
    };



    const filteredTableData = tableData
        .map((data, index) => ({
            ...data,
            environments: data.environments
                .filter(env => env.envType !== null)
                .map((env, envIndex) => ({
                    ...env,
                    parentIndex: index,
                    envIndex: envIndex
                }))
        }))
        .filter(data => data.businessGroupId === id &&
            data.environments.some(env =>
                env.envName.toLowerCase().includes(filterText.toLowerCase())
            )
        );
    const [envName, setEnvName] = useState("");
    const [envType, setEnvType] = useState("Design");
    const [nameError, setNameError] = useState("");
    const [showPassword, setShowPassowrd] = useState(false)
    const handleClickPassword = () => setShowPassowrd(!showPassword)

    const handleUpdateEnvironment = async () => {
        const updatedEnvironments = tableData.map((data) => {
            if (data.businessGroupId === id) {
                return {
                    ...data,
                    environments: data.environments.map((env) => {
                        if (env.envId === selectedEnvironment.envId) {
                            return { ...env, envName: selectedEnvironment.envName };
                        }
                        return env;
                    }),
                };
            }
            return data;
        });
        const UpdateValue = updatedEnvironments[0].environments;

        const { error } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .update({ environments: UpdateValue })
            .eq("businessGroupId", id);

        if (error) {
            console.error("Error updating environment:", error);
        } else {
            toast({
                title: "Environment Updated",
                description: "",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        onDetailModalClose();
    };

    const handleDeleteEnvironment = async () => {
        if (selectedEnvironment) {
            const { envId } = selectedEnvironment;
            const updatedEnvironments = tableData.map((data) => {
                if (data.businessGroupId === id) {
                    const filteredEnvironments = data.environments.filter(env => env.envId !== envId);
                    return { ...data, environments: filteredEnvironments };
                }
                return data.businessGroupId === id;
            });


            const UpdateValue = updatedEnvironments[0].environments;

            const { error } = await supabase
                .schema("mc_cap_develop")
                .from("businessgroup")
                .update({ environments: UpdateValue })
                .eq("businessGroupId", id);

            if (error) {
                console.error("Error updating environment:", error);
            } else {
                toast({
                    title: "Environment Updated",
                    description: "",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                    position: "top-right"
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }

            onDetailModalClose();
        }
    };

    const handleCreateEnvironment = async () => {
        if (!envName) {
            setNameError("required");
            return;
        }
        const envId = uuidv4();
        const envClientId = uuidv4().replace(/-/g, "");
        const envClientSecret = uuidv4().replace(/-/g, "");

        const newEnvironment = {
            envId: envId,
            envName: envName,
            envType: envType,
            envClientId: envClientId,
            envClientSecret: envClientSecret
        };

        const updatedEnvironments = tableData.map((data) => {
            if (data.businessGroupId === id) {
                return {
                    ...data,
                    environments: [...data.environments, newEnvironment]
                };
            }
            return data;
        });

        const UpdateValue = updatedEnvironments.find(data => data.businessGroupId === id).environments;

        const { error } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .update({ environments: UpdateValue })
            .eq("businessGroupId", id);

        if (error) {
            console.error("Error creating environment:", error);
        } else {
            toast({
                title: "Environment Created",
                description: "",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top-right"
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }

        setEnvName("");
        setEnvType("Design");
        setNameError("");
        onClose();
    };





    return (
        <>
            <Stack mt={"15px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={6}>
                    <Button colorScheme="blue" onClick={onOpen} fontSize="14px" fontWeight={600} variant="formButtons" minW={'fit-content'}>
                        Create environment
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={3}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Add environment
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody p={8}>
                                <FormControl id="name" pb={5} isInvalid={!!nameError}>
                                    <FormLabel fontSize="sm" fontWeight="400">Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={envName}
                                        onChange={(e) => setEnvName(e.target.value)}
                                        placeholder="Environment name"
                                    />
                                    {nameError && <FormErrorMessage>{nameError}</FormErrorMessage>}
                                </FormControl>
                                <FormControl id="type">
                                    <FormLabel fontSize="sm" fontWeight="400">Type</FormLabel>
                                    <RadioGroup onChange={setEnvType} value={envType}>
                                        <Stack direction='row' gap={5}>
                                            <Radio size="lg" borderColor="black" borderWidth={1} value='Design'><Text fontSize="sm">Design</Text></Radio>
                                            <Radio size="lg" borderColor="black" borderWidth={1} value='Sandbox'><Text fontSize="sm">Sandbox</Text></Radio>
                                            <Radio size="lg" borderColor="black" borderWidth={1} value='Production'><Text fontSize="sm">Production</Text></Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={handleCreateEnvironment} colorScheme="blue">
                                    Create
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Environments are isolated scopes within a business group for deploying applications and APIs. Some permissions must be applied to a specific environment.
                        <Link
                            color={"#0176d3"}
                            textDecoration={"underline"}
                            href="https://docs.mulesoft.com/access-management/business-groups"
                            target="_blank"
                        >
                            Learn more
                        </Link>
                    </Text>
                </HStack>
                {/* <Flex gap={10} alignItems="center"> */}
                    <InputGroup maxW="-webkit-fit-content">
                        <InputLeftElement
                            pointerEvents="none"
                            top={4}
                            left={4}
                            children={<FiSearch color="gray" />} />
                        <Input
                            placeholder="Filter environments"
                            value={filterText}
                            onChange={handleFilterChange}
                            my={4}
                            ml={4}
                            fontSize="14px"
                            fontWeight={500} />
                    </InputGroup>
                {/* </Flex> */}
            </Stack>
            {filteredTableData.length === 0 ? (
                <EmptyRows message={'No data to show'} />
            ) : (
                <TableContainer px={5}>
                    <Table>
                        <Thead borderBottomWidth="3px">
                            <Tr>
                                <Th style={columnTitleStyle}>Name</Th>
                                <Th style={columnTitleStyle}>Type</Th>
                                <Th style={columnTitleStyle}>Default Provider</Th>
                                <Th w={"40px"}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredTableData.map((dataValue, parentIndex) => (
                                dataValue.environments.map((env, envIndex) => (
                                    <Tr
                                        key={`${parentIndex}-${envIndex}`}
                                        fontWeight={500}
                                        onMouseOver={() => handleRowHover(parentIndex)}
                                        onMouseLeave={() => handleRowNotHover(parentIndex)}
                                        _hover={{ bgColor: "#ececec" }}
                                    >
                                        <Td style={rowValueStyle}>
                                            <Link
                                                onClick={() => handleRowClick(env)}
                                                _hover={{ textDecoration: "underline", color: "#0176d3" }}
                                            >
                                                {env.envName}
                                            </Link>
                                        </Td>
                                        <Td style={rowValueStyle}>{env.envType}</Td>
                                        <Td style={rowValueStyle}>N/A</Td>
                                        <Td style={rowValueStyle}>
                                            <Menu>
                                                <MenuButton
                                                    as={IconButton}
                                                    aria-label='Options'
                                                    icon={<HiEllipsisHorizontal />}
                                                    variant='outline'
                                                    h={'28px'} color="gray.500"
                                                    border={'1px solid #5c5c5c'}
                                                    onClick={() => handleMenuOpen(dataValue)} />
                                                <MenuList p={'5px 0'} minW={'150px'} maxW={'240px'}>
                                                    <MenuItem fontSize={14} onClick={() => handleDeleteOpen(env)} color={'white'}
                                                        bgColor='red.600' >
                                                        Delete environment...
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr>
                                ))
                            ))}
                        </Tbody>
                    </Table>
                    <Modal onClose={handleDeleteClose} isOpen={isDeleteOpen} isCentered>
                        <ModalOverlay />
                        {selectedEnvironment && (
                            <ModalContent minW={'600px'}>
                                <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                                    borderTopRadius={15} borderBottom={'1px solid #e5e5e5'}>
                                    Are you sure?
                                </ModalHeader>

                                <ModalBody p={'32px 32px'}>
                                    <VStack spacing={4}>
                                        <VStack spacing={0} fontSize={14} align={'flex-start'}>
                                            <FormLabel color={'#747474'} fontWeight={500} fontSize={14}><b>This action cannot be undone.</b> This will delete the <b>{selectedEnvironment.envName}</b> business group and all of its associated information. Please type the name of the business group to confirm.</FormLabel>
                                            <Input
                                                type="text"
                                                placeholder="Type the environment name"
                                                value={inputValue}
                                                onChange={handleInputChange}
                                            />
                                        </VStack>
                                    </VStack>
                                </ModalBody>

                                <ModalFooter borderBottomRadius={15} justifyContent={'space-between'} borderTop={'1px solid #e5e5e5'}>
                                    <Button onClick={handleDeleteClose} variant={'outline'} fontSize={14}>Cancel</Button>
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteEnvironment}
                                        ml={3}
                                        isDisabled={inputValue !== selectedEnvironment?.envName}
                                    >
                                        Delete
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        )}
                    </Modal>
                </TableContainer >
            )}


            <Modal isOpen={isDetailModalOpen} onClose={onDetailModalClose} isCentered size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'} p={7}
                        borderTopRadius={15} borderBottom={'1px solid #e5e5e5'}>
                        Edit environment
                    </ModalHeader>
                    {selectedEnvironment && (
                        <ModalBody p={8}>
                            <VStack spacing={4} align="flex-start">

                                <>
                                    <FormControl>
                                        <FormLabel fontSize="sm" fontWeight="400">Name</FormLabel>
                                        <Input
                                            type="text"
                                            value={selectedEnvironment.envName}
                                            onChange={(e) => setSelectedEnvironment({ ...selectedEnvironment, envName: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontSize="sm" fontWeight="400">Client ID</FormLabel>
                                        <Input
                                            type="text"
                                            value={selectedEnvironment.envClientId}
                                            placeholder='Enter password'
                                            isDisabled
                                            bg="textColor"
                                            textColor="#000"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel fontSize="sm" fontWeight="400">Client Secret</FormLabel>
                                        <InputGroup size='md'>
                                            <Input
                                                pr='4.5rem'
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Enter password'
                                                value={selectedEnvironment.envClientSecret}
                                                isDisabled
                                                bg="textColor"
                                            />
                                            <InputRightElement width='4.6rem' mt={1} >
                                                <Link _hover={{ color: "boxColor" }} h='1.75rem' size='sm' onClick={handleClickPassword} fontSize="xs" fontWeight="600">
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </Link>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </>

                            </VStack>
                            <Divider mt={6} />
                            <Flex justifyContent="space-between" width="100%" mt={5}>
                                <Button onClick={() => handleDeleteOpen(selectedEnvironment)} variant="DeleteButtons" borderRadius={4}>
                                    Delete Environment
                                </Button>
                                <Flex gap={5} ml="auto">
                                    <Button onClick={onDetailModalClose} variant="homePageButtons" borderRadius={4} fontWeight={600} fontSize="base" color="gray" borderColor="#1b1a1a">
                                        Cancel
                                    </Button>
                                    <Button onClick={handleUpdateEnvironment} colorScheme="blue" borderRadius={4} fontWeight={600} fontSize="base">
                                        Update
                                    </Button>
                                </Flex>
                            </Flex>

                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default BGEnvironmentTable;
