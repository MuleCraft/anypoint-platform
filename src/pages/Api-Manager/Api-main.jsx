import { Box, Flex } from "@chakra-ui/react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import ApiSection from "./utils/AM-sidebar";
import { useState } from "react";

export default function AMUserList({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('APIAdministration');
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
                            sections={ApiSection}
                            activeItem={activeItem}
                            onItemSelect={handleItemSelect}
                        />
                    </Box>
                </Flex>
            </div>
        </div>
    );
}