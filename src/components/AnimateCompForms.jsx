import { Box, Heading, Text } from "@chakra-ui/react";
export default function AnimateCompForms() {
  return (
    <>
      <Box
        className="animation-comp"
        maxW="360px"
        fontFamily="formCompTexts"
        color="forWhiteText"
        ml="5"
        display={{ base: "none", xl: "block" }}
      >
        <Heading fontSize="xl">
          Automate everything. Empower everyone. Deliver success now.
        </Heading>
        <Text fontSize="lg" maxW="300px">
          Increase productivity, lower costs, and reduce time to market with
          MuleSoft.
        </Text>
      </Box>
    </>
  );
}
