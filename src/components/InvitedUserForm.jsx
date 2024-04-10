import { useState } from "react";
import {
  Input,
  VStack,
  FormLabel,
  FormControl,
  Text,
  Button,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import supabase from "../Utils/supabase";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../assets/Common.css";

export default function InvitedUserForm() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [requestError, setRequestError] = useState("");
  const navigate = useNavigate();

  const handleNewPasswordChange = (e) => {
    const newPasswordValue = e.target.value;
    setNewPassword(newPasswordValue);
    setNewPasswordError("");
    setRequestError("");
    validatePassword(newPasswordValue);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{8,}$/;
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
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw new Error(error.message);
      }
      if (data && data.user && data.user.id) {
        navigate(`/inviteduserdetails/${data.user.id}`);
      }
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center">
      <VStack
        bgColor={"white"}
        width={["100%", "450px"]}
        padding={["40px 20px", "40px"]}
        spacing={3}
        borderRadius={"2px"}
        boxShadow={"0 5px 30px 0 rgba(0,0,0,.15)"}
      >
        <Text
          fontSize={"20px"}
          fontWeight={700}
          color={"#5c5c5c"}
          align={"center"}
        >
          Create your password
        </Text>
        <FormControl p={"10px 0px"}>
          <FormLabel fontSize={"14px"} fontWeight={400} color={"#5c5c5c"}>
            Password
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
          Submit
        </Button>
      </VStack>
    </Flex>
  );
}
