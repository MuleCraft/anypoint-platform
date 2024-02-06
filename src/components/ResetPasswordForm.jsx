import { useState } from "react";
import {
  Input,
  VStack,
  FormLabel,
  FormControl,
  Text,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import supabase from "../Utils/supabase"; // Import your Supabase client instance
import "../App.css";
import "../assets/Common.css";

export default function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [requestError, setRequestError] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setNewPasswordError(
        "Password must contain at least 8 characters including one number, one uppercase, and one lowercase letter."
      );
      return false;
    }
    return true;
  };
  const handleResetPassword = async () => {
    if (!validatePassword()) {
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }
      console.log("Password reset successful!");
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
        <FormHelperText fontSize={"12px"} mb={"20px"} color={"#747474"}>
          Use at least 8 characters, including a number, an uppercase character,
          and a lowercase character. You cannot reuse any of your previous three
          passwords.
        </FormHelperText>
      </FormControl>
      {requestError && (
        <Text fontSize={"14px"} color={"red"}>
          {requestError}
        </Text>
      )}
      <Button
        variant="formButtons"
        width={"100%"}
        onClick={handleResetPassword}
      >
        Reset Password
      </Button>
    </VStack>
  );
}
