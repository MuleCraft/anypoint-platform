import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";

export default async function createNewTeams(teamsCreateParams){
    console.log("Teams create fn invoked!");

    const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("teams")
    .insert([
      {
        teamname: teamsCreateParams.teamname,
        teamtype: teamsCreateParams.teamtype || 'internal',
        organizationId: teamsCreateParams.organizationId,
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
          ]
      },
    ])
    .select();
}