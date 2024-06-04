import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import AccessOverview from "../../../components/AM-Component/AM-BusinessGroup/AccessOverview";
import Nav from "../../../components/NavbarHome";
import Sidebar from "../../../components/sidebar";
import sections from "../utils/AM-sidebar";



export default function AMAccessOverview({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('BusinessGroups');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">
                <Nav name={name} pathValue={pathValue} />
                <div className="Wrapper">
                    <Flex w={'100%'} h={'100%'} flex={1}>
                        <Sidebar
                            sections={sections}
                            activeItem={activeItem}
                            onItemSelect={handleItemSelect}
                        />

                        <AccessOverview />

                    </Flex>
                </div>
            </div>
        </>
    );
}
