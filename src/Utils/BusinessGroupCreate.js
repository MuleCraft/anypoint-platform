import supabase from "./supabase";

export default async function createNewBusinessGroup(groupCreateParams) {
    console.log('Group create fn invoked!');
    const { data, error } = await supabase
        .schema('mc_cap_develop')
        .from('businessGroup')
        .insert([
            {
                businessGroupName: groupCreateParams.groupName,
                groupOwner: groupCreateParams.ownerName,
                userName: groupCreateParams.currentUserName,
                userEmail: groupCreateParams.currentUserEmail,
                orgDomain: groupCreateParams.groupName,
                sessionTimeout: '60',
                childGroups: [],
                environments: ['Design', 'Sandbox'],
                totalVcores: groupCreateParams.sandboxSliderValue + groupCreateParams.designSliderValue,
                sandboxVcores: groupCreateParams.sandboxSliderValue,
                designVcores: groupCreateParams.designSliderValue,
                parentGroupName: groupCreateParams.selectedGroupValue,
                canCreateChildGroup: groupCreateParams.isGroupCheckboxSelected,
                canCreateEnvironments: groupCreateParams.isEnvCheckboxSelected,
                organizationName: groupCreateParams.currentOrganization
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