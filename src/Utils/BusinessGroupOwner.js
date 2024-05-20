import supabase from "./supabase";

export default async function fetchBusinessGroupOwners(userName) {
  const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("businessgroup")
    .select("groupOwner,userName,businessGroupId")
    .eq("organizationName", userName);

  if (error) {
    return error;
  } else {
    return data;
  }
}
