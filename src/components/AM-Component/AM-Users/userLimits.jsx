import { useEffect, useContext, useState } from "react";
import adminAuthClient from "../../../Utils/api";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Box,
    Breadcrumb,
    useToast,
} from "@chakra-ui/react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import FlexableTabs from "../../FlexableTabs";
import supabase from "../../../Utils/supabase";

import axios from "axios";
import { AuthContext } from "../../../Utils/AuthProvider";
const UserLimits = () => {
    const { id } = useParams();
    const [activeItem, setActiveItem] = useState("Limits");
    const { userData } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const toast = useToast();
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data, error } = await adminAuthClient.listUsers();
                const user = data.users.find((user) => user.id === id);
                if (error) {
                    console.error("Error fetching user data:", error.message);
                } else {
                    console.log("User data fetched successfully");

                    setUser(user);

                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);





    const cancelInvitation = async () => {
        const role = userData?.role;
        const token = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

        try {
            if (role === "Admin" || userData?.id === id) {
                const { response } = await axios.post(
                    import.meta.env.VITE_CANCEL_INVITE,
                    { userId: id, role },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (userData?.id === id) {
                    await supabase.auth.signOut();
                    window.location.href = "/login";
                } else {
                    window.location.href = "/accounts/users";
                }
                console.log("Deleted successfully");
                toast({
                    title: "Deleted Successfully",
                    description: response.data?.message || "User has been deleted",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                });
            } else {
                throw new Error("You do not have permission to delete this user");
            }
        } catch (error) {
            toast({
                title: "Permission Denied",
                description:
                    error.message || "You do not have permission to delete users",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    };

    const handleRequestCredentials = async () => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                throw new Error(error.message);
            }

            toast({
                title: "Send reset Password link",
                description: "check your email ",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            window.location.reload();
        } catch (error) {
            ""
        }
    };

    const userId = [
        {
            heading: 'Access Management',
            items: [
                { name: 'Permissions', label: 'Permissions', path: `/accounts/users/${id}/permissions` },
                { name: 'Memberships', label: 'Memberships', path: `/accounts/users/${id}/teams` },
                { name: 'Settings', label: 'Settings', path: `/accounts/users/${id}/settings` },
                { name: 'Limits', label: 'Limits', path: `/accounts/users/${id}/limits` },
            ],
        },

    ];

    return (
        <Box mt="-60px">
            <Flex alignItems="center" justify="space-between" ml={7}>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink fontSize="lg" href="/accounts/users/">
                            Users
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            fontSize="lg"
                            fontWeight="600"
                            href={`/accounts/users/${user?.id}`}
                        >
                            {user?.user_metadata.full_name}
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
                    />
                    <MenuList borderRadius={0}>
                        <MenuItem fontSize="sm" onClick={handleRequestCredentials}>
                            Reset Password...
                        </MenuItem>
                        <MenuItem fontSize="sm" isDisabled>
                            Reset Multi-factor auth...
                        </MenuItem>
                        <MenuItem fontSize="sm" color="red">
                            Disable user...
                        </MenuItem>
                        <MenuItem fontSize="sm" color="red" onClick={cancelInvitation}>
                            Delete user...
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

        </Box>
    );
};

export default UserLimits;
