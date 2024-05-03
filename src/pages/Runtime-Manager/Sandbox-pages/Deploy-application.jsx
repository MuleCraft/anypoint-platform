import { Box, Flex } from "@chakra-ui/react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import { useState } from "react";
import RuntimeSection from "../utils/AM-sidebar";
import { DeployApplicationForm } from "../../../components/Runtime-Manager/Sandbox/Deploy-applicationForm";

export default function DeployApplicationSandbox({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('');
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
                        <Box p="4" w="100%" alignItems="center" justifyContent="center" mt="-130px">
                            <DeployApplicationForm />
                        </Box>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}