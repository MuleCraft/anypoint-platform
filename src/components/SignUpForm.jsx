import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Checkbox,
  Text,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import "../assets/Common.css";
import ReCAPTCHA from "react-google-recaptcha";
import AnimateCompForms from "./AnimateCompForms";

export default function SimpleCard() {
  const onChange = () => {};
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Box
      className="for-animation"
      position={{ md: "relative" }}
      left={{ base: "0", sm: "0", lg: "0", xl: "200px" }}
    >
      <Flex align="center" justify="center">
        <Stack direction="row" align="center">
          <Flex
            align={"center"}
            justify="center"
            p={{ base: 0, sm: "10", md: "5", ls: "0" }}
          >
            <Stack
              spacing={8}
              mx={"auto"}
              width={{ base: "380px", sm: "420px", md: "500px" }}
              py={12}
              px={{ base: "0", sm: "6" }}
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
                      Sign up
                    </Heading>
                  </Stack>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Full name
                    </FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Email
                    </FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Phone number
                    </FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Company
                    </FormLabel>
                    <Input type="text" />
                  </FormControl>
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
                    <Input type="password" />
                  </FormControl>
                  <Flex justify="center">
                    <Box>
                      <ReCAPTCHA
                        sitekey="6LcibiApAAAAAD8UB2SlA4hmbY7z4zNMaGCYRYEH"
                        onChange={onChange}
                      />
                    </Box>
                  </Flex>
                  <Flex gap="2" align="center">
                    <Checkbox
                      isChecked={isChecked}
                      size="lg"
                      className="checkbox-color"
                      border={isChecked ? "none" : "1px"}
                      onChange={handleCheckboxChange}
                      _hover={{ boxShadow: "0 0 0 0.25em rgba(0,0,0,.12)" }}
                      icon={
                        <CheckIcon
                          sx={{
                            _hover: {
                              color: isChecked ? "inherit" : "#747474",
                              cursor: isChecked ? "inherit" : "pointer",
                            },
                          }}
                        />
                      }
                    ></Checkbox>
                    <Text fontSize="2xl">
                      I agree to MuleSoft’s{" "}
                      <Link variant="footerLink">terms of service</Link> and{" "}
                      <Link variant="footerLink">privacy policy</Link>.
                    </Text>
                  </Flex>

                  <Button variant="formButtons">Sign up</Button>
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
