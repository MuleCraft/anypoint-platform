import { Box, Button, Text, VStack, Image } from "@chakra-ui/react"
import muleAvator from "/Images/Logo.svg"
export const RuntimeApplication = () => {
    return (
        <Box width="80vw" height="45vh" display="flex" alignItems="center" justifyContent="center">
            <VStack spacing={4} alignItems="center" justifyContent="center">
                <Box as={Image} src={muleAvator} width={100} />
                <Text fontSize="xl" fontWeight="500" color="gray.300">There are no applications to show</Text>
                <Button colorScheme="blue" size="md"><Text fontSize="xs">Deploy application</Text></Button>
            </VStack>
        </Box>
    )
}
