import supabase from "../Utils/supabase";
import CryptoJS from 'crypto-js';

export async function loginFlow(validUsername,validPassword,codeParam) {
    
    let loginError="";

    try {

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
        { iv: fixedIV, }).toString();

        if(codeParam){
            const { data: codeCheck, error: codeCheckError } = await supabase
                .schema("mc_cap_dev")
                .from("userVerification")
                .select()
                .eq("userCode", codeParam);
            
                if(codeCheck.length === 0){
                    loginError = "Code not found.";
                    return loginError;
                }
                else if(codeCheckError){
                    console.log(codeCheckError);
                    loginError = "Code check error.";
                    return loginError;
                }
                else{
                    const { data, fetchError } = await supabase
                        .schema("mc_cap_dev")
                        .from("capUsers")
                        .select()
                        .eq("userName", validUsername)
                        .eq("userPassword", encryptedText);

                    // console.log("Data: ",data);
                    // console.log("fetchError: ",fetchError);

                    if (fetchError || data === undefined) {
                        console.log(fetchError);
                        loginError = "User fetch error.";
                        return loginError;
                        //throw new Error("Error connecting to the server.");  
                    }
                    else if (data.length === 0) {
                        loginError = "User not found.";
                        return loginError;
                        //throw new Error("Your credentials are not valid.");
                    }
                    else{
                            const { deleteError } = await supabase
                            .schema("mc_cap_dev")
                            .from('userVerification')
                            .delete()
                            .eq('userCode', codeParam);
                        
                            if(deleteError){
                                console.log(deleteError);
                                loginError = "Code delete error.";
                                return loginError;
                                //throw new Error("Error disabling the verification code.");
                            } else {
                                console.log("Verification code deleted.");
                                const { updateError } = await supabase
                                    .schema("mc_cap_dev")
                                    .from('capUsers')
                                    .update({ isVerified: 'TRUE' })
                                    .eq('userName', validUsername)
                                    .select()

                                if (updateError) {
                                    console.log(updateError);
                                    loginError = "isVerified update error.";
                                    return loginError;
                                    //throw new Error("Error occurred during the Login process.");
                                } else {
                                    console.log("User Verified.");
                                    console.log("loginFlow fn ended!");
                                    return data;
                                }
                            }
                    }
                }
        }
        else{
            const { data: userData, error: userDataError } = await supabase
                .schema("mc_cap_dev")
                .from("capUsers")
                .select()
                .eq("userName", validUsername)
                .eq("userPassword", encryptedText)
                .eq("isVerified",true);
            
            if(userData.length > 0){
                return userData;
            }
            else if(userDataError){
                loginError = "User fetch error.";
                return loginError;
            }
            else{
                loginError = "Email not verified.";
                return loginError;
            }
        }
    }
    catch(loginError) {
        return loginError;
    }
    
}
