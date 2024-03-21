import { Box, VStack, useColorModeValue, Link, Text, Heading } from '@chakra-ui/react';
import "../assets/Common.css";


const Sidebar = ({ sections, activeItem, onItemSelect }) => {

    const isActive = (itemName) => {
        return activeItem === itemName;
    };

    return (
        <Box
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: "200px" }}
            pos="fixed"
            h="full"
            mt="65px"
        >
            {/* Map through each section to render its heading and items */}
            {sections.map((section, sectionIndex) => (
                <VStack
                    key={sectionIndex}
                    align="flex-start"
                    spacing={1}
                    pt={5}
                >
                    <Heading fontFamily="formCompTexts" fontSize="base" m={5}>{section.heading}</Heading>
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
