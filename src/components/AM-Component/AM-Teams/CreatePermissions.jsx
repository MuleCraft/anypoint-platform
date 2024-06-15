import { useState } from "react";
import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Flex, Tabs, TabList, Tab, TabPanels, TabPanel, Icon,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Switch,
    Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
    Checkbox,
    Divider,
    Link, Tooltip
} from "@chakra-ui/react";
import { CheckIcon, ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { FiSearch } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import createPermissions from "../../../Utils/PermissionsCreate";

const CreatePermissions = ({bgNames,permissionData,teamId}) => {
    const toast = useToast();
    const [isChecked, setIsChecked] = useState(false);
    const [checkedRoles, setCheckedRoles] = useState({});
    const [selectAllStates, setSelectAllStates] = useState({});

    const [modulesWithSelectedRoles, setModulesWithSelectedRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);

    // console.log("passed groups:",bgNames);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    const steps = [
        { title: 'Select Permissions', content: 'Content for step 1' },
        { title: 'Select Business Groups', content: 'Content for step 2' },
        { title: 'Review', content: 'Content for step 3' }
    ];

    const columnTitleStyle = {
        fontSize: 15,
        color: "#444444",
        fontWeight: 800,
        textTransform: "capitalize",
        padding: "10px",
      };
      const rowValueStyle = { fontSize: 14, padding: "10px" };

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const renderTabLabel = (index) => {
        if (index < currentStep) {
        return <Icon as={CheckIcon} color="green.500" fontSize={8}/>;
        }
        return index + 1;
    };

    const rolesByModule = permissionData.reduce((acc, role) => {
        if (!acc[role.targetmodule]) {
          acc[role.targetmodule] = [];
        }
        acc[role.targetmodule].push(role);
        return acc;
    }, {});

    const handleSelectAll = (module) => {
        const newSelectAllStates = { ...selectAllStates };
        const newCheckedRoles = { ...checkedRoles };

        if (!newSelectAllStates[module]) {
            newSelectAllStates[module] = true;
            rolesByModule[module].forEach((role) => {
                newCheckedRoles[role.roleid] = true;
            });
        } else {
            newSelectAllStates[module] = false;
            rolesByModule[module].forEach((role) => {
                newCheckedRoles[role.roleid] = false;
            });
        }

        setSelectAllStates(newSelectAllStates);
        console.log("selected roles:",newCheckedRoles);
        setCheckedRoles(newCheckedRoles);
    };

    const handleCheckboxChange = (role) => {
        console.log("role ids:", role);

        setSelectedRoles((prevSelectedRoles) => {
            if (prevSelectedRoles.some(selectedRole => selectedRole.roleid === role.roleid)) {
                // Remove role if already selected
                console.log("role added/removed:",prevSelectedRoles.filter(selectedRole => selectedRole.roleid !== role.roleid));
                return prevSelectedRoles.filter(selectedRole => selectedRole.roleid !== role.roleid);
            } else {
                // Add role if not already selected
                console.log("role added/removed::",[...prevSelectedRoles, role]);
                return [...prevSelectedRoles, role];
            }
        });
    
        // Create a copy of the current checkedRoles state
        const newCheckedRoles = { ...checkedRoles };
    
        // Toggle the role object in checkedRoles
        if (newCheckedRoles[role.roleid]) {
            delete newCheckedRoles[role.roleid];
        } else {
            newCheckedRoles[role.roleid] = role;
        }
    
        // Check if all roles in this module are checked or not
        const module = role.targetmodule;
        const allRolesChecked = rolesByModule[module].every(
            (role) => newCheckedRoles[role.roleid]
        );
    
        // Update selectAllStates based on allRolesChecked
        const newSelectAllStates = { ...selectAllStates };
        newSelectAllStates[module] = allRolesChecked;
    
        // Update the state with the new checkedRoles and selectAllStates
        setCheckedRoles(newCheckedRoles);
        console.log("checked roles:", newCheckedRoles);
        setSelectAllStates(newSelectAllStates);
    
        // Update the "Select All" link text based on any checkbox uncheck
        if (!newCheckedRoles[role.roleid]) {
            newSelectAllStates[module] = false;
            setSelectAllStates(newSelectAllStates);
            console.log("selected roles:", newSelectAllStates);
        }
    };

    const handleGroupCheckboxChange = (group) => {
        console.log('groupclicked!',group);
        setSelectedGroups((prevSelectedGroups) => {
            let newSelectedGroups;
            if (prevSelectedGroups.some(selectedGroup => selectedGroup.businessGroupName === group.businessGroupName)) {
                newSelectedGroups = prevSelectedGroups.filter(selectedGroup => selectedGroup.businessGroupName !== group.businessGroupName);
            } else {
                newSelectedGroups = [...prevSelectedGroups, group];
            }
    
            // Log the updated selectedGroups
            console.log("Updated selected groups:", newSelectedGroups);
            return newSelectedGroups;
        });
    };

    const permissionCreateParams = {
        roles: selectedRoles,
        groups: selectedGroups,
        teamid: teamId
    }
    
    async function invokePermissionsCreate() {
        try {
            const response = await createPermissions(permissionCreateParams);
            onClose();

            if (response === "Error occurred!") {
                toast({
                    title: "Error",
                    description: "Error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }
            else {
                toast({
                    description: "Permissions successfully added.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            }

            setTimeout(() => {
                window.location.reload();
            }, 800);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }

    return (

        <>
            <Button onClick={onOpen} variant="formButtons">Add Permissions</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent minW={900}>
                <ModalHeader bg={'#f3f3f3'} fontSize={20} fontWeight={800} color={'#444444'}
                    borderTopRadius={15} borderBottom={'0.5px solid #e5e5e5'} p={6}>
                    Add Permissions
                </ModalHeader>
                <ModalBody minW={900} p={0}>
                <Flex minW={900}>
                <Tabs
                        orientation="vertical"
                        index={currentStep}
                        onChange={setCurrentStep}
                        w={'-webkit-max-content'}
                        minW={900}
                    >
                    <Box minWidth="200px" borderRight="1px solid #E2E8F0" p={4}>
                    
                        <TabList border={'none'} px={0}>
                        {steps.map((step, index) => (
                            <Tab key={index} justifyContent={'flex-start'} fontSize={14} border={'none'}>
                            <Box display="flex" alignItems="center"
                                justifyContent={'center'}
                                h={5} w={5}
                                fontSize={10}
                                border={index < currentStep ? '1px solid green':'1px solid black'}
                                borderRadius={100} p={2}
                                color={'black'}>
                                {renderTabLabel(index)}
                            </Box>
                            <Box ml={2} color={index < currentStep ? "gray" : 'black'} fontWeight={500}>{step.title}</Box>
                            </Tab>
                        ))}
                        </TabList>
                    </Box>
                    <Box flex="1" p={4}>
                    <TabPanels >
                        <TabPanel px={0}>
                            <VStack w={'-webkit-max-content'} spacing={5}>
                            <HStack align={'center'} justify={'space-between'} spacing={8}>
                                <Text fontSize={14} color={"#747474"} fontWeight={500}>
                                Select permissions to add for this team.
                                </Text>
                                <InputGroup maxW={"fit-content"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FiSearch />}
                                        color="gray.500"
                                    />
                                    <Input placeholder="Filter products and permissions" fontSize={14}
                                        fontWeight={500}
                                        w={300}
                                        onChange={(e) => { setFilterValue(e.target.value) }}
                                    />
                                </InputGroup>
                            </HStack>
                            <TableContainer minW={'100%'}>
                                <Table variant="simple" size="md">
                                    <Thead borderBottomWidth="3px">
                                    <Tr>
                                        <Th style={columnTitleStyle}>Permissions</Th>
                                        <Th w={"50px"}
                                            textTransform={'capitalize'}
                                            alignContent={'center'}>
                                            <HStack>
                                            <Text fontSize={12} color={"#747474"} fontWeight={500}>
                                            Show Selected Only
                                            </Text>
                                            <Flex align="center">
                                                <Box
                                                    position="relative"
                                                    display="inline-block"
                                                    width="40px"
                                                    height="20px"
                                                    mr="-31px"
                                                    zIndex={1}
                                                    pointerEvents="none"
                                                >
                                                    {isChecked && (
                                                        <Box
                                                            position="absolute"
                                                            top="50%"
                                                            left="50%"
                                                            transform="translate(-50%, -50%)"
                                                            color="white"
                                                        >
                                                            <FaCheck fontSize={8} />
                                                        </Box>
                                                    )}
                                                </Box>
                                                <Switch size="md" isChecked={isChecked} onChange={handleToggle} />
                                            </Flex>
                                            </HStack>
                                        </Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody p={0}>
                                        {Object.entries(rolesByModule).map(([module, roles]) => (
                                            <Tr key={module}>
                                            <Td colSpan={2} p={0} border={'none'}>
                                                <Accordion allowMultiple>
                                                <AccordionItem>
                                                    <AccordionButton bg={'#f3f3f3'} justifyContent={'space-between'}>
                                                        <HStack>
                                                            <AccordionIcon/>
                                                            <Box flex="1" textAlign="left" fontSize={13} color={'#747474'}>
                                                                {module}
                                                            </Box>
                                                        </HStack>
                                                        <Link color="gray" fontSize="xs" textDecoration={'underline'}
                                                            onClick={() => handleSelectAll(module)}>
                                                            {selectAllStates[module] ? 'Select none' : 'Select all'}
                                                        </Link>
                                                    </AccordionButton>
                                                    <AccordionPanel >
                                                        {rolesByModule[module] && rolesByModule[module].map((role) => (
                                                            <>
                                                                <HStack justify={'space-between'} py={2}>
                                                                    <HStack>
                                                                        <Box key={role.roleid} mb={0} fontSize={14}>
                                                                        {role.rolename}
                                                                        </Box>
                                                                        <Tooltip label={role.roledetail} placement='right' fontSize="11" p={2} bg="gray">
                                                                            <Box as='span' display='inline-block'>
                                                                                <IoIosInformationCircleOutline style={{ height: "15px", width: "15px" }} />
                                                                            </Box>
                                                                        </Tooltip>
                                                                    </HStack>
                                                                    <Checkbox size={'lg'}
                                                                    isChecked={checkedRoles[role.roleid]}
                                                                    onChange={() => handleCheckboxChange(role)}/>
                                                                </HStack>
                                                                <Divider/>
                                                            </>
                                                        ))}
                                                    </AccordionPanel>
                                                </AccordionItem>
                                                </Accordion>
                                            </Td>
                                            </Tr>
                                        ))}
                                        </Tbody>
                                </Table>
                                </TableContainer>
                            </VStack>
                        </TabPanel>
                        <TabPanel >
                            <VStack spacing={5}>
                            <HStack align={'center'} justify={'space-between'}>
                                <Text fontSize={14} color={"#747474"} fontWeight={500}>
                                    Select business groups where you want to add your selected permissions.
                                </Text>
                                <InputGroup maxW={"fit-content"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FiSearch />}
                                        color="gray.500"
                                    />
                                    <Input placeholder="Filter business groups" fontSize={14}
                                        fontWeight={500}
                                        onChange={(e) => { setFilterValue(e.target.value) }}
                                    />
                                </InputGroup>
                            </HStack>
                            <TableContainer minW={'100%'}>
                                <Table variant="simple" size="md">
                                    <Thead borderBottomWidth="3px">
                                    <Tr>
                                        <Th style={columnTitleStyle}>Business Groups</Th>
                                        <Th style={columnTitleStyle} w={"80px"}></Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                    {bgNames.map((dataValue, index) => (
                                        <>
                                        <Tr
                                            key={dataValue.businessGroupName}
                                            fontWeight={500}
                                            _hover={{ bgColor: "#ececec" }}
                                        >
                                            <Td style={rowValueStyle}>
                                                {dataValue.businessGroupName}
                                            </Td>
                                            <Td style={rowValueStyle}>
                                            <Checkbox
                                                size={'lg'}
                                                isChecked={selectedGroups.some(group => group.businessGroupName === dataValue.businessGroupName)}
                                                onChange={() => handleGroupCheckboxChange(dataValue)}
                                            />
                                            </Td>
                                        </Tr>
                                        </>
                                    ))}
                                    </Tbody>
                                </Table>
                                </TableContainer>
                            </VStack>
                        </TabPanel>
                        <TabPanel >
                            <VStack>
                            <HStack align={'center'} justify={'space-between'}>
                                <Text fontSize={14} color={"#747474"} fontWeight={500}>
                                The permissions you selected will be applied as shown.
                                </Text>
                                <InputGroup maxW={"fit-content"}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FiSearch />}
                                        color="gray.500"
                                    />
                                    <Input placeholder="Filter" fontSize={14}
                                        fontWeight={500}
                                        onChange={(e) => { setFilterValue(e.target.value) }}
                                    />
                                </InputGroup>
                            </HStack>
                            <TableContainer minW={'100%'}>
                                <Table variant="simple" size="md">
                                    <Thead borderBottomWidth="3px">
                                    <Tr>
                                        <Th style={columnTitleStyle}>Business Groups</Th>
                                        <Th style={columnTitleStyle}>Permissions</Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                    {selectedGroups.map((group, index) => {
                                        // Aggregate role counts by target module
                                        const roleCounts = selectedRoles.reduce((acc, role) => {
                                            const targetModule = role.targetmodule;
                                            if (!acc[targetModule]) {
                                                acc[targetModule] = 0;
                                            }
                                            acc[targetModule]++;
                                            return acc;
                                        }, {});

                                        // Create an array of role count strings
                                        const roleCountLines = Object.entries(roleCounts)
                                            .map(([targetModule, count]) => `${count} in ${targetModule}`);

                                        return (
                                            <Tr
                                                key={index}
                                                fontWeight={500}
                                                _hover={{ bgColor: "#ececec" }}
                                            >
                                                <Td style={rowValueStyle}>
                                                    {group.businessGroupName}
                                                </Td>
                                                <Td style={rowValueStyle}>
                                                    {roleCountLines.map((line, idx) => (
                                                        <div key={idx}>{line}</div>
                                                    ))}
                                                </Td>
                                            </Tr>
                                        );
                                    })}
                                    </Tbody>
                                </Table>
                                </TableContainer>
                                </VStack>
                        </TabPanel>
                    </TabPanels>
                    </Box>
                    </Tabs>
                </Flex>
                </ModalBody>

                <ModalFooter justifyContent={'space-between'} borderTop={'0.5px solid #e5e5e5'} p={6}>
                <Button onClick={onClose} ml={3} fontSize={14}
                border={'1px solid black'}
                bg={'transparent'}
                color={'gray'}
                _hover={{
                    color:'white',
                    bg:'gray',
                    border:'1px solid gray'
                }}>
                    Cancel
                    </Button>
                 <HStack spacing={0}>
                {currentStep > 0 && (
                    <Button onClick={handlePrevious} ml={3} fontSize={14} leftIcon={<ArrowBackIcon/>}
                    border={'1px solid black'}
                    bg={'transparent'}
                    color={'gray'}
                    _hover={{
                        color:'white',
                        bg:'gray',
                        border:'1px solid gray'
                    }}>
                    Back
                    </Button>
                )}
                {currentStep < steps.length - 1 ? (
                    <Button onClick={handleNext} ml={3}
                        colorScheme="blue" variant={"formButtons"}
                        rightIcon={<ArrowForwardIcon/>}>
                    Next
                    </Button>
                ) : (
                    <Button onClick={invokePermissionsCreate} variant={"formButtons"} ml={3} colorScheme="green">
                    Add Permissions
                    </Button>
                )}
                </HStack>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </ >
    );
};

export default CreatePermissions;
