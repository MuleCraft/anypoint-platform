import supabase from "./supabase";

export default async function createNewBusinessGroup(groupName, selectedGroupValue, ownerName, isGroupCheckboxSelected, isEnvCheckboxSelected, sandboxSliderValue, designSliderValue, userName, userEmail) {
    console.log('Group create fn invoked!');
    const { data, error } = await supabase
        .schema('mc_cap_develop')
        .from('businessGroup')
        .insert([
            {
                businessGroupName: groupName,
                groupOwner: ownerName,
                userName: userName,
                userEmail: userEmail,
                orgDomain: groupName,
                sessionTimeout: '60',
                childGroups: [],
                environments: ['Design', 'Sandbox'],
                totalVcores: sandboxSliderValue + designSliderValue,
                sandboxVcores: sandboxSliderValue,
                designVcores: designSliderValue,
                parentGroupName: selectedGroupValue,
                canCreateChildGroup: isGroupCheckboxSelected,
                canCreateEnvironments: isEnvCheckboxSelected
            },
        ])
        .select()

    if (data) {
        console.log('New group created!', data);
    }
    else {
        console.log(error);
    }

}