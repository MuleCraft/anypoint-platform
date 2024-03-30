import { Container, Link, VStack } from "@chakra-ui/react";
import HeaderLogo from "../components/HeaderLogo";

import Footer from "../components/Footer";
import SignUpFeature from "../components/SignUpFeature";
import InvitedUserForm from "../components/InvitedUserForm";

export default function InviteUserPasswordPage() {
    return (
        <Container minW={'100%'} bg="linear-gradient(-90deg, #0176d3, #4079f1)" minH={'100vh'} padding={'40px 40px 0px'}
            display="flex" flexDirection={'column'} alignItems={'center'} justifyContent={'space-between'}>
            <Container display='flex' justifyContent='center' width={'100%'} padding={0}>
                <VStack spacing={12} width={['100%', '450px']}>
                    <Link href="/" display={'flex'} alignItems={'center'}>
                        <HeaderLogo />
                    </Link>

                    <InvitedUserForm />
                    <SignUpFeature />
                </VStack>
            </Container>
            <Footer />
        </Container>
    )
}