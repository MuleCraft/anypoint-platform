import supabase from "./supabase";

export default async function fetchBgTableRows(currentOrgId) {
  // console.log('Fetch rows fn invoked!');
  const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("businessgroup")
    .select("*")
    .eq("organizationId", currentOrgId);

  if (data) {
    // console.log('Fetch Bg table rows.', data);
    return data;
  } else {
    console.log(error);
    return error;
  }
}
