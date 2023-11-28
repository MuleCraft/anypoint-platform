import { Button, Text, HStack } from "@chakra-ui/react";
export default function SignUpFeature() {
  return (
    <>
      <HStack
        align="center"
        justify="center"
        mx="18"
        padding={{ base: "10" }}
        pt="1"
      >
        <Text
          fontSize="sm"
          color="forWhiteText"
          fontFamily="formCompTexts"
          fontWeight="medium"
        >
          Don’t have an account?
        </Text>
        <Button variant="signinout">Sign Up</Button>
      </HStack>
    </>
  );
}
