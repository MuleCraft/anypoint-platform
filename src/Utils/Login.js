import supabase from "../Utils/supabase";
import CryptoJS from 'crypto-js';

export async function loginFlow(validUsername,validPassword) {

    try {

        console.log("loginflow fn invoked!",validUsername,validPassword);
        const searchParams = new URLSearchParams(window.location.search);
        const codeParam = searchParams.get('code');

        // const {secretKey,decryptError} = await supabase
        // .schema("vault")
        // .from("decrypted_secrets")
        // .select("decrypted_secret")
        // .eq("name", "pwd_encrypt");

        // if(decryptError){
        //   console.log("Error fetching secrets!")
        // }
    
        const fixedIV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

        const encryptedText = CryptoJS.AES.encrypt(validPassword, CryptoJS.enc.Utf8.parse('1234567890123456'),
        {
            iv: fixedIV,
        }).toString();

        //console.log(encryptedText);

        const { data, fetchError } = await supabase
            .schema("mc_cap_dev")
            .from("capUsers")
            .select()
            .eq("userName", validUsername)
            .eq("userPassword", encryptedText);

        //setUserData(data);

        console.log("Data: ",data);
        console.log("fetchError: ",fetchError);

        if (fetchError) {
            throw new Error("Error connecting to the server.");  
        }

        if (data.length === 0) {
            throw new Error("Your credentials are not valid.");
        }

        if (data.length > 0) {
            const { userStatus } = await supabase
                .schema("mc_cap_dev")
                .from("userVerification")
                .select()
                .eq("userCode", codeParam);

            if(userStatus.length > 0){
                const { deleteError } = await supabase
                .schema("mc_cap_dev")
                .from('userVerification')
                .delete()
                .eq('userCode', codeParam);
            
                if(deleteError){
                    throw new Error("Error disabling the verification code.");
                } else {
                    console.log("Verification code deleted.");
                }

                const { updateError } = await supabase
                    .schema("mc_cap_dev")
                    .from('capUsers')
                    .update({ isVerified: 'TRUE' })
                    .eq('userName', validUsername)
                    .select()

                if (updateError) {
                    throw new Error("Error occurred during the Login process.");
                } else {
                    console.log("isVerified value updated.");
                }
            } else if (userStatus.length === 0){
                const { data, fetchError } = await supabase
                    .schema("mc_cap_dev")
                    .from("capUsers")
                    .select("isVerified")
                    .eq("userName", validUsername);

                console.log("isVerified value: ",data);

                // if(data){

                // }
            } else {
                console.log("userStatus: ",userStatus);
            }

            
            console.log("loginFlow fn ended!");
        }
        //console.log("return data: ",data);
        return data;
    }
    catch(error) {
        //console.log("return error: ",error);
        return error;
    }
    
}
