import supabase from "../Utils/supabase";
import CryptoJS from 'crypto-js';

export async function signupFlow(fullName,email,phoneNumber,company,username,password,logincode) {
    try{
        console.log("signupFlow Invoked!");
        const fixedIV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
        const encryptedText = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse('1234567890123456'),
        {
            iv: fixedIV,
        }).toString();

        console.log(encryptedText);
        const { data, error } = await supabase
          .schema("mc_cap_dev")
          .from("capUsers")
          .insert({
            userFullname: fullName,
            userEmail: email,
            userPhone: phoneNumber,
            userCompany: company,
            userName: username,
            userPassword: encryptedText,
            acceptedTerms: "true",
            accountType: "self",
            identityProvider: "CAP",
            multiFactorAuth: "false",
            isVerified: "FALSE"
          });
        if (error) {
          console.error("Error adding user:", error);
          throw new Error("Error occurred during the Signup process.");
        } else {
            const { data, error } = await supabase
            .schema("mc_cap_dev")
            .from("userVerification")
            .insert({
                userCredentials: email,
                userCode: logincode,
                category: "newUserSignIn"
            });
            if (error) {
                console.error("Error adding user:", error);
                throw new Error("Error occurred during the verification data insert process.");
              }
              else{
                var myHeaders = new Headers();
                myHeaders.append("clientId", "mulecraft");
                myHeaders.append("clientSecret", "mulecraft123");
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                  userFullname: fullName,
                  userEmail: email,
                  signupVerificationCode: logincode
                });

                var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };

                // fetch("http://localhost:8081/addUser", requestOptions)
                //   .then(response => response.text())
                //   .then(result => console.log(result))
                //   .catch(error => console.log('error', error));

                fetch("http://mc-cap-email-system-api.us-e2.cloudhub.io/addUser", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
                //console.log(response);
              }

        }
        return data;
    }
    catch(error){
        return error;
    }
}