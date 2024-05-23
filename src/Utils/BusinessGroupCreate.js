import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";

export default async function createNewBusinessGroup(groupCreateParams) {
  console.log("Group create fn invoked!");
  console.log('reassign target parent:',groupCreateParams.parentGroupId);

  // const [sandboxTotalReassignedVcores, setSandboxTotalReassignedVcores] = useState(0);
  // const [designTotalReassignedVcores, setDesignTotalReassignedVcores] = useState(0);

  const clientId = uuidv4().replace(/-/g, "");

  const clientSecret = uuidv4().replace(/-/g, "");

  const { data, error } = await supabase
    .schema("mc_cap_develop")
    .from("businessgroup")
    .insert([
      {
        businessGroupName: groupCreateParams.groupName,
        clientId: clientId,
        clientSecret: clientSecret,
        groupOwner: groupCreateParams.ownerName,
        userName: groupCreateParams.currentUserName,
        userEmail: groupCreateParams.currentUserEmail,
        orgDomain: groupCreateParams.groupName,
        sessionTimeout: "60",
        environments: ["Design", "Sandbox"],
        totalVcores:
          groupCreateParams.sandboxSliderValue +
          groupCreateParams.designSliderValue,
        sandboxVcores: groupCreateParams.sandboxSliderValue,
        designVcores: groupCreateParams.designSliderValue,
        parentGroupName: groupCreateParams.selectedGroupValue,
        canCreateChildGroup: groupCreateParams.isGroupCheckboxSelected,
        canCreateEnvironments: groupCreateParams.isEnvCheckboxSelected,
        organizationName: groupCreateParams.currentOrganization,
      },
    ])
    .select();

  if (data && groupCreateParams.parentGroupId) {

    // if(groupCreateParams.parentGroupId){
      const { vcoreData, vcoreError } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select('*')
        .eq('businessGroupId', groupCreateParams.parentGroupId);
    
        console.log('vcoreData',vcoreData);
        if(vcoreError){
          console.log(error);
          return "Error occurred!";
        } 
        // else {
        //   console.log('vcoreData',vcoreData);
        //   const sandboxTotalReassignedVcores = vcoreData.sandboxReassignedVcores;
        //   const designTotalReassignedVcores = vcoreData.designReassignedVcores;
        //   console.log('reassign total:',sandboxTotalReassignedVcores+designTotalReassignedVcores);
        //   const { updateVcores, updateError } = await supabase
        //     .schema("mc_cap_develop")
        //     .from("businessgroup")
        //     .update({ 
        //       sandboxReassignedVcores: groupCreateParams.sandboxSliderValue + sandboxTotalReassignedVcores,
        //       designReassignedVcores: groupCreateParams.designSliderValue + designTotalReassignedVcores
        //     })
        //     .eq('businessGroupId', groupCreateParams.parentGroupId)
        //     .select()
        //     if(updateError){
        //       console.log(error);
        //       return "Error occurred!";
        //     }
        // }
    
      // } 
      // else {
      //   setSandboxTotalReassignedVcores(0);
      //   setDesignTotalReassignedVcores(0);
      // }
        console.log("New group created!", groupCreateParams.parentGroupId);
        return "New group created!";

  } else {
    console.log(error);
    return "Error occurred!";
  }
}
