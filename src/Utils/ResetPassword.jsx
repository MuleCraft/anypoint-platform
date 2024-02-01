import supabase from "../Utils/supabase";
import CryptoJS from 'crypto-js';

export async function resetFlow(newPassword,resetCode) {

    const resetUrl = "http://mc-cap-email-system-api.us-e2.cloudhub.io/login/new-password?code=" + resetCode;

    try{

        const fixedIV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

        const encryptedText = CryptoJS.AES.encrypt(newPassword, CryptoJS.enc.Utf8.parse('1234567890123456'),
        { iv: fixedIV, }).toString();

        const { data: codeCheck, error: codeCheckError } = await supabase
            .schema("mc_cap_dev")
            .from("userVerification")
            .select()
            .eq("userCode", resetCode);
        
        if(codeCheck.length > 0){

            //console.log(codeCheck);

            const { data: updatePwd, error: updatePwdError } = await supabase
                .schema("mc_cap_dev")
                .from('capUsers')
                .update({ userPassword: encryptedText })
                .eq('userEmail', codeCheck[0].userCredentials);
            
                if(updatePwdError){
                    console.log(updatePwdError);
                    throw new Error("Error updating the password.");
                }
                else{
                    console.log('Password Updated!');
                    return "Password updated.";
                }
        }
        else if(codeCheckError){
            console.log(codeCheckError);
            throw new Error("Error checking the verification code.");
        }
        else{
            return "Code not found.";
        }
    }
    catch(error){
        return error;
    }
}