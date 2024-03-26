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
  Text,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import "../assets/Common.css";
import { Link as ReactRouterLink } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";
export default function SimpleCard() {
  return (
    <Box>
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
                      Use custom domain{" "}
                    </Heading>
                  </Stack>
                  <Text fontSize="base" color="customHeadingColor" maxW="300px">
                    To go to your company’s login page, enter the organization
                    domain name.
                  </Text>
                  <FormControl>
                    <FormLabel
                      color="formLabelColor"
                      fontSize="xs"
                      fontFamily="formCompTexts"
                    >
                      Organization domain
                    </FormLabel>
                    <Input type="text" isReadOnly />
                  </FormControl>
                  <Text
                    color=" linkTestUseDomain"
                    fontSize="base"
                    fontWeight="medium"
                  >
                    {" "}
                    https://anypoint.mulesoft.com/login/domain/
                  </Text>
                  <Button variant="formButtons" isDisabled>
                    Coming Soon
                  </Button>
                  <HStack justify="center">
                    <ChakraLink
                      as={ReactRouterLink}
                      to="/login"
                      color=" formLabelColor"
                      fontSize="xs"
                      variant="useCustomForgotLink"
                    >
                      <Flex
                        align="center"
                        gap="1"
                        className="for-form__linkhover"
                      >
                        <ArrowBackIcon className="arrow-Icon" />
                        Back to sign in
                      </Flex>
                    </ChakraLink>
                  </HStack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
}
