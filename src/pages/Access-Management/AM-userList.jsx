import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "../utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import HorizontalSidebar from "../../components/HorizontalSidebar";
import userTab from "../utils/AM-userTab";
import UserInvite from "../../components/AM-Component/userInvite";


export default function AMUserList({ name }) {
    const [activeItem, setActiveItem] = useState('users');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">
                <Nav name={name} />
                <div className="Wrapper">
                    <Flex>
                        <Box>
                            <Sidebar
                                sections={sections}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />
                        </Box>
                        <Flex direction="column" ml="200" mt="200" zIndex="-0">
                            <HorizontalSidebar
                                sections={userTab}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />

                            <Box p="4" mt={"-60px"}>
                                <UserInvite />
                            </Box>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </>
    );
}
