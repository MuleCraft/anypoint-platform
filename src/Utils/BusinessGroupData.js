import supabase from "./supabase";

export default async function fetchBusinessGroupNames(userName) {

        const { data, error } = await supabase
                .schema("mc_cap_develop")
                .from("businessGroup")
                .select("businessGroupName")
                .eq("userName", userName);

        if (error) {
                return error;
        }
        else {
                return data;
        }
}