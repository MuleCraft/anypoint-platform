import supabase from "./supabase";

export default async function fetchPermissionsTableRows(teamId) {

  console.log('Fetch teams rows fn invoked!');
  const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("teams")
    .select("permissions")
    .eq("teamid", teamId);

  if (data) {
    return data[0];
  } else {
    console.log(error);
    return "Error occurred!";
  }
}
