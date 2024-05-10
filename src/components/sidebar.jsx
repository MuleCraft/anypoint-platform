import { useState, useEffect } from "react";
import { Box, VStack, useColorModeValue, Link, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, Button, useDisclosure, Divider, Flex, FormLabel, Input, HStack } from '@chakra-ui/react';
import "../assets/Common.css";
import { useLocation } from 'react-router-dom';

const Sidebar = ({ sections, activeItem, onItemSelect, name }) => {
    const isActive = (itemName) => {
        return activeItem === itemName;
    };

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedOption, setSelectedOption] = useState("Design");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const option = searchParams.get('option');
        if (option) {
            setSelectedOption(option);
        }
    }, [location]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const switchPath = selectedOption === "Design" ? "/cloudhub/design/home/applications" :
        selectedOption === "Sandbox" ? "/cloudhub/sandbox/home/applications" : "/cloudhub/sandbox/home/applications/addapplication";


    const handleSwitch = () => {
        const searchParams = new URLSearchParams();
        searchParams.set('option', selectedOption);
        window.location.href = `${switchPath}?${searchParams.toString()}`;
    };

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: "190px" }}
            pos="fixed"
            h="full"
            mt="65px"
            alignItems="center"
            justifyContent="center"
        >
            {name === "Api Manager" || name === "Runtime Manager" && (
                <Box p={5}>
                    <Button height="38px" width="150px" borderRadius="0" variant="homePageButtons" onClick={onOpen}><Text fontSize="12px" fontWeight={"xs"}>{selectedOption === "Design" ? "DESIGN" : "SANDBOX"}</Text></Button>
                    <Modal onClose={onClose} isOpen={isOpen} >
                        <ModalOverlay />
                        <ModalContent borderRadius="0" maxW="600px">
                            <Box bg="modelColor" borderRadius="0px" >
                                <ModalHeader color="#747474" fontSize="23px " fontWeight="400">Switch Environment</ModalHeader>
                            </Box>
                            <Divider />
                            <Flex direction="column" align="left" justify="center">
                                <Box
                                    width="full"
                                    bgColor={selectedOption === "Design" ? "#efefef" : ""}
                                    mt={10}
                                    mb={1}
                                    borderRightColor={selectedOption === "Design" ? "linkTestUseDomain" : ""}
                                    borderLeftColor={selectedOption === "Design" ? "linkTestUseDomain" : ""}
                                    borderRightWidth="2px"
                                    borderLeftWidth="2px"
                                    onClick={() => handleOptionClick("Design")}
                                    cursor="pointer"
                                >
                                    <HStack p={2} spacing={4} ml="50px">
                                        <Text fontSize="sm" color="navText">
                                            Design
                                        </Text>
                                        <Text fontSize="xs" color="activeColor">
                                            {selectedOption === "Design" ? "Active" : ""}
                                        </Text>
                                    </HStack>
                                </Box>
                                <Box
                                    width="full"
                                    bgColor={selectedOption === "Sandbox" ? "#efefef" : ""}
                                    mt={1}
                                    mb={10}
                                    borderRightColor={selectedOption === "Sandbox" ? "linkTestUseDomain" : ""}
                                    borderLeftColor={selectedOption === "Sandbox" ? "linkTestUseDomain" : ""}
                                    borderRightWidth="2px"
                                    borderLeftWidth="2px"
                                    onClick={() => handleOptionClick("Sandbox")}
                                    cursor="pointer"
                                >
                                    <HStack p={2} spacing={4} ml="50px">
                                        <Text fontSize="sm" color="navText">
                                            Sandbox
                                        </Text>
                                        <Text fontSize="xs" color="activeColor">
                                            {selectedOption === "Sandbox" ? "Active" : ""}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Flex>
                            <Divider />
                            <ModalFooter>
                                <Box alignItems="center" display="flex" justifyContent="space-between" width="full">
                                    <Link fontSize="xs" color="boxColor" >
                                        Open your profile to change the default environment...
                                    </Link>
                                    <Button borderRadius="0" variant="homePageButtons" onClick={onClose}><Text fontSize="xs">Cancel</Text></Button>
                                    <Button type="submit" variant="formButtons" borderRadius="0" onClick={handleSwitch}>
                                        Switch
                                    </Button>
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
            )
            }
            {
                sections.map((section, sectionIndex) => (
                    <VStack
                        key={sectionIndex}
                        align="flex-start"
                        spacing={1}
                    >
                        {section.heading && (
                            <Heading fontFamily="formCompTexts" fontSize="base" m={5}>{section.heading}</Heading>
                        )}
                        {section.items.map((item) => (
                            <Link
                                key={item.name}
                                pr={1}
                                py={1}
                                rounded={'md'}
                                className='access-management__sidecomp'
                                onClick={() => onItemSelect(item.name)}
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                gap={4}
                                href={item.path}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <Box
                                    h="6"
                                    w="1"
                                    className='access_box'
                                    bg={isActive(item.name) ? useColorModeValue('boxColor', 'boxColor') : 'transparent'}
                                />
                                <Text fontSize="base" fontWeight="600" color={isActive(item.name) ? useColorModeValue('boxColor', 'boxColor') : undefined} fontFamily="formCompTexts">{item.label}</Text>
                            </Link>
                        ))}
                    </VStack>
                ))
            }
        </Box >
    );
};

export default Sidebar;
