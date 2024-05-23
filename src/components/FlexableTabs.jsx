import { Flex, VStack, Box, useColorModeValue, Link, HStack, Divider, Text } from '@chakra-ui/react';
import "../assets/Common.css";

const FlexableTabs = ({ sections, activeItem, onItemSelect }) => {
    const isActive = (itemName) => activeItem === itemName;

    return (

        <Flex
            bg={useColorModeValue('white', 'gray.900')}
            borderTop="2px"
            borderBottom="2px"
            borderTopColor={useColorModeValue('gray.200', 'gray.700')}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            w="full"
            h="auto"
            top="30%"
            zIndex={0}
        >

            {sections.map((section, sectionIndex) => (
                <Box key={sectionIndex} mr={2} >
                    <HStack spacing={2} ml={5}>
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
                                    {isActive(item.name) ?
                                        <Box p={"7px"} borderColor={'boxColor'} bg={"#fff"} borderWidth={"2px"} borderRadius={4} color={isActive(item.name) ? useColorModeValue('boxColor') : undefined} width="auto">
                                            <Text fontSize="xs" fontWeight="600">{item.label}</Text>
                                        </Box>
                                        :
                                        <> <Text fontSize="xs">{item.label}</Text></>
                                    }
                                </Link>
                                <Box
                                    h="3px"
                                    w="full"
                                    borderRadius="30px"
                                    bg={isActive(item.name) ? useColorModeValue('boxColor') : 'transparent'}
                                />
                            </VStack>
                        ))
                        }
                    </HStack >
                </Box >
            ))}
        </Flex >
    );
};

export default FlexableTabs;
