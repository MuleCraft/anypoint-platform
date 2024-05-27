import supabase from "./supabase";
import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";

export default async function createNewBusinessGroup(groupCreateParams) {
  console.log("Group create fn invoked!");
  console.log('reassign target parent:',groupCreateParams.parentGroupId);
  console.log('sandboxslider:',groupCreateParams.sandboxSliderValue);
  console.log('designslider:',groupCreateParams.designSliderValue);
  // const [sandboxTotalReassignedVcores, setSandboxTotalReassignedVcores] = useState(0);
  // const [designTotalReassignedVcores, setDesignTotalReassignedVcores] = useState(0);

  const clientId = uuidv4().replace(/-/g, "");
  const clientSecret = uuidv4().replace(/-/g, "");

  // const envId = uuidv4();
  // const envClientId = uuidv4().replace(/-/g, "");
  // const envClientSecret = uuidv4().replace(/-/g, "");

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
        environments: [
          { envId:uuidv4(),
            envName:"Design",
            envType:"Design",
            envClientId:uuidv4().replace(/-/g, ""),
            envClientSecret:uuidv4().replace(/-/g, "")
          },
          { envId:uuidv4(),
            envName:"Sandbox",
            envType:"Sandbox",
            envClientId:uuidv4().replace(/-/g, ""),
            envClientSecret:uuidv4().replace(/-/g, "")
          }
        ],
        totalVcores:
          groupCreateParams.sandboxSliderValue +
          groupCreateParams.designSliderValue,
        sandboxVcores: groupCreateParams.sandboxSliderValue,
        designVcores: groupCreateParams.designSliderValue,
        productionVcores: 0,
        parentGroupName: groupCreateParams.selectedGroupValue,
        parentGroupID:groupCreateParams.parentGroupId||'',
        canCreateChildGroup: groupCreateParams.isGroupCheckboxSelected,
        canCreateEnvironments: groupCreateParams.isEnvCheckboxSelected,
        organizationName: groupCreateParams.currentOrganization,
      },
    ])
    .select();
    if(error){
      console.log(error);
      return "Error occurred!";
    }

  // if (data && groupCreateParams.parentGroupId) {

    // if(groupCreateParams.parentGroupId){
      const { data: vcoreData, vcoreError } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select()
        .eq('businessGroupId', groupCreateParams.parentGroupId);
    
        console.log('vcoreData',vcoreData);

        if(vcoreError){
          console.log(vcoreError);
          return "Error occurred!";
        } 
        // else {
          // console.log('vcoreData',vcoreData);
          const sandboxTotalReassignedVcores = vcoreData[0].sandboxReassignedVcores;
          const designTotalReassignedVcores = vcoreData[0].designReassignedVcores;
          const productionTotalReassignedVcores = vcoreData[0].productionReassignedVcores;
          const oldSandboxVcores = vcoreData[0].sandboxVcores;
          const oldDesignVcores = vcoreData[0].designVcores;
          // const oldProductionVcores = vcoreData[0].productionVcores;
          console.log('reassign total:',sandboxTotalReassignedVcores+designTotalReassignedVcores+productionTotalReassignedVcores);
          const { data: updateVcores, updateError } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .update({ 
              sandboxReassignedVcores: groupCreateParams.sandboxSliderValue + sandboxTotalReassignedVcores,
              designReassignedVcores: groupCreateParams.designSliderValue + designTotalReassignedVcores,
              // productionReassignedVcores: groupCreateParams.designSliderValue + productionTotalReassignedVcores,
              sandboxVcores: oldSandboxVcores - (groupCreateParams.sandboxSliderValue + sandboxTotalReassignedVcores),
              designVcores: oldDesignVcores - (groupCreateParams.designSliderValue + designTotalReassignedVcores),
              // productionVcores: oldProductionVcores - (groupCreateParams.designSliderValue + productionTotalReassignedVcores),
              childGroups: "TRUE"
            })
            .eq('businessGroupId', groupCreateParams.parentGroupId)
            .select()
            if(updateError){
              console.log(updateError);
              return "Error occurred!";
            }
            console.log('update result:',updateVcores);
        // }
    
      // } 
      // else {
      //   setSandboxTotalReassignedVcores(0);
      //   setDesignTotalReassignedVcores(0);
      // }
        console.log("New group created!", data);
        return "New group created!";

  // } else {
  //   console.log(error);
  //   return "Error occurred!";
  // }
}
