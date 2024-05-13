import { Box, Flex } from "@chakra-ui/react";


import { useState } from "react";

import { RuntimeServersSandbox } from "../../../../components/Runtime-Manager/Sandbox/Servers-Sandbox";
import Nav from "../../../../components/NavbarHome";
import Sidebar from "../../../../components/sidebar";
import RuntimeSection from "../../utils/RM-sidebar";

export default function ServersSandbox({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('Servers');
    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <div className="home">
            <Nav name={name} pathValue={pathValue} />
            <div className="Wrapper">
                <Flex>
                    <Box>
                        <Sidebar
                            name={name}
                            sections={RuntimeSection}
                            activeItem={activeItem}
                            onItemSelect={handleItemSelect}
                        />
                    </Box>
                    <Flex direction="column" w="full" ml="200" mt="200">
                        <Box p="4" w="100%" alignItems="center" justifyContent="center" mt="-140px">
                            <RuntimeServersSandbox />
                        </Box>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}