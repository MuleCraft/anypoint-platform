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
import React, { useState } from "react";
import AnimateCompForms from "./AnimateCompForms";

export default function SimpleCard() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const handleClick = () => setShow(!show);

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
                      Sign in{" "}
                    </Heading>
                  </Stack>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Username
                    </FormLabel>
                    <Input type="text" />
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
                      {" "}
                      <Input
                        type={show ? "text" : "password"}
                        value={password}
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
                  </FormControl>
                  <Stack spacing={5}>
                    <Button variant="formButtons">Sign in</Button>
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
                        href="login/retrieve-username"
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
