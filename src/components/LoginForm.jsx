import {
  Flex,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import "../assets/Common.css";
import { motion } from "framer-motion";
export default function SimpleCard() {
  const AnimatedBox = motion(Box);
  return (
    <Box
      position={{ md: "relative" }}
      left={{ base: "0", sm: "0", lg: "0", xl: "190px" }}
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
                    <Input type="password" />
                  </FormControl>
                  <Stack spacing={5}>
                    <Button variant="formButtons">Sign in</Button>
                    <Stack
                      justify={"space-between"}
                      align={"center"}
                      direction={{ base: "column", sm: "row" }}
                    >
                      <Link
                        fontSize="xs"
                        fontFamily="formCompTexts"
                        variant="formlink"
                      >
                        Forgot your credentials?
                      </Link>
                      <Link
                        fontSize="xs"
                        fontFamily="formCompTexts"
                        variant="formlink"
                      >
                        Use custom domain
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </Stack>
        <AnimatedBox
          maxW="360px"
          fontFamily="formCompTexts"
          color="forWhiteText"
          ml="5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          display={{ base: "none", xl: "block" }}
        >
          <Heading fontSize="xl">
            Automate everything. Empower everyone. Deliver success now.
          </Heading>
          <Text fontSize="lg" maxW="300px">
            Increase productivity, lower costs, and reduce time to market with
            MuleSoft.
          </Text>
        </AnimatedBox>
      </Flex>
    </Box>
  );
}
