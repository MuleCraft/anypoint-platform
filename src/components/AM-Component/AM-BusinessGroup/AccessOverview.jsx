import { useEffect, useState } from "react";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    // useToast,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
    Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import supabase from "../../../Utils/supabase";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import FlexableTabs from "../../FlexableTabs";

const AccessOverview = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [editedGroup, setEditedGroup] = useState(null);
    // const [changesMade, setChangesMade] = useState(false);
    // const toast = useToast();
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

        </Box>
    );
};

export default AccessOverview;
