import { useState, useContext } from "react";
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
import supabase from "../Utils/supabase";
import { AuthContext } from "../Utils/AuthProvider";
import { useNavigate } from "react-router-dom";
export default function SimpleCard() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setError] = useState("");
  const handleClick = () => setShow(!show);
  const { setSession } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleEmailBlur = () => {
    setEmailError(email.trim() === "" ? "Required" : "");
  };

  const handlePasswordBlur = () => {
    setPasswordError(password.trim() === "" ? "Required" : "");
  };

  const signInWithEmail = async () => {
    setEmailError(email.trim() === "" ? "Required" : "");
    setPasswordError(password.trim() === "" ? "Required" : "");

    if (email.trim() === "" || password.trim() === "") {
      return;
    }

    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setSession(data.session);
        navigate("/home/organisations");
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
                      Email
                    </FormLabel>
                    <Input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={handleEmailBlur}
                      style={{
                        borderColor: emailError ? "red" : "",
                      }}
                    />
                    {emailError && <p className="field-error">{emailError}</p>}
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
                      onClick={signInWithEmail}
                      isLoading={false}
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
