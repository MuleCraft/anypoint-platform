import { useState } from "react";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import TeamSetting from "../../../components/AM-Component/AM-Teams/TeamsSettings";


export default function AMTeamsSettings({ name }) {
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
                        activeItem={activeItem} // The name of the currently active item
                        onItemSelect={handleItemSelect} // Function to handle item selection
                    />
                    <TeamSetting />
                </div>
            </div >
        </>
    );
}
