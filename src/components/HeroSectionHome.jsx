import { useContext, useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Image } from "@chakra-ui/react";
import heroContentbackground from "/Images/herobannerbackground.svg";
import "../assets/Common.css";
import PropTypes from "prop-types";
import { AuthContext } from "../Utils/AuthProvider"; // Import AuthContext
import supabase from "../Utils/supabase";
HeroSectionHome.propTypes = {
  greeting: PropTypes.string.isRequired,
};

export default function HeroSectionHome({ greeting }) {
  const { session } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (session) {
      fetchUserData();
    }
  }, [session]);

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .schema("mc_cap_develop")
        .from("users")
        .select("full_name, display_name")
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw error;
      }
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

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
          <Heading
            mt={{ base: "5px", lg: "0" }}
            fontSize={{ base: "22px", sm: "32" }}
            textTransform="capitalize"
            textAlign="center"
          >
            {userData ? `${greeting}, ${userData.display_name}!` : greeting}
          </Heading>
          <Text textAlign={"center"}>
            Welcome to the #1 platform for APIs and integrations
          </Text>
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
