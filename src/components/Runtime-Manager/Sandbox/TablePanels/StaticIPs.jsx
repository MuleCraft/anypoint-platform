import { Box, Checkbox, Stack, Text } from '@chakra-ui/react'

export const StaticIPs = () => {
    return (
        <Stack gap={5}><Checkbox size='lg' color='#0376d3' isDisabled>
            <Text fontSize="14px" fontWeight="600">
                Run in Runtime Cluster Mode
            </Text>

        </Checkbox><Box display="flex">
                <Text fontSize="xs" textColor="#b2b2b2" fontWeight="500">
                    Available static IPs for the current business group:  <Text display="inline" fontWeight="800">0 out of 0 </Text>
                </Text>
            </Box></Stack>
    )
}
