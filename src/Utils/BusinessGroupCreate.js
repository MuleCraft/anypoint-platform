import supabase from "./supabase";

async function CreateBusinessGroup(){
    
    const { data, error } = await supabase
        .schema('mc_cap_develop')
        .from('businessGroup')
        .insert([
        { 
            username: 'someValue',
            businessGroupName: 'otherValue',
            environments: 2,
            totalVcores: 2,
            parentGroupName: '',
            canCreateChildGroup: false,
            canCreateEnvironments: false
        },
        ])
        .select()
    
    if(data){
        console.log(data);
    }
    else {
        console.log(error);
    }

}