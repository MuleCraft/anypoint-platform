import { CloseIcon, TriangleDownIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, Input, FormControl, Stack, Tabs, TabList, Tab, TabIndicator, TabPanels, TabPanel, Button, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, Divider, ModalBody, ModalFooter, useDisclosure, InputGroup, InputRightElement, RadioGroup, Radio, TableContainer, Table, Thead, Tr, Th, Tbody, Td, InputLeftElement, Checkbox, ButtonGroup, FormHelperText } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { InfoOutlineIcon } from "@chakra-ui/icons"
import SelectComponent from "../../SelectComponent";
import { env, options, versions } from "./SelectMenuDatas/DeploymentTarget";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Runtime } from "./TablePanels/Runtime";
import { Properties } from "./TablePanels/Properties";
import { Logging } from "./TablePanels/Logging";
import { StaticIPs } from "./TablePanels/StaticIPs";
import { Ingress } from "./TablePanels/Insight";
import { useNavigate } from "react-router-dom";
export const DeployApplicationForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenOne, onOpen: onOpenOne, onClose: onCloseOne } = useDisclosure();


    const [value, setValue] = useState('1')
    const columnTitleStyle = { fontSize: 14, color: '#686868', fontWeight: 800, textTransform: 'capitalize', padding: 15 };
    const rowValueStyle = { fontSize: 14, padding: 17, };
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };


    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

    const isSelected = (index) => {
        return index === selectedRow;
    };
    console.log(selectedRow)

    const tableData = [
        { name: "Manufacturing SAP HANA Event Listener", organization: "Mulecraft" },
        { name: "Another Row", organization: "Organization 2" },
    ];
    const [validationStatus, setValidationStatus] = useState({
        maxLength: false,
        minLength: false,
        appNameAvailable: false,
        required: false,
        startsWithInvalid: false,
        endsWithInvalid: false,
        formatValid: false,
    });
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
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [inputValue, setInputValue] = useState("");
    useEffect(() => {
        const isValid =
            validationStatus.maxLength &&
            validationStatus.minLength &&
            validationStatus.appNameAvailable &&
            validationStatus.required &&
            validationStatus.formatValid &&
            !validationStatus.startsWithInvalid &&
            !validationStatus.endsWithInvalid &&
            selectedJar !== "";

        setIsButtonDisabled(!isValid || inputValue.trim() === "");
        console.log("isButtonDisabled:", isButtonDisabled);
        console.log("validationStatus:", validationStatus);
        console.log("inputValue:", inputValue);
    }, [validationStatus, inputValue, isButtonDisabled, selectedJar]);
    const [showErrorContainer, setShowErrorContainer] = useState(false);
    const [existingApplicationNames, setExistingApplicationNames] = useState([]);
    const validateInput = (value) => {
        const newValidationStatus = { ...validationStatus };
        for (const key in newValidationStatus) {
            newValidationStatus[key] = false;
        }
        if (value.length <= 42) newValidationStatus.maxLength = true;
        if (value.length >= 3) newValidationStatus.minLength = true;
        if (value.trim().length > 0) newValidationStatus.required = true;
        if (/^[a-z][a-z0-9-]*[a-z0-9]$/g.test(value))
            newValidationStatus.formatValid = true;
        if (/^[0-9-]/.test(value)) newValidationStatus.startsWithInvalid = true;
        if (/-$/.test(value)) newValidationStatus.endsWithInvalid = true;
        // Check if the entered name already exists
        if (existingApplicationNames.includes(value)) {
            newValidationStatus.appNameAvailable = false;
        } else {
            newValidationStatus.appNameAvailable = true;
        }
        setValidationStatus(newValidationStatus);
        setInputValue(value);
        const hasErrors = Object.values(newValidationStatus).some(
            (status) => !status
        );
        setIsButtonDisabled(hasErrors || value.trim() === "");
        setShowErrorContainer(hasErrors || value.trim() === "");
    };
    useEffect(() => {
        fetch("http://192.168.0.172:3000/applications")
            .then((response) => response.json())
            .then((data) => {
                const names = data.map((app) => app.name);
                setExistingApplicationNames(names);
            })
            .catch((error) => {
                console.error("Error fetching application names:", error);
            });
    }, []);




    const handleSubmit = () => {
        if (existingApplicationNames.includes(inputValue)) {
            alert("Application name must be unique.");
            return;
        }
        const data = {
            name: inputValue,
            target: selectedOption.value,
            jarFileName: selectedJar,
            runtime: selectedOption1.value, // Include the runtime value here
            workerSize: selectedOption2.value, // Include the workerSize value here
            Worker: selectedOption3.value, // Include the Workers value here
        };
        fetch("http://127.0.0.1:3000/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log("Application submitted:", responseData);
                setExistingApplicationNames([...existingApplicationNames, inputValue]);
                navigate("/runtime-manager/application");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <Box>
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Text fontSize="xl">Deploy Application</Text>
                </Box>
            </Flex>
            <FormControl>
                <Stack direction={['column', 'row']} spacing='4'>
                    <Box width="44%" zIndex={0}>
                        <Text fontSize="sm" color="navText">Application Name</Text>
                        <InputGroup size='md' flexDirection="column" py={3}>
                            <Input value={inputValue} onChange={(e) => validateInput(e.target.value)} onBlur={() => setShowErrorContainer(false)} variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Name' size='sm' height="40px" bgColor="#f4f5f6" />
                            {showErrorContainer && (
                                <Box>
                                    {
                                        validationStatus.maxLength ? (
                                            <InputRightElement width='2.5rem' pt={6}>
                                                <CloseIcon width={2} color="red" />
                                            </InputRightElement>
                                        ) : (
                                            <InputRightElement width='2.5rem' pt={6}>
                                                <CloseIcon width={2} />
                                            </InputRightElement>
                                        )
                                    }</Box>)}
                        </InputGroup>
                    </Box>

                    {
                        showErrorContainer && (

                            <Box position="absolute" flexDirection="column" maxH="40%" zIndex={99} ml="45%" borderWidth="1px" p={4} borderRightWidth={3} borderLeftWidth={3} bgColor="#fff" top="-50">
                                <Box display="flex" alignItems="center" gap={2}>
                                    {validationStatus.maxLength ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Maximum 42 characters allowed</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {validationStatus.minLength ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Minimum 3 characters required</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {validationStatus.appNameAvailable ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Application name is available</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {validationStatus.required ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs"> Required</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {validationStatus.formatValid ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Only lowercase letters, numbers, and dashes allowed</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {!validationStatus.startsWithInvalid ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Cannot start with numbers or dashes</FormHelperText>
                                </Box>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {!validationStatus.endsWithInvalid ? (
                                        <FaCheck color="green" />
                                    ) : (
                                        <FaTimes color="#D1344E" />
                                    )}
                                    <FormHelperText fontSize="xs">Cannot end with a dash</FormHelperText>
                                </Box></Box>

                        )
                    }
                    <Box width="50%"></Box>
                </Stack >
                <Stack direction={['column', 'row']} spacing='4' alignItems="center">
                    <Box width="45%">
                        <Text fontSize="sm" color="navText">Deployment Target</Text>
                        <SelectComponent options={options} />
                    </Box>
                    <Box width="35%" py={2}>
                        <Text fontSize="sm" color="navText">Application File</Text>
                        <Input variant='filled' value={selectedJar} borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='No file has been loaded' size='sm' height="40px" isDisabled bgColor="#f4f5f6" />
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
                            <MenuList borderRadius={0} borderWidth={1} borderColor="gray.400" >
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
                                    <FormControl id="email">
                                        <Text fontSize="sm" textColor="gray.500">Type</Text>
                                        <RadioGroup onChange={setValue} value={value} >
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
                                    <Box >
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
                        <Button variant="outline" backgroundColor="gray.100" onClick={onOpenOne} fontSize="xs" borderRadius={0} borderColor="gray.400" >Get from sandbox</Button>
                        <Modal isOpen={isOpenOne} onClose={onCloseOne} isCentered size={"6xl"} >
                            <ModalOverlay />
                            <ModalContent borderRadius="0" width={customWidth} height={customHeight}>
                                <Box bg="#f9fafb " borderRadius="4px">
                                    <ModalHeader fontSize="xl" fontWeight="200" textColor="gray.500">Get from sandbox</ModalHeader>
                                </Box>
                                <Divider />
                                <ModalBody>
                                    <FormControl id="email" >
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
                                        <Text fontSize="14" > Select an asset and asset version to continue.</Text>
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
                <Box py={10}>
                    <Tabs position='relative' variant='unstyled' >
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
                                <Runtime />
                            </TabPanel>
                            <TabPanel>
                                <Properties />
                            </TabPanel>
                            <TabPanel>
                                <Ingress />
                            </TabPanel>
                            <TabPanel>
                                <Logging />
                            </TabPanel>
                            <TabPanel>
                                <StaticIPs />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
                <Box py={10} justifyContent="space-between" display="flex">
                    <Box></Box>
                    <Button variant="formButtons" borderRadius={0} isDisabled>
                        Deploy Application
                    </Button>
                </Box>

            </FormControl >
        </Box >
    )
}
