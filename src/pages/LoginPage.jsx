import HeaderLogo from "../components/HeaderLogo";
import LoginForm from "../components/LoginForm";
import SignUpFeature from "../components/SignUpFeature";
import "../App.css";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";
export default function LoginPage() {
  return (
    <div className="Credentials-page">
      <Flex justify="center" flex="1" flexDirection="column" align="center">
        <HeaderLogo />
        <div className="Wrapper">
          <LoginForm />
          <SignUpFeature />
        </div>
        <Footer />
      </Flex>
    </div>
  );
}
