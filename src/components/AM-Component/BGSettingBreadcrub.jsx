import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Checkbox,
    Divider,
    Flex,
    HStack,
    Input,
    Stack,
    Text,
    Textarea,
    Button,
    InputGroup,
    InputRightElement,
    VStack,
    useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../Utils/supabase";
import FlexableTabs from "../FlexableTabs";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FiSearch } from "react-icons/fi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

const BGSettingsBreadcrumb = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    const [changesMade, setChangesMade] = useState(false);
    const toast = useToast();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await supabase
                    .schema("mc_cap_develop")
                    .from("businessgroup")
                    .select("*")
                    .eq("businessGroupId", id);

                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    setGroup(data[0]);
                    setEditedGroup(data[0]);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

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

                { name: 'Settings', label: 'Settings', path: `/accounts/businessGroups/${id}` },
                { name: 'AccessOverview', label: 'Access Overview', path: `/accounts/businessGroups/${id}/access` },
                { name: 'Child Groups', label: 'Child Groups', path: `/accounts/businessGroups/${id}/children` },
                { name: 'Environments', label: 'Environments', path: `/accounts/businessGroups/${id}/environments` },

            ],
        },

    ];



    return (
        <Box w={'100%'} h={'100%'} minW={0} flex={1} display={'flex'} flexDirection={'column'} ml={205} mt={'90px'}>
            <Flex alignItems="center" justify="space-between">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/businessGroups">
                            Business Groups
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
                {group?.childGroups !== false ? (
                    ""
                ) : (
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
                            <MenuItem fontSize="sm" color="red" onClick="">
                                Delete business group...
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
            <Box pt={7}>
                <FlexableTabs
                    sections={userId}
                    activeItem={activeItem}
                    onItemSelect={handleItemSelect}
                />
            </Box>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Business Group ID</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">{group?.businessGroupId}</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Client ID</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">
                            {group?.clientId}
                        </Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Client Secret</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">{group?.clientSecret}</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Name</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Input
                            fontSize="xs"
                            name="businessGroupName"
                            value={editedGroup?.businessGroupName || ""}
                            onChange={(e) => handleInputChange(e)}
                            size="sm"
                            width={500}
                            height={10}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Owner</Text>
                    </Box>
                    <Box w="1500px" h="40px">
                        <InputGroup right={2}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<FiSearch color="gray" />}
                            />
                            <Input
                                name="groupOwner"
                                placeholder="Select..."
                                value={editedGroup?.groupOwner || ""}
                                onChange={(e) => handleInputChange(e)}
                            />

                        </InputGroup>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" >

                    </Box>
                    <VStack w="1500px" h="80px" gap={4} alignItems="flex-start">
                        <Checkbox
                            size='lg'
                            color='boxColor'
                            defaultChecked
                            isDisabled
                            value={group?.canCreateChildGroup}
                        >
                            Can create a business groups
                        </Checkbox>
                        <Checkbox
                            size='lg'
                            color='boxColor'
                            defaultChecked
                            isDisabled
                            value={group?.canCreateEnvironments}
                        >
                            Can create a environments
                        </Checkbox>
                    </VStack>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Organization domain</Text>
                    </Box>
                    <Box w="full" h="40px">
                        <Input
                            fontSize="xs"
                            name="orgDomain"
                            value={editedGroup?.orgDomain || ""}
                            onChange={(e) => handleInputChange(e)}
                            size="sm"
                            width={500}
                            height={10}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5} >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Default session timeout</Text>
                    </Box>
                    <HStack w="full" h="80px" right={200}>
                        <Input
                            fontSize="xs"
                            name="sessionTimeout"
                            value={editedGroup?.sessionTimeout || ""}
                            onChange={(e) => handleInputChange(e)}
                            height={10}
                            type="number"
                        />
                        <Text>minutes</Text>
                    </HStack>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Confidentiality Notification</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Textarea
                            placeholder="Enter your confidentiality prompt"
                            value={editedGroup?.confidentialityNotification || ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" mt={5}>
                    <Box w="full" h="40px" mt={20}>

                    </Box>
                    <Box w="1500px" h="40px">
                        <Checkbox size='lg' color='boxColor' defaultChecked isDisabled>
                            Can create a business groups
                        </Checkbox>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
            </Stack>
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" >
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Runtime Manager</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Text fontSize="xs">
                            Default region</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <HStack justify="space-between" >
                    <Box w="full" h="40px" >
                    </Box>
                    <Box w="1500px" h="40px">
                        <InputGroup right={2}>
                            <InputRightElement
                                pointerEvents="none"
                                children={<ChevronDownIcon color="gray" />}
                            />
                            <Input
                                placeholder="US East (Ohio)"
                                value={editedGroup?.defaultRegion || ""}
                                onChange={(e) => handleInputChange(e)}
                                isDisabled
                            />
                        </InputGroup>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
                <Divider mt={5} />
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
                >
                    Discard Changes
                </Button>
                <Button
                    size="md"
                    onClick={handleSaveChanges}
                    colorScheme="blue"
                    isDisabled={!changesMade}
                >
                    Save Changes
                </Button>
            </Stack>

            <Divider mt={5} />
            <Stack spacing={1} mt={7} mb={7} ml={7}>
                <HStack justify="space-between" alignItems="center">
                    <Box w="full" h="40px">
                        <Text fontSize="xs">Audit Log Retention Period</Text>
                    </Box>
                    <Box w="full" h="20px">
                        <Text fontSize="xs">365 days</Text>
                    </Box>
                    <Box w="full" h="40px"></Box>
                </HStack>
            </Stack>
        </Box>
    );
};

export default BGSettingsBreadcrumb;
