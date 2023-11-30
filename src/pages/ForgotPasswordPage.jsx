import { Container, VStack } from "@chakra-ui/react";
import HeaderLogo from "../components/HeaderLogo";
import ForgotCredentialsForm from "../components/ForgotCrediatialsForm";

export default function ForgotPassword(){
    return(
        <Container display='flex' justifyContent='center' width={'100%'}
            bg="linear-gradient(-90deg, #0176d3, #4079f1)" minH={'100vh'} margin={'0px'}>
            <VStack spacing={20}>
                <HeaderLogo/>
                <ForgotCredentialsForm/>
            </VStack>
        </Container>
    )
}