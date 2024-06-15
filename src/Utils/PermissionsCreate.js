import supabase from "./supabase";

export default async function createPermissions(createPermissionParams) {

    console.log("create permission params:",createPermissionParams);
    const permissions = [];

    // Construct the permissions array
    createPermissionParams.groups.forEach(group => {
        createPermissionParams.roles.forEach(role => {
            permissions.push({
                groupid: group.businessGroupId,
                groupname: group.businessGroupName,
                roleid: role.roleid,
                rolename: role.rolename,
                roledetail: role.roledetail,
                targetmodule: role.targetmodule
            });
        });
    });

    console.log("Constructed permissions array:", permissions);

   // Fetch current permissions
   const { data: teamData, error: fetchError } = await supabase
        .schema('mc_cap_develop')
        .from('teams')
        .select('permissions')
        .eq('teamid', createPermissionParams.teamid)
        .single();

    if (fetchError) {
        console.error('Error fetching current permissions:', fetchError);
        return "Error occurred!";
    }

    // Append new permissions to existing ones
    const updatedPermissions = [...(teamData.permissions || []), ...permissions];

    // Update the teams table with the combined permissions array
    const { data, error } = await supabase
        .schema('mc_cap_develop')
        .from('teams')
        .update({ permissions: updatedPermissions })
        .eq('teamid', createPermissionParams.teamid);

    if (error) {
        console.error('Error adding permissions:', error);
        return "Error occurred!";
    }

    for (const group of createPermissionParams.groups) {
        // Fetch current permissionsData from the businessgroup table
        const { data: groupData, error: groupFetchError } = await supabase
            .schema('mc_cap_develop')
            .from('businessgroup')
            .select('permissionsData')
            .eq('businessGroupId', group.businessGroupId)
            .single();

        if (groupFetchError) {
            console.error(`Error fetching current permissions for group ${group.businessGroupId}:`, groupFetchError);
            return "Error occurred!";
        }

        // Construct the new permissionsData array
        const newGroupPermissions = createPermissionParams.roles.map(role => ({
            roleid: role.roleid,
            rolename: role.rolename,
            roledetail: role.roledetail,
            targetmodule: role.targetmodule
        }));

        // Append new permissions to existing ones in the businessgroup table
        const updatedGroupPermissions = [...(groupData.permissionsData || []), ...newGroupPermissions];

        // Update the businessgroup table with the combined permissions array
        const { data: groupUpdateData, error: groupUpdateError } = await supabase
            .schema('mc_cap_develop')
            .from('businessgroup')
            .update({ permissionsData: updatedGroupPermissions })
            .eq('businessGroupId', group.businessGroupId);

        if (groupUpdateError) {
            console.error(`Error adding permissions to group ${group.businessGroupId}:`, groupUpdateError);
            return "Error occurred!";
        }

        console.log(`Permissions added to group ${group.businessGroupId} successfully!`);
    }

    return "Permissions added successfully to both teams and business groups!";

}