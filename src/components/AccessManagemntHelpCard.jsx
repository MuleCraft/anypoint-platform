
import { Box, Text, VStack, MenuItem, HStack, Flex, Divider } from "@chakra-ui/react";
import { PiChatsFill, PiBookOpenText } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { LiaUserGraduateSolid } from "react-icons/lia";
import { ImCompass2 } from "react-icons/im";
import React, { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import "../assets/Common.css"
const ContentMapping = {
    "Anypoint Platform": [
        {
            icon: <PiBookOpenText size="25" />,
            text: "Publishing API Specifications"
        },
        {
            icon: <PiBookOpenText size="33" />,
            text: "Create an API Specification with the Text Editor"
        },
        {
            icon: <PiBookOpenText size="38" />,
            text: "API Specification for MuleSoft Connectivity Ecosystem"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Documentation"
        },
        {
            icon: <PiChatsFill size={25} />,
            text: "Forums"
        },
        {
            icon: <BiSupport size={25} />,
            text: "Help Center"
        },
        {
            icon: <LiaUserGraduateSolid size={25} />,
            text: "Training"
        },
        {
            icon: <ImCompass2 size={25} />,
            text: "Tutorials"
        }
    ],

    "Access Management": [
        {
            icon: <PiBookOpenText size="25" />,
            text: "About Access Management"
        },
        {
            icon: <PiBookOpenText size="33" />,
            text: "Access Management Release Notes"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Manage Permissions"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Documentation"
        },
        {
            icon: <PiChatsFill size={25} />,
            text: "Forums"
        },
        {
            icon: <BiSupport size={25} />,
            text: "Help Center"
        },
        {
            icon: <LiaUserGraduateSolid size={25} />,
            text: "Training"
        },
        {
            icon: <ImCompass2 size={25} />,
            text: "Tutorials"
        }
    ],

    "Api Manager": [
        {
            icon: <PiBookOpenText size="25" />,
            text: "Anypoint Runtime Manager"
        },
        {
            icon: <PiBookOpenText size="33" />,
            text: "Runtime Manager Agent"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Runtime Manager Agent Api"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Documentation"
        },
        {
            icon: <PiChatsFill size={25} />,
            text: "Forums"
        },
        {
            icon: <BiSupport size={25} />,
            text: "Help Center"
        },
        {
            icon: <LiaUserGraduateSolid size={25} />,
            text: "Training"
        },
        {
            icon: <ImCompass2 size={25} />,
            text: "Tutorials"
        }
    ],
    "Runtime Manager": [
        {
            icon: <PiBookOpenText size="25" />,
            text: "Anypoint Api Manager"
        },
        {
            icon: <PiBookOpenText size="33" />,
            text: "Getting Started with Management an Api"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Gateway Policies in an Api Manager"
        },
        {
            icon: <PiBookOpenText size="25" />,
            text: "Documentation"
        },
        {
            icon: <PiChatsFill size={25} />,
            text: "Forums"
        },
        {
            icon: <BiSupport size={25} />,
            text: "Help Center"
        },
        {
            icon: <LiaUserGraduateSolid size={25} />,
            text: "Training"
        },
        {
            icon: <ImCompass2 size={25} />,
            text: "Tutorials"
        }
    ],


};

export default function DynamicContent({ name }) {

    const content = ContentMapping[name] || ContentMapping["default"];
    const [isClicked, setIsClicked] = useState(false);

    return (
        <Box>
            {(name === "Access Management") && (
                <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">

                    ACCESS MANAGEMENT HELP
                </Text>

            )}

            {(name === "Anypoint Platform") && (
                <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">

                    ANYPOINT PLATFORM HELP
                </Text>

            )}

            {(name === "Api Manager") && (
                <Box
                    p="5"
                    borderWidth={2}
                    borderRadius={10}
                    borderColor={isClicked ? "boxColor" : "transparent"}
                    bg={isClicked ? "gray.100" : "transparent"}
                    onClick={() => setIsClicked(!isClicked)}
                    _hover={{ bg: "#e5e5e5" }}
                >
                    <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">
                        QUICK START
                    </Text>
                    <Text fontSize="sm" fontWeight="small" py={1} mb="5px">
                        Deploying and managing your first API
                    </Text>
                    <Divider />
                    <Text fontSize="12px" fontWeight="250px" py={1} mb="10px" maxW={350}>
                        Experience how you can deploy, manage, and analyze your applications quickly and easily with Anypoint Platform.
                    </Text>
                    <Flex alignItems="center">
                        <Text fontSize="14px" fontWeight="200px" maxW={300}>Learn more </Text>
                        <ArrowForwardIcon h="20px" />
                    </Flex>
                </Box>

            )}
            {(name === "Api Manager") && (
                <Text fontSize="xs" fontWeight="medium" py={1} mt="5px" mb="10px">

                    API MANAGER HELP
                </Text>

            )}

            {(name === "Runtime Manager") && (
                <Text fontSize="xs" fontWeight="medium" py={1} mt="5px" mb="10px">

                    RUNTIME MANAGER HELP
                </Text>

            )}

            <VStack fontSize="xs" maxW="250px">
                {content.map((item, index) => (
                    <MenuItem
                        key={index}
                        border="1px solid #fff"
                        padding="2px"
                        borderRadius="4px"
                        _hover={{ bg: "#e5e5e5" }}
                    >
                        <HStack>
                            {React.cloneElement(item.icon, { size: item.size || 25 })}
                            <Text>{item.text}</Text>
                        </HStack>
                    </MenuItem>
                ))}
            </VStack>
        </Box>
    );
}
