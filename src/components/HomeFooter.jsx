import { Link, Text, Flex, Image } from "@chakra-ui/react";
import muleicon from "/Images/mulecommunity.svg";
export default function HomeFooter() {
  return (
    <Flex align="center" bg="#eef4ff">
      <Image src={muleicon} alt="mule icon" height="20px" />
      <Text p={2} fontFamily="formCompTexts" fontSize="xs">
        &copy;2023 MuleSoft Community, an Open Source platform —{" "}
        <Link variant="footerLink" href="privacy-policy">
          Privacy policy{" "}
        </Link>
        —{" "}
        <Link variant="footerLink" href="cookie-preferences">
          Cookie preferences
        </Link>
      </Text>
    </Flex>
  );
}
