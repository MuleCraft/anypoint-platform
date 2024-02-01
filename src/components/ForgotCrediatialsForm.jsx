import { Input,VStack,FormLabel,FormControl, Text, Button, HStack, Icon, Link, Box } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../App.css";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { sendResetLink } from "../Utils/SendResetLink";
import EmailVerificationCard from "./EmailVerificationCard";

export default function ForgotCredentialsForm(){

    const [credential,setCredential] = useState('');
    const [showForgotCredentialsForm, setShowForgotCredentialsForm] = useState(true);
    const [showEmailVerificationCard, setShowEmailVerificationCard] = useState(false);
    const [showLoadingCard, setShowLoadingCard] = useState(false);
    const { code } = useParams();
    const resetCode = code || uuidv4();
    let emailData;

    const updateCredential = (e) => {
        setCredential(e.target.value);
    };

    const sendVerificationMail = () =>{
        const resetMailResponse = sendResetLink(credential,resetCode);
        resetMailResponse.then((email) => {
            emailData = email;
            const emailContainer = document.getElementById("responseContainer");
            emailContainer.innerHTML = `Verification email has been sent to <span style="font-weight: bold; font-style: italic;">${emailData}</span>. Please check your email to reset your password.`;
        });
        if(emailData){
            setShowForgotCredentialsForm(false);
            setShowEmailVerificationCard(true);
        }
        else if(emailData === undefined){
            setShowForgotCredentialsForm(false);
            setShowLoadingCard(true);
        }
    }

    return(
        <>
        {showLoadingCard && (
            <Box id="responseContainer" bgColor={'white'} width={['100%','450px']} padding={['40px 20px','40px']} spacing={3} maxW={'950px'} 
            borderRadius={'2px'} boxShadow={'0 5px 30px 0 rgba(0,0,0,.15)'}>
                <Text>Sending your verification email...</Text>
            </Box>
        )}
        {showEmailVerificationCard &&(
            <EmailVerificationCard email={emailData} 
            message={"Please check your email to reset your password."}/>
        )}
        {showForgotCredentialsForm && (
            <VStack bgColor={'white'} width={['100%','450px']} padding={['40px 20px','40px']} spacing={3} maxW={'950px'} 
                    borderRadius={'2px'} boxShadow={'0 5px 30px 0 rgba(0,0,0,.15)'}>
                <Text fontSize={'20px'} fontWeight={700} color={'#5c5c5c'} align={'center'}>Forgot your credentials?</Text>
                <Text fontSize={'14px'} fontWeight={500} lineHeight={1.5} color={'#5c5c5c'}>If you forgot your username, enter your email address to receive a list of your usernames.</Text>
                <Text fontSize={'14px'} fontWeight={500} lineHeight={1.5} color={'#5c5c5c'}>If you forgot your password, enter your username to reset your password and create a new one.</Text>
                <FormControl>
                    <FormLabel fontSize={'14px'} fontWeight={400} color={'#5c5c5c'}>Email address or username</FormLabel>
                    <Input type='text' value={credential} onChange={updateCredential}/>
                </FormControl>
                <Button variant='formButtons' width={'100%'} onClick={sendVerificationMail}>Request Credentials</Button>
                <Link className="back-to-signin-stack" width={'100%'} href="/">
                    <Button fontSize={'14px'} fontWeight={500} variant={'text'} width={'100%'} color={'#5c5c5c'}>
                        <ArrowBackIcon className="back-icon" width={'15px'} h={'15px'} display={'inline-flex'} mr={'3px'}/>
                        Back to sign in
                    </Button>
                </Link>
            </VStack>
            )}
    </>)
}