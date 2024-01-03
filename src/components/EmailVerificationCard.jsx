import { Box, Text } from "@chakra-ui/react";

const EmailVerificationCard = ({ email }) => {
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
        Email verification has been sent to {email}. Please check your email to
        complete the registration process.
      </Text>
    </Box>
  );
};

export default EmailVerificationCard;
