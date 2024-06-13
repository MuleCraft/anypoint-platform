import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Flex,
    Stack,
    HStack,
    InputGroup,
    InputLeftElement,
    Input,
    Text,
    InputRightElement,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import FlexableTabs from "../../FlexableTabs";
import { FiSearch } from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";

const AccessOverview = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);

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
    }, [id]);

    const [activeItem, setActiveItem] = useState("AccessOverview");

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
                    )}
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
            <Stack mt={"25px"} direction={"row"} spacing={4} align={'center'} justify={'space-between'} px={5}>
                <HStack spacing={2} alignItems="center">
                    <Text fontSize={14} color={"#747474"} fontWeight={500} minW={70}>
                        Showing all
                    </Text>
                    <InputGroup mt={1} zIndex={3}>
                        <InputRightElement
                            pointerEvents="none"
                            children={<SlArrowDown />}
                            color="gray.500"
                        />
                        <Input
                            placeholder="Select..."
                            autoComplete="off"
                            fontSize={14}
                            color={'#000000'}
                            value={group?.teamname}
                            isDisabled={group?.parentteamId === null}
                        />
                        <Box>
                            <Menu>
                                <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                <MenuList position="absolute" width='384px' right={0} top={'35px'}>
                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                        No results found
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </InputGroup>
                    <Text fontSize={14} color={"#747474"} fontWeight={500} minW={20}>
                        with
                    </Text>
                    <InputGroup mt={1} zIndex={3}>
                        <InputRightElement
                            pointerEvents="none"
                            children={<SlArrowDown />}
                            color="gray.500"
                        />
                        <Input
                            placeholder="Select..."
                            autoComplete="off"
                            fontSize={14}
                            color={'#000000'}
                            value={group?.teamname}
                            isDisabled={group?.parentteamId === null}
                        />
                        <Box>
                            <Menu>
                                <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                <MenuList position="absolute" width='384px' right={0} top={'35px'}>
                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                        No results found
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </InputGroup>
                    <Text fontSize={14} color={"#747474"} fontWeight={500} width={180} minW={80}>
                        permission in
                    </Text>
                    <InputGroup mt={1} zIndex={3}>
                        <InputRightElement
                            pointerEvents="none"
                            children={<SlArrowDown />}
                            color="gray.500"
                        />
                        <Input
                            placeholder="Select..."
                            autoComplete="off"
                            fontSize={14}
                            color={'#000000'}
                            value={group?.teamname}
                            isDisabled={group?.parentteamId === null}
                        />
                        <Box>
                            <Menu>
                                <MenuButton as="div" width="100%" height="0" visibility="hidden" />
                                <MenuList position="absolute" width='384px' right={0} top={'35px'}>
                                    <MenuItem disabled fontStyle={'italic'} color={'gray.500'} fontWeight={500}>
                                        No results found
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </InputGroup>
                </HStack>
                <InputGroup maxW={"fit-content"} ml={0}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<FiSearch />}
                        color="gray.500"
                    />
                    <Input placeholder="Filter business group" fontSize={14} fontWeight={500} />
                </InputGroup>
            </Stack>
        </Box>
    );
};

export default AccessOverview;
