import { useState } from "react";
import { Button, Stack, Flex, Box, Text, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Nav from "../../components/NavbarHome";
import Sidebar from "../../components/sidebar";
import sections from "../utils/AM-sidebar";
import CreateBusinessGroup from "../../components/AM-Component/CreateBusinessGroup";
import { FiSearch } from "react-icons/fi";

export default function AMBusinessGroup({ name, pathValue }) {
    const [activeItem, setActiveItem] = useState('BusinessGroups');


    const handleItemSelect = (itemName) => {
        setActiveItem(itemName);
    };
    return (
        <>
            <div className="home">
                <Nav name={name} pathValue={pathValue} />
                <div className="Wrapper">
                <Flex>
                        <Box>
                            <Sidebar
                                sections={sections}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            />
                        </Box>
                        <Flex direction="column" ml="200" mt="150">
                            {/* <HorizontalSidebar
                                sections={userTab}
                                activeItem={activeItem}
                                onItemSelect={handleItemSelect}
                            /> */}

                            <Stack p={'20px 25px'} mt={"-60px"} direction={'row'} spacing={6}>
                                <CreateBusinessGroup />
                                <Text fontSize={14} color={'#747474'} fontWeight={500}>
                                Business groups are isolated scopes for managing access. Users and teams may access resources in a business group through their permissions.
                                </Text>
                                <InputGroup maxW={'fit-content'}>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<FiSearch/>}
                                        color="gray.500"
                                    />
                                    <Input placeholder="Filter Business Group" />
                                </InputGroup>
                            </Stack>
                        </Flex>
                    </Flex>
                </div>
            </div>
        </>
    );
}
