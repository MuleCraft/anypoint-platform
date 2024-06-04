import { useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import AMCreateTeams from "../../../components/AM-Component/AM-Teams/CreateTeams";


export default function AMTeams({ name }) {
    const [activeItem, setActiveItem] = useState('teams');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">

                <Nav name={name} />
                <div className="Wrapper">
                    <Sidebar
                        sections={sections}
                        activeItem={activeItem}
                        onItemSelect={handleItemSelect}
                    />
                    <AMCreateTeams />
                </div>
            </div >
        </>
    );
}
