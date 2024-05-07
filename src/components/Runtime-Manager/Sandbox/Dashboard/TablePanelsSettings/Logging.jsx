

import { Stack, Box, Link, Text, Input } from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Logger } from "../../SelectMenuDatas/DeploymentTarget"
import SelectComponent from "../../../../SelectComponent"

export const LoggingSettings = () => {
    return (
        <><Box display="flex" gap={1}>
            <Text fontSize="xs">Additional log levels and categories to include in logs. </Text>
            <Text color="boxColor" fontSize="xs"> <Link><ExternalLinkIcon /> Learn more about logs.</Link></Text>
        </Box><Stack display="flex" direction={["column", "row"]} py={2}>

                <Box width="40%" p={2}>
                    <SelectComponent options={Logger} />
                </Box>
                <Box width="60%" p={2}>
                    <Input bgColor="#f4f5f6" variant='filled' borderRightColor={"#cacbcc "} borderRightWidth={3} borderLeftColor={"#cacbcc "} borderLeftWidth={3} placeholder='Package.name' fontSize="small" size='sm' height="40px" />
                </Box>
            </Stack></>
    )
}
