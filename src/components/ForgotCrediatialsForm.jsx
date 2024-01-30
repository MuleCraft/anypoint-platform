import { Input,VStack,FormLabel,FormControl, Text, Button, HStack, Icon, Link } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import "../App.css";
import { createClient } from '@supabase/supabase-js';
import { useState } from "react";
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { sendResetLink } from "../Utils/SendResetLink";
import supabase,{supabaseUrl} from "../Utils/supabase";

export default function ForgotCredentialsForm(){

    const [credential,setCredential] = useState('');
    const { code } = useParams();
    const resetCode = code || uuidv4();

    // const supabase = createClient(
    //     'https://lbtsbocemahbdavnlodi.supabase.co',
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM'
    //     , { db: { schema: 'mc_cap_dev' } });

        const updateCredential = (e) => {
            setCredential(e.target.value);
            //console.log(credential);
        };

        const sendVerificationMail = () =>{
            const resetMailResponse = sendResetLink(credential,resetCode);
            console.log(resetMailResponse);
        
        }

        // async function requestPassword(){
        //     const { data, error } = await supabase
        //     .from('capUsers')
        //     .select('userPassword')
        //     .eq('userName','shanRP')
        
        //     if(error){
        //       console.log(error);
        //     }
        //     else{
        //       console.log('User exists!',data);
        //     }
        //   }

        //   async function updatePassword(){
        //     const { data, error } = await supabase
        //     .from('capUsers')
        //     .update({ userPassword: 'shanNewPwd' })
        //     .eq('userName', 'shanRP')
        //     .select()
        
        //     if(error){
        //       console.log(error);
        //     }
        //     else{
        //       console.log('Password Updated!',data);
        //     }
        //   }

    return(
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
    )
}