import HeaderLogo from "../components/HeaderLogo";
import SignUpForm from "../components/SignUpForm";
import SignInFeature from "../components/SignInFeature";
import "../App.css";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";

export default function SignUpPage() {
  return (
    <div className="Credentials-page">
      <Flex justify="center" flex="1" flexDirection="column" align="center">
        <HeaderLogo />
        <div className="Wrapper">
          <SignUpForm />
          <SignInFeature />
        </div>
        <Footer />
      </Flex>
    </div>
  );
}
