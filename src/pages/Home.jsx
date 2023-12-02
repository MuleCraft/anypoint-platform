import HeroSectionHome from "../components/HeroSectionHome";
import Nav from "../components/NavbarHome";
import HomeMain from "../components/HomeMain";
import HomeFooter from "../components/HomeFooter";
import { Flex } from "@chakra-ui/react";
export default function Home() {
  return (
    <>
      <div className="home">
        <Nav />
        <div className="Wrapper">
          <HeroSectionHome />
          <HomeMain />
        </div>
        <HomeFooter />
      </div>
    </>
  );
}
