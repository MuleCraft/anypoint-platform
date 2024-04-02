import supabase from "./supabase";

export default async function fetchBgTableRows(currentUserName){
    // console.log('Fetch rows fn invoked!');
    const { data, error } = await supabase
        .schema('mc_cap_develop')
        .from('businessGroup')
        .select("*")
        .eq('userName',currentUserName)

    if (data) {
        // console.log('Fetch Bg table rows.', data);
        return data;
    }
    else {
        console.log(error);
        return error;
    }
}