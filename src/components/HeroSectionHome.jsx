import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import heroContentbackground from "/Images/herobannerbackground.svg";
import "../assets/Common.css";
import PropTypes from "prop-types";
import { useAuth } from "../Utils/AuthProvider";
HeroSectionHome.propTypes = {
  greeting: PropTypes.string.isRequired,
};

export default function HeroSectionHome({ greeting }) {
  const { userData } = useAuth();
  return (
    <>
      <Box
        className="Hero-background"
        position="relative"
        height={{ base: "90px", lg: "170px" }}
      >
        <Flex
          color="forWhiteText"
          direction="column"
          justify={{ base: "center", lg: "flex-start" }}
          align={{ base: "center", lg: "flex-start" }}
          position={{ lg: "absolute" }}
          top={{ md: "0", lg: "50px" }}
          left={{ "2xl": "400px", xl: "320px", lg: "80px" }}
        >
          <Heading mt={{ base: "5px", lg: "0" }}>
            {greeting} {userData?.userName}!
          </Heading>
          <Text>Welcome to the #1 platform for APIs and integrations</Text>
        </Flex>
        <Image
          src={heroContentbackground}
          alt="herocontent-background"
          height="170px"
          style={{ position: "absolute" }}
          display={{ base: "none", lg: "block" }}
          left={{ "2xl": "700px", xl: "500px", lg: "200px" }}
        />
      </Box>
    </>
  );
}
