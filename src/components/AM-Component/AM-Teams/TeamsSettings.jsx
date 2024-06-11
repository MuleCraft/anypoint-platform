import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Flex,
    HStack,
    Input,
    Stack,
    Text,
    Button,
    InputGroup,
    InputRightElement,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import FlexableTabs from "../../FlexableTabs";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { SlArrowDown } from "react-icons/sl";

const TeamSetting = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [ancestors, setAncestors] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const toast = useToast();
    const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .schema("mc_cap_develop")
                    .from("teams")
                    .select("*")
                    .eq("teamid", id);

                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    setGroup(data[0]);
                    setAncestors(data[0].ancestors)
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
    console.log("group", group)
    console.log("anc", ancestors)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedGroup((prevGroup) => ({
            ...prevGroup,
            [name]: value,
        }));
        setChangesMade(true);
    };

    const handleSaveChanges = async () => {
        try {
            const { data: supabaseData, error: supabaseError } = await supabase
                .schema("mc_cap_develop")
                .from("businessgroup")
                .update({
                    businessGroupName: editedGroup.businessGroupName,
                    groupOwner: editedGroup.groupOwner,
                    orgDomain: editedGroup.orgDomain,
                    sessionTimeout: editedGroup.sessionTimeout
                })
                .eq("businessGroupId", id);

            if (supabaseError) {
                console.error("Error updating data in Supabase:", supabaseError.message);
                throw new Error(supabaseError.message);
            }

            console.log("Saving changes:", editedGroup);
            toast({
                title: "update successfully",
                description: "Settings updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setChangesMade(false);
        } catch (error) {
            toast({
                title: "Update Failed",
                description:
                    "Setting update failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            console.error("Error saving changes:", error);
        }
    };



    const [activeItem, setActiveItem] = useState("Settings");
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
                { name: 'Settings', label: 'Settings', path: `/accounts/teams/${id}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/teams/${id}/limits` },


            ],
        },

    ];


    return (
        <Box h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/teams">
                            Teams
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {group?.parentteamId === null ? (
                        ""
                    ) : (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                fontSize="lg"
                                fontWeight="400"
                                href={`/accounts/teams/${group?.teamid}`}
                            >
                                {group?.teamname}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    )

                    }

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/teams/${id}/settings`}
                        >
                            {group?.teamname}
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
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>

            <Stack gap={50} mt={7} mb={7} ml={7}>
                {group?.parentteamId === null ? (
                    ""
                ) : (
                    <HStack justify="space-between" >
                        <Box w="full" h="40px" display="flex" flexDirection="column" gap={2}>
                            <Text fontSize="xs" fontWeight="500">Name</Text>
                            <Text fontSize="xs" w="85%" color="gray">A unique name. You can use alphanumeric characters, hyphens, and spaces.</Text>
                        </Box>
                        <Box w="100%" h="40px">

                            <Input
                                fontSize="xs"
                                name="businessGroupName"
                                value={editedGroup?.businessGroupName || ""}
                                onChange={(e) => handleInputChange(e)}
                                size="sm"
                                width="100%"
                                height={10}
                            />

                        </Box>
                        <Box w="full" h="40px"></Box>
                    </HStack>
                )}
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px" display="flex" flexDirection="column" gap={2}>
                        <Text fontSize="xs" fontWeight="500">Parent Team</Text>
                        <Text fontSize="xs" w="85%" color="gray">Maintainers can move this team into another team they maintain. Any child teams will also be moved..</Text>
                    </Box>

                    <InputGroup mt={1} zIndex={3}>
                        <InputRightElement
                            pointerEvents="none"
                            children={<SlArrowDown />}
                            color="gray.500"
                        />
                        <Input
                            placeholder="Select..."
                            autoComplete="off"
                            fontSize={14} color={'#000000'}
                            value={group?.teamname}
                            isDisabled={group?.parentteamId === null}


                        // onChange={handleGroupChange}
                        // onFocus={handleInputFocus}
                        />

                        <Box>
                            <Menu isOpen={isGroupMenuOpen}>
                                <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                <MenuList position="absolute" width='384px' right={0} top={'35px'}>

                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                        No results found
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </InputGroup>
                    <Box w="full" h="40px"></Box>
                </HStack>

                <Divider />
            </Stack>


            <Stack
                direction="row"
                spacing={5}
                px={4}
                justifyContent="space-between"
                ml={7}
            >
                <Button
                    size="md"
                    variant="outline"
                    onClick={() => {
                        setEditedGroup(group);
                        setChangesMade(false);
                    }}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                    borderRadius={4}
                    fontSize="base"
                >
                    Discard Changes
                </Button>
                <Button
                    size="md"
                    onClick={handleSaveChanges}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                    borderRadius={4}
                >
                    Save Changes
                </Button>
            </Stack>
        </Box>
    );
};

export default TeamSetting;
