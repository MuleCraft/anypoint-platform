import { useState } from "react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "./utils/AM-sidebar";
import { Box, Flex } from "@chakra-ui/react";
import BGSettingsBreadcrumb from "../../components/AM-Component/BGSettingBreadcrub";




export default function AMSettingBreadcrumb({ name, pathValue }) {
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

                        < BGSettingsBreadcrumb />

                    </Flex>
                </div>
            </div>
        </>
    );
}