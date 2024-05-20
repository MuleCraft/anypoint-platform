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
                        {/* <Box> */}
                        <Sidebar
                            sections={sections}
                            activeItem={activeItem}
                            onItemSelect={handleItemSelect}
                        />
                        {/* </Box> */}
                        {/* <Flex direction="column" mt="130" flex={1} w={'100%'}> */}
                        {/* <Box p="4" w="100%" alignItems="center" justifyContent="center" mt="-60px"> */}
                        < BGSettingsBreadcrumb />
                        {/* </Box> */}
                        {/* </Flex> */}
                    </Flex>
                </div>
            </div>
        </>
    );
}
