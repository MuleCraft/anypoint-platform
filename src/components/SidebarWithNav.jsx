import { Box, VStack, useColorModeValue, Link, Text, Heading, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, ModalFooter, Button, useDisclosure, Divider, Flex, FormLabel, Input, HStack } from '@chakra-ui/react';
import "../assets/Common.css";


const Sidebar = ({ sections, activeItem, onItemSelect, name }) => {

    const isActive = (itemName) => {
        return activeItem === itemName;
    };

    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log("section", name)

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
            {name === "Api Manager" && (
                <Box p={5}>
                    <Button height="38px" width="150px" borderRadius="0" variant="homePageButtons" onClick={onOpen}><Text fontSize="12px" fontWeight={"xs"}>SANDBOX</Text></Button>
                    <Modal onClose={onClose} isOpen={isOpen} >
                        <ModalOverlay />
                        <ModalContent borderRadius="0" maxW="600px">

                            <Box bg="modelColor" borderRadius="0px" >
                                <ModalHeader color="#747474" fontSize="23px " fontWeight="400">Switch Environment</ModalHeader>
                            </Box>
                            <Divider />

                            <Flex direction="column" align="left" justify="center">
                                <Box width="full" bgColor="#E5E5E5" mt={10} mb={10} borderRightColor="linkTestUseDomain" borderLeftColor="linkTestUseDomain" borderWidth={2}>
                                    <HStack p={2} spacing={5} ml="50px">
                                        <Text fontSize="sm" color="navText">
                                            Sandbox
                                        </Text>

                                        <Text fontSize="sm" color="activeColor">
                                            Active
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
                                    <Flex gap={5}>
                                        <Button borderRadius="0" variant="homePageButtons" onClick={onClose} variant="homePageButtons"><Text fontSize="xs">Cancel</Text></Button>
                                        <Button type="submit" variant="formButtons" borderRadius="0">
                                            Switch
                                        </Button>
                                    </Flex>
                                </Box>
                            </ModalFooter>

                        </ModalContent>
                    </Modal>
                </Box>
            )}


            {sections.map((section, sectionIndex) => (
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
                                h="5"
                                w="1"
                                className='access_box'
                                bg={isActive(item.name) ? useColorModeValue('boxColor', 'boxColor') : 'transparent'}
                            />
                            <Text fontSize="base" fontWeight="600" color={isActive(item.name) ? useColorModeValue('boxColor', 'boxColor') : undefined} fontFamily="formCompTexts">{item.label}</Text>
                        </Link>
                    ))}
                </VStack>

            ))}

        </Box>
    );
};

export default Sidebar;
