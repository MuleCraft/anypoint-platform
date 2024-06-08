import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    useDisclosure,
    Stack,
    HStack,
    Link, InputGroup, InputLeftElement, Input, Text,
    Icon, Tooltip, Switch

} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import CreatePermissions from "./CreatePermissions";
import "../../../assets/Common.css";
import PermissionsTable from "./PermissionTable";
import EmptyRows from "../EmptyRows";

const Permissions = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const toast = useToast();

    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
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
    //                 setEditedGroup(data[0]);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching user data:", error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setEditedGroup((prevGroup) => ({
    //         ...prevGroup,
    //         [name]: value,
    //     }));
    //     setChangesMade(true);
    // };

    // const handleSaveChanges = async () => {
    //     try {
    //         const { data: supabaseData, error: supabaseError } = await supabase
    //             .schema("mc_cap_develop")
    //             .from("businessgroup")
    //             .update({
    //                 businessGroupName: editedGroup.businessGroupName,
    //                 groupOwner: editedGroup.groupOwner,
    //                 orgDomain: editedGroup.orgDomain,
    //                 sessionTimeout: editedGroup.sessionTimeout
    //             })
    //             .eq("businessGroupId", id);

    //         if (supabaseError) {
    //             console.error("Error updating data in Supabase:", supabaseError.message);
    //             throw new Error(supabaseError.message);
    //         }

    //         console.log("Saving changes:", editedGroup);
    //         toast({
    //             title: "update successfully",
    //             description: "Settings updated successfully.",
    //             status: "success",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "top-right",
    //         });
    //         setChangesMade(false);
    //     } catch (error) {
    //         toast({
    //             title: "Update Failed",
    //             description:
    //                 "Setting update failed",
    //             status: "error",
    //             duration: 5000,
    //             isClosable: true,
    //             position: "top-right",
    //         });
    //         console.error("Error saving changes:", error);
    //     }
    // };



    const [activeItem, setActiveItem] = useState("Permissions");
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [

                { name: 'Members', label: 'Members', path: `/accounts/teams/${id}/users` },
                { name: 'Permissions', label: 'Permissions', path: `/accounts/teams/${id}/permissions` },
                { name: 'ChildTeams', label: 'Child teams', path: `/accounts/teams/${id}/child_teams` },
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${1}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${1}/limits` },



            ],
        },

    ];


    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams/">
                            Teams
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentGroupID === "" ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/businessGroups/${group?.businessGroupId}`}
                            >
                                {group?.organizationName}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )

                    }
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/businessGroups/${id}`}
                        >
                            {group?.businessGroupName}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Menu>
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
                    <MenuList borderRadius={0}>
                        <MenuItem fontSize="base" color="white" onClick="" bgColor="delete" >
                            Delete team...
                        </MenuItem>
                    </MenuList>
                </Menu>

            </Flex>
            <Flex direction={'column'}>
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Flex direction="column" mt="70" p={"20px 25px"} gap={8} w={'-webkit-fill-available'}>
                        <Stack mt={"-60px"} direction={"row"} spacing={6} align={'center'} justifyContent={'space-between'}>
                            <HStack spacing={5} >
                            <CreatePermissions 
                                // filteredTeamsTableData={filteredTableData}
                                // orgId={currentOrganization}
                            />
                            <HStack>
                             <Flex align="center">
                             <Box
                                    position="relative"
                                    display="inline-block"
                                    width="40px"
                                    height="20px"
                                    mr="-35px"
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
                                        <FaCheck fontSize={10}/>
                                    </Box>
                                    )}
                                </Box>
                                <Switch size="lg" isChecked={isChecked} onChange={handleToggle}/>
                            </Flex>
                            
                            <Text fontSize={14} color={"#444444"} fontWeight={500} >
                                Show inherited permissions
                            </Text>
                            <Tooltip label={'Inherited permissions come from parents of this team'}
                                bg={'#5c5c5c'}
                                fontSize={12} noOfLines={1} py={2} minW={'335px'}>
                                <Icon fontSize={20} mt={1}><IoInformationCircleOutline/></Icon>
                            </Tooltip>
                            </HStack>
                            </HStack>
                            <InputGroup maxW={"fit-content"}>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FiSearch />}
                                    color="gray.500"
                                />
                                <Input placeholder="Filter permissions" fontSize={14} fontWeight={500}
                                    // onChange={(e) => { setFilterValue(e.target.value) }}
                                />
                            </InputGroup>
                        </Stack>
                        {/* {filteredTableData.length === 0 ? (
                            <EmptyRows message={'No data to show'} />
                        ) : ( */}
                            {/* <PermissionsTable 
                                tableData={filteredTableData}
                                onOpenCreateChildGroup={openModal}
                                userData={userData}
                            /> */}
                        {/* )} */}
                        </Flex>
            </Flex>

        </Box >
    );
};

export default Permissions;
