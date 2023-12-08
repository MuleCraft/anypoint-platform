import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom"; // Import useNavigate
import "../assets/Common.css";
import { useAuth } from "../Utils/AuthProvider";
import React, { useState } from "react";
import AnimateCompForms from "./AnimateCompForms";
import { createClient } from "@supabase/supabase-js";
export default function SimpleCard() {
  const supabase = createClient(
    "https://lbtsbocemahbdavnlodi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM",
    { db: { schema: "mc_dev" } }
  );
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const handleUsernameBlur = () => {
    if (username.trim() === "") {
      setUsernameError("Required");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("Required");
    } else {
      setPasswordError("");
    }
  };
  async function verifyUserCredentials() {
    try {
      setUsernameError("");
      setPasswordError("");
      setError("");
      if (username.trim() === "" && password.trim() === "") {
        throw new Error("Username and password are required");
      }
      if (username.trim() === "") {
        throw new Error("Username is required");
      }
      if (password.trim() === "") {
        throw new Error("Password is required");
      }
      const { data, error } = await supabase
        .from("capUsers")
        .select()
        .eq("userName", username)
        .eq("userPassword", password);
      if (error) {
        throw new Error("Error connecting to the server");
      }
      if (data.length === 0) {
        throw new Error("Your credentials are not valid.");
      }
      login("userAuthenticate");
      navigate("/home/organisations");
    } catch (error) {
      if (error.message === "Username and password are required") {
        setUsernameError("Required");
        setPasswordError("Required");
      } else if (error.message === "Username is required") {
        setUsernameError("Required");
      } else if (error.message === "Password is required") {
        setPasswordError("Required");
      } else if (error.message === "Error connecting to the server") {
        setError("Error connecting to the server");
      } else if (error.message === "Your credentials are not valid.") {
        setError("Your credentials are not valid.");
      }
    }
  }

  return (
    <Box
      className="for-animation"
      position={{ md: "relative" }}
      left={{ base: "0", sm: "0", lg: "0", xl: "200px" }}
    >
      <Flex align="center" justify="center">
        <Stack direction="row" align="center">
          <Flex align={"center"} justify="center">
            <Stack
              spacing={8}
              mx={"auto"}
              width={{ base: "320px", sm: "400px", md: "500px" }}
              py={12}
              px={6}
            >
              <Box
                bg={useColorModeValue("white", "gray.700")}
                boxShadow={"lg"}
                p={8}
              >
                <Stack spacing={4}>
                  <Stack align={"center"}>
                    <Heading
                      fontSize="lg"
                      fontFamily="formCompTexts"
                      color="customHeadingColor"
                      size="myHeaderSizeForm"
                      fontWeight="medium"
                    >
                      Sign in
                    </Heading>
                  </Stack>
                  {error && <p className="credential-error">{error}</p>}
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Username
                    </FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onBlur={handleUsernameBlur}
                      style={{
                        borderColor: usernameError ? "red" : "",
                      }}
                    />
                    {usernameError && (
                      <p className="field-error">{usernameError}</p>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Password
                    </FormLabel>
                    <InputGroup size="md">
                      <Input
                        type={show ? "text" : "password"}
                        value={password}
                        onBlur={handlePasswordBlur}
                        style={{
                          borderColor: passwordError ? "red" : "",
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        {password && (
                          <Button variant="hideShow" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {passwordError && (
                      <p className="field-error">{passwordError}</p>
                    )}
                  </FormControl>
                  <Stack spacing={5}>
                    <Button
                      variant="formButtons"
                      onClick={verifyUserCredentials}
                    >
                      Sign in
                    </Button>
                    <Stack
                      justify={"space-between"}
                      align={"center"}
                      direction={{ base: "column", sm: "row" }}
                    >
                      <ChakraLink
                        as={ReactRouterLink}
                        fontSize="xs"
                        fontFamily="formCompTexts"
                        variant="formlink"
                        to="/login/retrieve-username"
                      >
                        Forgot your credentials?
                      </ChakraLink>
                      <ChakraLink
                        as={ReactRouterLink}
                        to="/use-custom-domain"
                        fontSize="xs"
                        fontFamily="formCompTexts"
                        variant="formlink"
                      >
                        Use custom domain
                      </ChakraLink>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Stack>
        <AnimateCompForms />
      </Flex>
    </Box>
  );
}
