import supabase from "./supabase";

export default async function fetchTeamsTableRows(currentOrganization) {
  console.log('Fetch teams rows fn invoked!');
  const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("teams")
    .select("*")
    .eq("organizationId", currentOrganization);

  if (data) {
    console.log('Fetch table table rows.', data);
    return data;
  } else {
    console.log(error);
    return error;
  }
}
