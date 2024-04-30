import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { BsCloudFog2 } from "react-icons/bs";
import { MdOutlineCloud } from "react-icons/md";

const options = [
    {
        value: "CloudHub",
        label: (
            <Flex gap={3}>
                <span>
                    <MdOutlineCloud size={20} />
                </span>
                CloudHub
            </Flex>
        ),
    },
    {
        value: "Hybrid",
        label: (
            <Flex gap={3}>
                <span className="icon1 pr-2">
                    <BsCloudFog2 size={20} />
                </span>
                Hybrid
            </Flex>
        ),
    },
];

const versions = [
    {
        value: "version:4.4.0",
        label: (
            <Flex gap={3}>
                1.0.0 - Min. Runtime version:4.4.0
            </Flex>
        ),
    },

];
const env = [
    {
        value: "Sandbox",
        label: (
            <Flex gap={3}>
                Sandbox
            </Flex>
        ),
    },

];
const Release = [
    {
        value: "Edge",
        label: (
            <Flex gap={3}>

                Edge
            </Flex>

        ),
    },
    {
        value: "Long-Term Support",
        label: (
            <Flex gap={3}>
                Long-Term Support
            </Flex>

        ),
    },
    {
        value: "  None",
        label: (
            <Flex gap={3}>
                None
            </Flex>

        ),
    },

];

const RuntimeVersion = [
    {
        value: "4.6.2:5e",
        label: (
            <Flex gap={3}>
                4.6.2:5e
            </Flex>

        ),
    },
    {
        value: " View Release Notes",
        label: (
            <Flex gap={3}>
                View Release Notes
            </Flex>
        ),
    },


];
const WorkerCount = [
    {
        value: "1",
        label: (
            <Flex gap={3}>
                1
            </Flex>

        ),
    },
    {
        value: "2",
        label: (
            <Flex gap={3}>
                2
            </Flex>
        ),
    },
    {
        value: "3",
        label: (
            <Flex gap={3}>
                3
            </Flex>
        ),
    },
    {
        value: "4",
        label: (
            <Flex gap={3}>
                4
            </Flex>
        ),
    },
    {
        value: "5",
        label: (
            <Flex gap={3}>
                5
            </Flex>
        ),
    },
    {
        value: "6",
        label: (
            <Flex gap={3}>
                6
            </Flex>
        ),
    },
    {
        value: "7",
        label: (
            <Flex gap={3}>
                7
            </Flex>
        ),
    },
    {
        value: "8",
        label: (
            <Flex gap={3}>
                8
            </Flex>
        ),
    },


];

const WorkerSize = [
    {
        value: "1",
        label: (
            <Stack >
                <Box >
                    0.1 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    500MB Memory
                </Text>
            </Stack>

        ),
    },
    {
        value: "2",
        label: (
            <Stack >
                <Box >
                    0.2 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    1GB Memory
                </Text>
            </Stack>
        ),
    },
    {
        value: "3",
        label: (
            <Stack >
                <Box >
                    1 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    2GB Memory
                </Text>
            </Stack>
        ),
    },
    {
        value: "4",
        label: (
            <Stack >
                <Box >
                    2 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    4GB Memory
                </Text>
            </Stack>
        ),
    },
    {
        value: "5",
        label: (
            <Stack >
                <Box >
                    4 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    8GB Memory
                </Text>
            </Stack>
        ),
    },
    {
        value: "6",
        label: (
            <Stack >
                <Box >
                    8 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    500MB Memory
                </Text>
            </Stack>
        ),
    },
    {
        value: "7",
        label: (
            <Stack >
                <Box >
                    16 vCores
                </Box>
                <Text fontSize="10" pl={5} >
                    32GB Memory
                </Text>
            </Stack>
        ),
    },
];


const Logger = [
    {
        value: "1",
        label: (
            <Flex gap={3}>
                TRACE
            </Flex>

        ),
    },
    {
        value: "2",
        label: (
            <Flex gap={3}>
                DEBUG
            </Flex>
        ),
    },
    {
        value: "3",
        label: (
            <Flex gap={3}>
                WARN
            </Flex>
        ),
    },
    {
        value: "4",
        label: (
            <Flex gap={3}>
                ERROR
            </Flex>
        ),
    },
    {
        value: "5",
        label: (
            <Flex gap={3}>
                INFO
            </Flex>
        ),
    },

];


const RMModel = [
    {
        value: "4.6.2:5e",
        label: (
            <Flex gap={3}>
                Any Deployment Model
            </Flex>

        ),
    },
    {
        value: " View Release Notes",
        label: (
            <Flex gap={3}>
                CloudHub
            </Flex>
        ),
    },


];

const RMChannel = [
    {
        value: "4.6.2:5e",
        label: (
            <Flex gap={3}>
                Any Release Channel
            </Flex>

        ),
    },
    {
        value: " View Release Notes",
        label: (
            <Flex gap={3}>
                Edge Release Channel
            </Flex>
        ),
    },


];
export { options, versions, Release, RuntimeVersion, WorkerCount, WorkerSize, Logger, env, RMModel, RMChannel };
