import { ArrowBackIcon, CloseIcon, InfoOutlineIcon } from "@chakra-ui/icons"
import { Box, Button, Checkbox, Flex, Input, InputGroup, InputLeftElement, InputRightElement, Radio, RadioGroup, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import { FaCircle } from "react-icons/fa6"
import { IoIosArrowDown, IoIosArrowUp, IoMdCloudOutline } from "react-icons/io"
import { IoArrowRedo } from "react-icons/io5"
import { Link, NavLink } from "react-router-dom"


export const RuntimeCreateCluster = () => {
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
        '',
        'Name',
        'Status',
        'Type',
        'Version',
        'Agent',
    ];
    const columnTitleStyle = {
        fontSize: 14,
        color: '#444444',
        fontWeight: 800,
        textTransform: 'capitalize',

    };

    const rowValueStyle = { fontSize: 14 };
    const [value, setValue] = useState('1')

    return (
        <Box>
            <Box>
                <Flex align="center" gap={3}>
                    <NavLink to="/cloudhub/sandbox/home/servers?option=Sandbox">
                        <ArrowBackIcon w={7} height={7} color="customHeadingColor" />
                    </NavLink>
                    <Text fontSize="22px" fontWeight="400" color="customHeadingColor">Create a Cluster</Text>
                </Flex>
                <Flex ps={10} gap={2} py={1}>
                    <Text fontSize="base">Learn about</Text>
                    <Text color="boxColor" fontSize="base" ml={1} display="inline">
                        <Link>prerequisite for creating and managing clusters </Link>
                    </Text>
                    <Text fontSize="base">and</Text>
                    <Text color="boxColor" fontSize="base" ml={1} display="inline">
                        <Link>rules for configuring cluster types.</Link>
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Flex ps="40px" py={4} gap={4} flexDirection="column">
                    <Text fontSize="22px" fontWeight="400" color="customHeadingColor">1. Define Cluster Name</Text>
                    <Input width={700} value="" variant="custom" borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} borderRadius={5} placeholder='Cluster Name' size='xs' height="40px" bgColor="#f4f5f6" />
                </Flex>
                <Flex ps="40px" py={5} flexDirection="row" align="center" gap={10}>
                    <Text fontSize="22px" fontWeight="400" color="customHeadingColor">2. Pick Cluster Type</Text>
                    <RadioGroup onChange={setValue} value={value}>
                        <Stack direction='row' gap={7}>
                            <Radio size='lg' value='1'><Text fontSize="sm">Unicast</Text></Radio>
                            <Radio size='lg' value='2'><Text fontSize="sm">Multicast </Text></Radio>
                        </Stack>
                    </RadioGroup>
                </Flex>
                <Flex ps="40px" flexDirection="column">
                    <Text fontSize="22px" fontWeight="400" color="customHeadingColor">2. Select Servers</Text>
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

                <Box ps="40px">
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
                                <Tr key={item.id} >
                                    <Td><Checkbox borderRadius={0} color="gray.100"></Checkbox></Td>
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
                <Box pt={300} justifyContent="space-between" display="flex">
                    <Box display="flex" alignItems="center" gap={2}>

                    </Box>
                    <Button variant="formButtons" borderRadius={5}>
                        Create Cluster
                    </Button>
                </Box>
            </Box>
        </Box >
    )
}
