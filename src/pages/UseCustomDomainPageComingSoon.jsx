import HeaderLogo from "../components/HeaderLogo";
import UseCustomDomain from "../components/UseCustomDomain";
import SignUpFeature from "../components/SignUpFeature";
import "../App.css";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";

export default function UseCustomDomainPageComingSoon() {
  return (
    <div className="Credentials-page">
      <Flex justify="center" flex="1" flexDirection="column" align="center">
        <HeaderLogo />
        <div className="Wrapper">
          <UseCustomDomain />
          <SignUpFeature />
        </div>
        <Footer />
      </Flex>
    </div>
  );
}
