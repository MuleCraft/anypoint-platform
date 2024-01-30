import supabase from "../Utils/supabase";

export async function sendResetLink(credential,resetCode){
    try{
        
            const { data, error } = await supabase
            .schema("mc_cap_dev")
            .from('capUsers')
            .select()
            .eq('userName',credential);
        
            if(error){
                console.error("Error sending reset mail", error);
                throw new Error("Error sending reset mail");
            }
            else{
                //console.log(data);
                const { verificationData, verificationError } = await supabase
                .schema("mc_cap_dev")
                .from("userVerification")
                .insert({
                    userCredentials: data[0].userEmail,
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
                        userEmail: data[0].userEmail,
                        userFullname: data[0].userFullname,
                        verificationCode: resetCode
                      });

                      var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                      };

                    //   fetch("http://localhost:8081/resetPassword", requestOptions)
                    //     .then(response => response.text())
                    //     .then(result => console.log(result))
                    //     .catch(error => console.log('error', error));

                        fetch("http://mc-cap-email-system-api.us-e2.cloudhub.io/resetPassword", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error));
                    //console.log("Password reset mail sent to the user.");
                  }
            }

        return data;
    }
    catch(error){
        return error;
    }
}