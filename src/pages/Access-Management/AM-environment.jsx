import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "./utils/AM-sidebar";
import { Flex } from "@chakra-ui/react";
import BGEnvironment from "../../components/AM-Component/BGEnvironment";




export default function AMEnvironment({ name, pathValue }) {
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

                        < BGEnvironment />

                    </Flex>
                </div>
            </div>
        </>
    );
}
