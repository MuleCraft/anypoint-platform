import { Flex, VStack, Box, useColorModeValue, Link, HStack } from '@chakra-ui/react';
import "../assets/Common.css";

const HorizontalSidebar = ({ sections, selectedItem, onItemSelect }) => {
    const isActive = (itemName) => selectedItem === itemName;

    return (
        <Flex
            bg={useColorModeValue('white', 'gray.900')}
            borderBottom="2px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            w="full"
            h="auto"
            position="fixed"
            top="20"
            zIndex={0}
        >
            {sections.map((section) => (
                // eslint-disable-next-line react/jsx-key
                <Box mr={1}>
                    <HStack spacing={2}>
                        {section.items.map((item) => (
                            <VStack
                                key={item.name}
                                spacing={0}
                                align="center"
                            >
                                <Link
                                    p={2}
                                    rounded={'md'}
                                    onClick={() => onItemSelect(item.name)}
                                    href={item.path}
                                    color={isActive(item.name) ? "boxColor" : "black"}
                                    _hover={{ color: "boxColor", textDecoration: "underline" }}
                                >
                                    {isActive() ?
                                        <Box p={"3px"} borderColor={'boxColor'} bg={"#fff"} borderWidth={"2px"} borderRadius={4} color={isActive(item.name) ? useColorModeValue('boxColor') : undefined}>
                                            {item.label}
                                        </Box>
                                        :
                                        <>{item.label}</>
                                    }
                                </Link>
                                <Box
                                    h="3px"
                                    w="full"
                                    borderRadius="30px"
                                    bg={isActive() ? useColorModeValue('boxColor') : 'transparent'}
                                />
                            </VStack>
                        ))}
                    </HStack>
                </Box>
            ))}
        </Flex>
    );
};

export default HorizontalSidebar;
