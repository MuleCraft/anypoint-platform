import supabase from "./supabase";

export default async function fetchBusinessGroupNames(userName) {

        console.log("BG data fn has been called for ", userName);
        const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("businessGroup")
                .select("businessGroupName")
                .eq("userName", userName);

        if (error) {
                return error;
        }
        else {
                // console.log("BG Names: ", data);
                return data;
        }
}