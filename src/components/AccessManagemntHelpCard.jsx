
import { Box, Text, VStack, MenuItem, HStack } from "@chakra-ui/react";
import { PiChatsFill, PiBookOpenText } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";
import { LiaUserGraduateSolid } from "react-icons/lia";
import { ImCompass2 } from "react-icons/im";
import React from "react";

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


};

export default function DynamicContent({ name }) {

    const content = ContentMapping[name] || ContentMapping["default"];

    return (
        <Box>
            <Text fontSize="xs" fontWeight="medium" py={1} mb="10px">
                ACCESS MANAGEMENT HELP
            </Text>
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
