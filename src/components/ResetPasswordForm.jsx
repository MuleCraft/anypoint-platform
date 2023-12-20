import { Input,VStack,FormLabel,FormControl, Text, Button, FormHelperText } from "@chakra-ui/react";
import "../App.css";
import { createClient } from '@supabase/supabase-js';
import { useState } from "react";

export default function ResetPasswordForm(){

    const [newPassword,setNewPassword] = useState('');

    const supabase = createClient(
        'https://lbtsbocemahbdavnlodi.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxidHNib2NlbWFoYmRhdm5sb2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4MzM3NzYsImV4cCI6MjAxMjQwOTc3Nn0.E6DkrTeqEvJdZf-LJN9OzuQ2RfEiPGvU-73BydwQZJM'
        , { db: { schema: 'mc_dev' } });

        const updateCredential = (e) => {
            setNewPassword(e.target.value);
            console.log(newPassword);
        };

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

          async function updatePassword(){
            const { data, error } = await supabase
            .from('capUsers')
            .update({ userPassword: newPassword })
            .eq('userName', 'shanRP')
            .select()
        
            if(error){
              console.log(error);
            }
            else{
              console.log('Password Updated!',data);
            }
          }

    return(
            <VStack bgColor={'white'} width={['100%','450px']} padding={['40px 20px','40px']} spacing={3} maxW={'950px'} 
                    borderRadius={'2px'} boxShadow={'0 5px 30px 0 rgba(0,0,0,.15)'}>
                <Text fontSize={'20px'} fontWeight={700} color={'#5c5c5c'} align={'center'}>Reset your password</Text>
                <FormControl p={'10px 0px'}>
                    <FormLabel fontSize={'14px'} fontWeight={400} color={'#5c5c5c'}>New Password</FormLabel>
                    <Input type='text' value={newPassword} onChange={updateCredential}/>
                    <FormHelperText fontSize={'12px'} mb={'20px'} color={'#747474'}>Use at least 8 characters, including a number, an uppercase character, and a lowercase character. You cannot reuse any of your previous three passwords.</FormHelperText>
                </FormControl>
                <Button variant='formButtons' width={'100%'} onClick={updatePassword}>Reset Password</Button>
            </VStack>
    )
}