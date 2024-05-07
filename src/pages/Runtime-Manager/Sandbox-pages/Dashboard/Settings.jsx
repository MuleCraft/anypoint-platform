import { Box, Flex } from "@chakra-ui/react";

import { useState } from "react";
import Nav from "../../../../components/NavbarHome";
import Sidebar from "../../../../components/sidebar";
import RuntimeDashboardSection from "../../utils/RMDashboard";
import { SandboxSetting } from "../../../../components/Runtime-Manager/Sandbox/Dashboard/SandboxSettings";


export default function SandboxSettingmain({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('Setting');
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
                            sections={RuntimeDashboardSection}
                            activeItem={activeItem}
                            onItemSelect={handleItemSelect}
                        />

                    </Box>
                    <Flex direction="column" w="full" ml="200" mt="75">
                        <SandboxSetting />
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}