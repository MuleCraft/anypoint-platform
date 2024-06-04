import { useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";

import { Box, Flex } from "@chakra-ui/react";


import UserNameBreadcrumb from "../../../components/AM-Component/AM-Users/UserNameBreadcrumb";



export default function AMUserBreadcrumb({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('users');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">
                <Nav name={name} pathValue={pathValue} />
                <div className="Wrapper">
                    <Flex>
                        <Box>
                            <Sidebar
                                sections={sections}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />
                        </Box>
                        <Flex direction="column" w="full" ml="180" mt="200">


                            <Box p="4" w="100%" alignItems="center" justifyContent="center" mt="-60px">
                                <UserNameBreadcrumb />
                            </Box>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </>
    );
}
