import HeaderLogo from "../components/HeaderLogo";
import SignInFeature from "../components/SignInFeature";
import "../App.css";
import Footer from "../components/Footer";
import { Flex } from "@chakra-ui/react";
import InviteUserDetailForm from "../components/InviteUserDetailForm";

export default function InviteUserDatailPage() {
    return (
        <div className="Credentials-page">
            <Flex justify="center" flex="1" flexDirection="column" align="center">
                <HeaderLogo />
                <div className="Wrapper">
                    <InviteUserDetailForm />
                    <SignInFeature />
                </div>
                <Footer />
            </Flex>
        </div>
    );
}
