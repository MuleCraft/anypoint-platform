import {
  Input,
  VStack,
  FormLabel,
  FormControl,
  Text,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import "../App.css";
import "../assets/Common.css";

export default function ResetPasswordForm() {
  return (
    <VStack
      bgColor={"white"}
      width={["100%", "450px"]}
      padding={["40px 20px", "40px"]}
      spacing={3}
      maxW={"950px"}
      borderRadius={"2px"}
      boxShadow={"0 5px 30px 0 rgba(0,0,0,.15)"}
    >
      <Text
        fontSize={"20px"}
        fontWeight={700}
        color={"#5c5c5c"}
        align={"center"}
      >
        Reset your password
      </Text>

      <FormControl p={"10px 0px"}>
        <FormLabel fontSize={"14px"} fontWeight={400} color={"#5c5c5c"}>
          New Password
        </FormLabel>
        <Input type="text" />
        <FormHelperText fontSize={"12px"} mb={"20px"} color={"#747474"}>
          Use at least 8 characters, including a number, an uppercase character,
          and a lowercase character. You cannot reuse any of your previous three
          passwords.
        </FormHelperText>
      </FormControl>
      <Button variant="formButtons" width={"100%"}>
        Reset Password
      </Button>
    </VStack>
  );
}
