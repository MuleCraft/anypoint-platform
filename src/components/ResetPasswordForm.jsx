import { Input,VStack,FormLabel,FormControl, Text, Button, FormHelperText } from "@chakra-ui/react";
import "../App.css";
import "../assets/Common.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetFlow } from "../Utils/ResetPassword";

export default function ResetPasswordForm(){

    const [newPassword,setNewPassword] = useState('');
    const [resetError, setError] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const codeParam = queryParams.get('code');

    let resetFlowMessage;
    
    const updateCredential = (e) => {
            setNewPassword(e.target.value);
            //console.log(newPassword);
        };

          async function updatePassword(){
            const resetResponse = resetFlow(newPassword,codeParam);
            //console.log(resetResponse);
            
            resetResponse
            .then((response) => {
              resetFlowMessage = response;
              //console.log(resetFlowMessage, "reset response message");
              throw new Error(resetFlowMessage);
            })
            .catch((error) => {
              if (error.message === "Code not found.") {
                setError("Code Expired. Re-request for credentials.");
              } else {
                console.log(error.message);
              }
            });
            // var myHeaders = new Headers();
            // myHeaders.append("clientId", "mulecraft");
            // myHeaders.append("clientSecret", "mulecraft123");
            // myHeaders.append("Content-Type", "application/json");

            // var raw = JSON.stringify({
            //   "newPassword": newPassword
            // });

            // var requestOptions = {
            //   method: 'PUT',
            //   headers: myHeaders,
            //   body: raw,
            //   redirect: 'follow'
            // };
            // fetch(resetUrl, requestOptions)
            //   .then(response => response.text())
            //   .then(result => console.log(result))
            //   .catch(error => console.log('error', error));
          }

    return(
            <VStack bgColor={'white'} width={['100%','450px']} padding={['40px 20px','40px']} spacing={3} maxW={'950px'} 
                    borderRadius={'2px'} boxShadow={'0 5px 30px 0 rgba(0,0,0,.15)'}>
                <Text fontSize={'20px'} fontWeight={700} color={'#5c5c5c'} align={'center'}>Reset your password</Text>
                {resetError && <p className="credential-error">{resetError}</p>}
                <FormControl p={'10px 0px'}>
                    <FormLabel fontSize={'14px'} fontWeight={400} color={'#5c5c5c'}>New Password</FormLabel>
                    <Input type='text' value={newPassword} onChange={updateCredential}/>
                    <FormHelperText fontSize={'12px'} mb={'20px'} color={'#747474'}>Use at least 8 characters, including a number, an uppercase character, and a lowercase character. You cannot reuse any of your previous three passwords.</FormHelperText>
                </FormControl>
                <Button variant='formButtons' width={'100%'} onClick={updatePassword} disabled={resetError}>Reset Password</Button>
            </VStack>
    )
}