import React from "react";
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
import { Link as ReactRouterLink } from "react-router-dom";
import "../assets/Common.css";
import AnimateCompForms from "./AnimateCompForms";

const checkCredentials = async (enteredUsername, enteredPassword) => {
  const validUsername = "demo";
  const validPassword = "password";

  return enteredUsername === validUsername && enteredPassword === validPassword;
};

export default function SimpleCard() {
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [loginError, setError] = React.useState("");

  const handleClick = () => setShow(!show);
  const handleUsernameBlur = () => {
    setUsernameError(username.trim() === "" ? "Required" : "");
  };
  const handlePasswordBlur = () => {
    setPasswordError(password.trim() === "" ? "Required" : "");
  };
  const verifyUserCredentials = async () => {
    try {
      setUsernameError(username.trim() === "" ? "Required" : "");
      setPasswordError(password.trim() === "" ? "Required" : "");

      if (username.trim() === "" || password.trim() === "") {
        return;
      }

      setError("");

      const isValidCredentials = await checkCredentials(username, password);

      if (!isValidCredentials) {
        throw new Error("Your credentials are not valid.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
                  {loginError && (
                    <p className="credential-error">{loginError}</p>
                  )}
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
