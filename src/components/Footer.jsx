import { Link, Text, Flex } from "@chakra-ui/react";
export default function Footer() {
  return (
    <Flex my={"5"} textAlign={"center"}>
      <Text
        p={2}
        fontFamily="formCompTexts"
        color="forWhiteText"
        fontSize="base"
        fontWeight="medium"
      >
        &copy;2023 MuleSoft Community, an Open Source platform —{" "}
        <Link variant="footerLink">Privacy policy </Link>—{" "}
        <Link variant="footerLink">Cookie preferences</Link>
      </Text>
    </Flex>
  );
}
