import { Button, Text, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SignUpFeature() {
  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate("/signup");
  };

  return (
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
      <Button variant="signinout" onClick={navigateToSignIn}>
        Sign up
      </Button>
    </HStack>
  );
}
