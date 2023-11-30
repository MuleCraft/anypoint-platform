import { Input,VStack,FormLabel,FormControl, Text, Button, HStack, Icon, Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../App.css";

export default function ForgotCredentialsForm(){
    return(
        // <Container>
            <VStack bgColor={'white'} width={'450px'} padding={'40px'} spacing={5}>
                <Text fontSize={'20px'} fontWeight={700} color={'#5c5c5c'}>Forgot your credentials?</Text>
                <Text fontSize={'14px'} lineHeight={1.5} color={'#5c5c5c'}>If you forgot your username, enter your email address to receive a list of your usernames.</Text>
                <Text fontSize={'14px'} lineHeight={1.5} color={'#5c5c5c'}>If you forgot your password, enter your username to reset your password and create a new one.</Text>
                <FormControl>
                    <FormLabel fontSize={'14px'} fontWeight={400} color={'#5c5c5c'}>Email address or username</FormLabel>
                    <Input type='text' />
                </FormControl>
                <Button variant='formButtons' width={'100%'}>Request Credentials</Button>
                <Link className="back-to-signin-stack" width={'100%'}>
                    <Button fontSize={'14px'} fontWeight={400} variant={'text'} width={'100%'}>
                        <ArrowBackIcon className="back-icon" width={'20px'} display={'flex'} justifyContent={'flex-end'}/>
                        Back to sign in
                    </Button>
                </Link>
            </VStack>
        // </Container>
    )
}