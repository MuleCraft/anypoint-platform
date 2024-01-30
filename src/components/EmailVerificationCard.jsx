import { Box, Text } from "@chakra-ui/react";

const EmailVerificationCard = ({ email,message }) => {
  return (
    <Box
      bg="green.100"
      p={4}
      mt={4}
      borderRadius="md"
      borderWidth="1px"
      borderColor="green.300"
    >
      <Text>
        Verification email has been sent to {email}. {message}
      </Text>
    </Box>
  );
};

export default EmailVerificationCard;
