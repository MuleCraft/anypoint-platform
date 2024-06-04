import { useContext, useEffect, useState } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,

} from "@chakra-ui/react";
import { useParams } from "react-router-dom";


import fetchBgTableRows from "../../../Utils/BgTableRows";
import { AuthContext } from "../../../Utils/AuthProvider";
// import EmptyRows from "../EmptyRows";
import { HiEllipsisHorizontal } from "react-icons/hi2";
// import supabase from "../../../Utils/supabase";

import { FiSearch } from "react-icons/fi";

const AMCreateTeams = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const { data, error } = await supabase
    //                 .schema("mc_cap_develop")
    //                 .from("businessgroup")
    //                 .select("*")
    //                 .eq("businessGroupId", id);

    //             if (error) {
    //                 console.error("Error fetching user data:", error.message);
    //             } else {
    //                 setGroup(data[0]);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);





    const { userData } = useContext(AuthContext);
    const [tableData, setTableData] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [currentUserName, setCurrentUserName] = useState('');


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);


    if (userData && (currentUserName === '')) {

        setCurrentUserName(userData.display_name);

    }

    const fetchRows = async () => {
        const tableRowData = await fetchBgTableRows(currentUserName);
        setTableData(tableRowData);
    }

    if (userData && (tableData.length === 0)) {
        fetchRows();
    }

    // const filteredTableData = tableData.filter((data) =>
    //     (data?.businessGroupId === id || data?.parentGroupID === id) &&
    //     data?.organizationName === group?.organizationName || group?.parentGroupID === ""
    // );

    const columnTitleStyle = {
        fontSize: 14,
        color: "#444444",
        fontWeight: 800,
        textTransform: "capitalize",
        padding: "10px",
    };
    const rowValueStyle = { fontSize: 14, padding: "10px" };


    return (

        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Stack mt={"25px"} direction={"row"} spacing={6} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={6}>
                    <Button colorScheme="blue" onClick={onOpen} fontSize="xs">
                        Create Team
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                        <ModalOverlay />
                        <ModalContent>
                            <Box bg="modelColor" borderRadius="4px" p={4}>
                                <ModalHeader fontSize="lg" fontWeight="800">
                                    Create Team
                                </ModalHeader>
                            </Box>
                            <Divider />
                            <ModalBody>
                                <FormControl id="email" p={4}>
                                    <FormLabel fontSize="base">Name</FormLabel>
                                    <Text pb={2} maxW="450px" fontSize="base" color="textColor">
                                        You can use alphanumeric characters, hyphens, and spaces.
                                    </Text>
                                    <Input
                                        type="text"
                                        value=""
                                        onChange=""
                                        placeholder="e.g. MyTeam"
                                        isInvalid=""
                                    />

                                    <FormLabel fontSize="base" pt={5}>
                                        Parent team
                                    </FormLabel>
                                    <Text pb={2} maxW="450px" fontSize="base" color="textColor">
                                        Teams inherit permissions from their parents.
                                    </Text>
                                    <Input
                                        type="text"
                                        value={userData?.company}
                                    />
                                </FormControl>
                            </ModalBody>
                            <Divider />
                            <ModalFooter justifyContent="space-between">
                                <Button variant="homePageButtons" onClick={onClose} fontSize="base">
                                    Cancel
                                </Button>
                                <Button onClick="" colorScheme="blue" fontSize="base">
                                    Create
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Text fontSize={14} color={"#747474"} fontWeight={500} right={300}>
                        Teams are groups of users. Manage access more efficiently by organizing teams to reflect your company structure.
                    </Text>
                </HStack>
                <InputGroup maxW={"fit-content"} ml={0}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch />}
                        color="gray.500"
                    />
                    <Input placeholder="Filter Teams" fontSize={14} fontWeight={500}
                        onChange={(e) => { setFilterValue(e.target.value) }}
                    />
                </InputGroup>
            </Stack>
            <TableContainer pt={5} px={5}>
                <Table variant="simple" size="md">
                    <Thead borderBottomWidth="3px">
                        <Tr >
                            <Th style={columnTitleStyle} w={"120%"}>Name</Th>
                            <Th style={columnTitleStyle}></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        <Tr borderBottomWidth={1.5} _hover={{ bgColor: "#ececec" }}>
                            <Td style={rowValueStyle}>inches</Td>
                            <Td style={rowValueStyle}><Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HiEllipsisHorizontal width="10px" />}
                                    variant="outline"
                                    h={"30px"}
                                    color="gray.500"
                                    border={"1px solid #5c5c5c"}
                                    right={30}
                                />
                                <MenuList borderRadius={0} >
                                    <MenuItem fontSize="base" color="black" onClick={onOpen}  >
                                        Create child team
                                    </MenuItem>
                                    <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                                        Delete team...
                                    </MenuItem>
                                </MenuList>
                            </Menu></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    );
};

export default AMCreateTeams;
