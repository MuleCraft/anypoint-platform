import { useState } from "react";
import {
  Input,
  VStack,
  FormLabel,
  FormControl,
  Text,
  Button,
  FormHelperText,
  Box,
  Heading,
  Link,
} from "@chakra-ui/react";
import supabase from "../Utils/supabase";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../App.css";
import "../assets/Common.css";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setNewPasswordError("");
    setRequestError("");
    validatePassword(newPasswordValue);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log("Password validation failed");
      setNewPasswordError(
        "Password must contain at least 8 characters including one number, one uppercase, and one lowercase letter."
      );
      return false;
    } else {
      console.log("Password validation successful");
      setNewPasswordError("");
      return true;
    }
  };

  const handleResetPassword = async () => {
    if (!validatePassword(newPassword)) {
      return;
    }
    try {
      console.log("Attempting to reset password...");
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log("Password reset successful!");
      setResetSuccess(true);
    } catch (error) {
      setRequestError(error.message);
    }
  };

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
      {!resetSuccess ? (
        <>
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
            <Input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            {newPasswordError && (
              <Text className="field-error">{newPasswordError}</Text>
            )}
            {requestError && (
              <Text fontSize={"14px"} color={"red"} mt={1}>
                {requestError}
              </Text>
            )}
            <FormHelperText fontSize={"12px"} mb={"20px"} color={"#747474"}>
              Use at least 8 characters, including a number, an uppercase
              character, and a lowercase character. You cannot reuse any of your
              previous three passwords.
            </FormHelperText>
          </FormControl>
          <Button
            variant="formButtons"
            width={"100%"}
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </>
      ) : (
        <Box p={2} borderRadius={4}>
          <Heading fontSize="20px">Your password has been reset</Heading>
          <Text fontSize={"14px"} mt="5">
            You may now sign in using your new password.
          </Text>
          <Link className="back-to-signin-stack" width={"100%"} href="/" mt="5">
            <Button
              fontSize={"14px"}
              fontWeight={500}
              variant={"text"}
              width={"100%"}
              color={"#5c5c5c"}
            >
              <ArrowBackIcon
                className="back-icon"
                width={"15px"}
                h={"15px"}
                display={"inline-flex"}
                mr={"3px"}
              />
              Sign in
            </Button>
          </Link>
        </Box>
      )}
    </VStack>
  );
}
