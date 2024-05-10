
import { Stack, Box, FormLabel, Text, Tag, RadioGroup, Radio, Divider, Checkbox, Tooltip, Flex } from "@chakra-ui/react"
import { InfoOutlineIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import SelectComponent from "../../../../SelectComponent"
import { Release, RuntimeVersion, WorkerCount, WorkerSize } from "../../SelectMenuDatas/DeploymentTarget"
export const RuntimeSettings = () => {
    const [value, setValue] = useState('1')
    return (
        <>
            <Stack display="flex" direction={["column", "row"]} py={2} >
                <Box width="20%" p={2}>
                    <FormLabel>Runtime version</FormLabel>
                </Box>
                <Box width="40%" p={2}>
                    <Stack flexDirection="column">
                        <Box>
                            <Box py={2} display="flex" alignItems="center" gap={2}>
                                <Text fontSize="xs" fontWeight="600">
                                    Release Channel
                                </Text>
                                <Tag size="sm" variant='outline' colorScheme='purple' fontSize="9px">New</Tag>
                            </Box>
                            <Box>
                                <SelectComponent options={Release} />
                            </Box>

                            <Box display="flex" alignItems="center" gap={1} py={2}>
                                <Text fontSize="xs">
                                    <InfoOutlineIcon width={3} color={"boxColor"} /> This channel releases a new minor version.
                                    <span style={{ display: 'inline-block' }}>
                                        <Tooltip hasArrow label='New minor versions are released in February, June and October. In other months, new patch versions are released.
Cloudhub and Cloudhub 2.0 apps are autoupdated during the third week of every month.' bg='gray.700' width="80%" fontSize="xs">
                                            <Text fontSize="xs" ml={1} display="inline" borderBottomWidth="1px" borderStyle="dashed" borderBottomColor="gray.400" >every four months.</Text>
                                        </Tooltip>
                                    </span>
                                    It has the latest features and shorter support windows.
                                    <Text color="boxColor" fontSize="xs" ml={1} display="inline">
                                        <Link>Learn more</Link>
                                    </Text>
                                </Text>
                            </Box>


                        </Box>
                        <Box py={2}>
                            <Box py={2} display="flex" alignItems="center" gap={2}>
                                <Text fontSize="xs" fontWeight="600">
                                    Java Version
                                </Text>
                                <Tag size="sm" variant='outline' colorScheme='purple' fontSize="9px">New</Tag>
                            </Box>

                            <Box display="flex" gap={1} >
                                <Text fontSize="xs" ><InfoOutlineIcon width={3} color={"boxColor"} /> Using Java 17 may require a different application resource profile. .</Text>
                                <Text color="boxColor" fontSize="xs"> <Link> Learn more </Link></Text>
                            </Box>
                            <RadioGroup onChange={setValue} value={value} >
                                <Stack direction='row' gap="5" py={3}>
                                    <Radio value='1' Color="gray.500">Java 18</Radio>
                                    <Radio value='2' Color="gray.500">Java 17</Radio>
                                </Stack>
                            </RadioGroup>
                        </Box>
                    </Stack>
                </Box >
                <Box width="40%" p={4}>
                    <Stack flexDirection="column">
                        <Box>
                            <Text fontSize="xs" fontWeight="600">
                                Runtime Version</Text>
                        </Box>
                        <Box><SelectComponent options={RuntimeVersion} /></Box>
                        <Box display="flex" flexDir="column" gap={2} >
                            <Box display="flex" gap={1} >
                                <InfoOutlineIcon color={"boxColor"} width={3} />
                                <Box display="flex" gap={1}>
                                    <Text fontSize="xs" > Mule Runtime uses semantic versioning. Each versions ends with a build number. Versions in the Edge channel are indicated with {"e"} at the end.<Link style={{ color: "#0376d3" }}> Learn more </Link> </Text>
                                </Box>
                            </Box>
                            <Box display="flex" gap={1}>
                                <TbBrandGoogleAnalytics color={"#a878fa"} style={{ width: 40 }} />
                                <Text fontSize="xs" >To use Monitoring and Visualizer with this version, you may need to enable the agent after deploying.<Link style={{ color: "#0376d3" }}> Learn more </Link> </Text>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Stack >
            <Divider />
            <Stack display="flex" direction={["column", "row"]} py={2} >
                <Box width="20%" p={2}>
                    <FormLabel>Workers</FormLabel>
                </Box>
                <Box width="40%" p={2}>
                    <Stack flexDirection="column">
                        <Box>
                            <Box py={2} display="flex" alignItems="center" gap={2}>
                                <Text fontSize="xs" fontWeight="600">
                                    Worker size
                                </Text>
                                <Tag size="sm" variant='outline' colorScheme='purple' fontSize="9px">New</Tag>
                            </Box>
                            <Box>
                                <SelectComponent options={WorkerSize} />

                            </Box>
                        </Box>

                    </Stack>
                </Box>
                <Box width="40%" p={4}>
                    <Stack flexDirection="column">
                        <Box>
                            <Text fontSize="xs" fontWeight="600">
                                Workers
                            </Text>
                        </Box>
                        <Box><SelectComponent options={WorkerCount} /></Box>

                    </Stack>
                </Box>
            </Stack >
            <Divider />
            <Divider />
            <Stack display="flex" direction={["column", "row"]} py={2} >
                <Box width="20%" p={2}>
                    <FormLabel>Runtime Options</FormLabel>
                </Box>
                <Box width="80%" p={2}>
                    <Stack flexDirection="column" gap={7}>
                        <Checkbox size='lg' color='#0376d3' defaultChecked>
                            Automatically restart application when not responding
                        </Checkbox>
                        <Flex gap={3}>
                            <Checkbox size='lg' color='#0376d3' isDisabled >
                                Use Object Store V2
                            </Checkbox>
                            <Box>|</Box>
                            <Checkbox size='lg' color='#0376d3' isDisabled>
                                Use Object Store V2
                            </Checkbox>

                        </Flex>
                        <Checkbox size='lg' color='#0376d3' defaultChecked >
                            Use Object Store V2
                        </Checkbox>

                    </Stack>
                </Box>

            </Stack >
        </>
    )
}
