import supabase from "../Utils/supabase";

export async function sendResetLink(credential,resetCode){

    try{
        const { data: userNameData, error: userNameError } = await supabase
            .schema("mc_cap_dev")
            .from('capUsers')
            .select()
            .eq('userName', credential);
    
        const { data: emailInputData, error: emailInputError } = await supabase
            .schema("mc_cap_dev")
            .from('capUsers')
            .select()
            .eq('userEmail', credential);
    
        if (userNameError || emailInputError) {
            console.error("Error fetching user data.");
            throw new Error("Error fetching user data.");
        }
    
        let userData = [];
    
        if (userNameData.length > 0) {
            userData = userNameData;
        } else if (emailInputData.length > 0) {
            userData = emailInputData;
        } else {
            console.log("User not found!");
            throw new Error("User not found!");
        }

                const { verificationData, verificationError } = await supabase
                .schema("mc_cap_dev")
                .from("userVerification")
                .insert({
                    userCredentials: userData[0].userEmail,
                    userCode: resetCode,
                    category: "passwordReset"
                });

                if (verificationError) {
                    console.error("Error adding user:", verificationError);
                    throw new Error("Error occurred during the verification data insert process.");
                  }
                  else {
                      var myHeaders = new Headers();
                      myHeaders.append("clientId", "mulecraft");
                      myHeaders.append("clientSecret", "mulecraft123");
                      myHeaders.append("Content-Type", "application/json");

                      var raw = JSON.stringify({
                        userEmail: userData[0].userEmail,
                        userFullname: userData[0].userFullname,
                        verificationCode: resetCode
                      });

                      var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };

                    fetch("http://mc-cap-email-system-api.us-e2.cloudhub.io/resetPassword", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                  }

        return data;
    }
    catch(error){
        return error;
    }
}