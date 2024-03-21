import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "../utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import HorizontalSidebar from "../../components/HorizontalSidebar";
import userTab from "../utils/AM-userTab";


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
                        <Flex direction="column" w="full" m="200">
                            <HorizontalSidebar
                                sections={userTab}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />

                            <Box p="4" flex="1">

                                <h1>Hello, World!</h1>
                                <p>This is the main content area below the horizontal sidebar.</p>

                            </Box>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </>
    );
}
