import { Box, Flex } from "@chakra-ui/react";

import { useState } from "react";
import Nav from "../../../../components/NavbarHome";
import Sidebar from "../../../../components/sidebar";
import RuntimeDashboardSection from "../../utils/RMDashboard";
import { DashboardMain } from "../../../../components/Runtime-Manager/Sandbox/Dashboard/DashboardMain";
import { useParams } from "react-router-dom";


export default function SandboxDashboard({ name, pathValue }) {
    const { name: value } = useParams();
    const [activeItem, setActiveItem] = useState('Dashboard');
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

                        <DashboardMain />
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}