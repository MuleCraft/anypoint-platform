import { useState } from "react";
import {
  Input,
  VStack,
  FormLabel,
  FormControl,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import supabase from "../Utils/supabase"; // Import your Supabase client instance
import "../App.css";

export default function ForgotCredentialsForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestError, setRequestError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleRequestCredentials = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) {
        throw new Error(error.message);
      }

      setRequestSuccess(true);
    } catch (error) {
      setRequestError(error.message);
    }
  };

  return (
    <>
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
          Forgot your credentials?
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={500}
          lineHeight={1.5}
          color={"#5c5c5c"}
        >
          If you forgot your username, enter your email address to receive a
          list of your usernames.
        </Text>
        <Text
          fontSize={"14px"}
          fontWeight={500}
          lineHeight={1.5}
          color={"#5c5c5c"}
        >
          If you forgot your password, enter your username to reset your
          password and create a new one.
        </Text>
        <FormControl>
          <FormLabel fontSize={"14px"} fontWeight={400} color={"#5c5c5c"}>
            Email
          </FormLabel>
          <Input
            type="text"
            onChange={handleEmailChange}
            value={email}
            borderColor={emailError ? "red" : ""}
          />
          {emailError && <Text className="field-error">{emailError}</Text>}
        </FormControl>
        <Button
          variant="formButtons"
          width={"100%"}
          onClick={handleRequestCredentials}
        >
          Request Credentials
        </Button>
        {requestSuccess && (
          <Text fontSize={"14px"} color={"green"}>
            Password reset email sent successfully!
          </Text>
        )}
        {requestError && (
          <Text fontSize={"14px"} color={"red"}>
            {requestError}
          </Text>
        )}
        <Link className="back-to-signin-stack" width={"100%"} href="/">
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
            Back to sign in
          </Button>
        </Link>
      </VStack>
    </>
  );
}
