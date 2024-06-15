import supabase from "./supabase";
// import { v4 as uuidv4 } from "uuid";

export default async function createNewTeams(teamsCreateParams, fetchTeamsCallback) {
    console.log("Teams create fn invoked!");
    let orgId = '';
    let parentTeamIdValue = '';
    let userdata = [];
    // const teamId = uuidv4();
    console.log("team create params:", teamsCreateParams);

    if (teamsCreateParams.organizationId === '') {
        const { data: groupData, error: grouperror } = await supabase
            .schema('mc_cap_develop')
            .from('users')
            .select('organizationId,id,display_name,full_name,email')
            .eq('display_name', teamsCreateParams.userName);

        if (grouperror) {
            console.log(grouperror);
            return "Error occurred!";
        } else {
            userdata = groupData;
            orgId = groupData[0].organizationId;
        }
    }

    if (teamsCreateParams.parentTeam !== '') {
        const { data: parentId, error: parentIderror } = await supabase
            .schema('mc_cap_develop')
            .from('teams')
            .select('teamid')
            .eq('teamname', teamsCreateParams.parentTeam);

        if (parentIderror) {
            console.log(parentIderror);
            return "Error occurred!";
        }
        else {
            parentTeamIdValue = parentId[0].teamid;
        }
    }

    const { data: insertdata, inserterror } = await supabase
        .schema('mc_cap_develop')
        .from('teams')
        .insert([
            {
                teamid: teamsCreateParams.teamid,
                teamname: teamsCreateParams.teamname,
                teamtype: teamsCreateParams.teamtype || 'internal',
                organizationId: teamsCreateParams.organizationId || orgId,
                ancestor_group_ids: [],
                ancestors: [],
                caller_capabilities: [
                    "viewLimits",
                    "moveLocation",
                    "update",
                    "view",
                    "delete",
                    "viewExternalGroupMapping",
                    "addExternalGroupMapping",
                    "removeExternalGroupMapping",
                    "viewMembers",
                    "createChild",
                    "addMembers",
                    "removeMembers",
                    "viewRoles",
                    "addRoles",
                    "removeRoles"
                ],
                members: userdata[0] ? [{
                    memberid: userdata[0].id || '',
                    memberfullname: userdata[0].full_name || '',
                    memberusername: userdata[0].display_name || '',
                    memberemail: userdata[0].email || '',
                    membership_type: teamsCreateParams.membershiptype || 'member'
                }] : teamsCreateParams.members
            },
        ])
        .select();

    if (inserterror) {
        console.error('Error inserting team data:', inserterror);
        return "Error occurred!";
    }

    async function fetchAncestors(teamId) {
        let ancestorIds = [];
        let ancestors = [];

        async function getAncestors(currentTeamId) {
            const { data, error } = await supabase
                .schema('mc_cap_develop')
                .from('teams')
                .select('teamid, teamname, teamtype, organizationId, ancestor_group_ids')
                .eq('teamid', currentTeamId)
                .single();

            if (error) {
                console.error('Error fetching team data:', error);
                return;
            }

            if (data) {
                if (!ancestorIds.includes(data.teamid)) {
                    ancestorIds.push(data.teamid);
                    ancestors.push({
                        teamid: data.teamid,
                        teamname: data.teamname,
                        teamtype: data.teamtype,
                        organizationId: data.organizationId,
                    });

                    if (data.ancestor_group_ids && data.ancestor_group_ids.length > 0) {
                        for (const ancestorId of data.ancestor_group_ids) {
                            console.log("current team id loop:",data.ancestor_group_ids);
                            console.log("current team id loop length:",data.ancestor_group_ids.length);
                            await getAncestors(ancestorId);
                        }
                    }
                }
            }
        }
        console.log("current team id:",teamId);
        await getAncestors(teamId);
        console.log("ancestor ids:", ancestorIds);
        console.log("ancestors:", ancestors);
        return { ancestorIds, ancestors };
    }

    async function updateTeamWithAncestors(teamId) {
        const parentTeamId = parentTeamIdValue;

        if (!parentTeamId) {
            console.error('Parent team ID is required');
            return;
        }

        const { ancestorIds, ancestors } = await fetchAncestors(parentTeamId);

        const { data: updateChild, updatechilderror } = await supabase
            .schema('mc_cap_develop')
            .from('teams')
            .update({
                ancestor_group_ids: ancestorIds,
                ancestors: ancestors,
                parentteamId: parentTeamId
            })
            .eq('teamid', teamId);

        if (updatechilderror) {
            console.error('Error updating team data:', updatechilderror);
            return "Error occurred!";
        }

        const { data: isChildData, isChilderror } = await supabase
            .schema('mc_cap_develop')
            .from('teams')
            .update({
                childTeams: 'true'
            })
            .eq('teamid', parentTeamId);

        if (isChilderror) {
            console.error('Error updating team data:', isChilderror);
            return "Error occurred!";
        }

        console.log('Team updated with ancestor information:', updateChild);
    }

    const teamIdToUpdate = teamsCreateParams.teamid;
    if (parentTeamIdValue !== '') {
        await updateTeamWithAncestors(teamIdToUpdate);
    }

    // Re-fetch teams after successful creation
    if (fetchTeamsCallback) {
        await fetchTeamsCallback();
    }

    return "Team created successfully!";
}
