import { Box, Divider, Flex, HStack, Text, Heading, Link } from "@chakra-ui/react";
import Nav from "../../components/NavbarHome";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


export default function ChooseEnv({ name, pathValue }) {
    const [selectedOption, setSelectedOption] = useState("");
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



    return (
        <div className="home">
            <Nav name={name} pathValue={pathValue} />
            <div className="Wrapper">
                <Flex>
                    <Flex direction="column" w="full" ml="400" mt="250">
                        <Box w="100%" alignItems="center" justifyContent="center" mt="-150px" maxW={1200}>
                            <Box borderRadius="0px" >
                                <Heading color="#3a3b3c" fontSize="23px " fontWeight="sm">Choose Environment</Heading>
                            </Box>
                            <Flex direction="column"  >
                                <Link href="/cloudhub/design/home/applications">
                                    <Box
                                        width="full"
                                        bgColor={selectedOption === "Design" ? "#efefef" : ""}
                                        py={1}
                                        onClick={() => handleOptionClick("Design")}
                                        cursor="pointer"
                                        _hover={{
                                            bg: "#efefef"
                                        }}
                                    >
                                        <HStack py={2} >
                                            <Text fontSize="sm" color="navText" align="left">
                                                Design
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Link>
                                <Divider />
                                <Link href="/cloudhub/sandbox/home/applications?option=Sandbox">
                                    <Box
                                        width="full"
                                        bgColor={selectedOption === "Sandbox" ? "#efefef" : ""}
                                        mt={1}
                                        py={1}


                                        onClick={() => handleOptionClick("Sandbox")}
                                        cursor="pointer"
                                        _hover={{
                                            bg: "#efefef"
                                        }}
                                    >
                                        <HStack py={2}>
                                            <Text fontSize="sm" color="navText">
                                                Sandbox
                                            </Text>

                                        </HStack>

                                    </Box>
                                    <Divider />
                                </Link>
                            </Flex>
                            <Box alignItems="center" display="flex" justifyContent="space-between" width="full" py={8}>
                                <Link fontSize="xs" color="boxColor">
                                    <Text fontSize="sm" textColor="boxColor">Open your profile to set the default environment...</Text>

                                </Link>

                            </Box>

                        </Box>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}