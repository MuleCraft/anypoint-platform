import supabase from "./supabase";

export default async function fetchBusinessGroupNames(userEmail){

        console.log("BG data fn has been called for ", userEmail);
        const { data, error } = await supabase
            .schema("mc_cap_develop")
            .from("businessGroup")
            .select("businessGroupName")
            .eq("userEmail", userEmail);
    
        if (error) {
            return error;
        }
        else{
            // console.log("BG Names: ", data);
            return data;
        }
}