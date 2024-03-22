import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "./utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import HorizontalSidebar from "../../components/HorizontalSidebar";
import userTab from "./utils/AM-userTab";
import PendingInvitation from "../../components/AM-Component/pendingInvitation";


export default function AMPending({ name }) {
    const [activeItem, setActiveItem] = useState('PendingInvitations');


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
                        <Flex direction="column" w="full" ml="200" mt="200">
                            <HorizontalSidebar
                                sections={userTab}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />
                            <Box p="4" w="100%" alignItems="center" justifyContent="center" >
                                <PendingInvitation />
                            </Box>
                        </Flex>
                    </Flex>
                </div>
            </div >
        </>
    );
}
