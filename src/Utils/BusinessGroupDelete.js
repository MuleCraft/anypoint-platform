import supabase from "./supabase";

export default async function deleteBusinessGroup(targetGroup){
    console.log("Group delete fn invoked!");

    const { data: childData, childError } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select()
        .eq('businessGroupId',targetGroup.businessGroupId);
    
        console.log('childData',childData);

        if(childError){
          console.log(childError);
          return "Error occurred!";
        }

        const oldSandboxVcores = childData[0].sandboxVcores;
        const oldDesignVcores = childData[0].designVcores;
          // const oldProductionVcores = childData[0].productionVcores;

    const { error } = await supabase
    .schema("mc_cap_develop")
    .from("businessgroup")
    .delete()
    .eq('businessGroupId', targetGroup.businessGroupId);

    if(error){
        console.log(error);
        return "Error occurred!";
    }
    
    const { data: parentData, parentError } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select()
        .eq('businessGroupId',targetGroup.parentGroupID);
    
        console.log('parentData',parentData);

        if(parentError){
          console.log(parentError);
          return "Error occurred!";
        }
        const { data: childCountData, childCountError } = await supabase
        .schema("mc_cap_develop")
        .from("businessgroup")
        .select()
        .eq('parentGroupID',targetGroup.parentGroupID);

        const isChildPresent = childCountData.length>0 ? 'TRUE' : 'FALSE';
    
        // console.log('childCountData',isChildPresent);

        if(childCountError){
          console.log(childCountError);
          return "Error occurred!";
        }
          
          const parentSandboxVcores = parentData[0].sandboxVcores;
          const parentDesignVcores = parentData[0].designVcores;
          const sandboxTotalReassignedVcores = parentData[0].sandboxReassignedVcores;
          const designTotalReassignedVcores = parentData[0].designReassignedVcores;
        //   const productionTotalReassignedVcores = parentData[0].productionReassignedVcores;

          const { data: updateVcores, updateError } = await supabase
            .schema("mc_cap_develop")
            .from("businessgroup")
            .update({ 
              sandboxReassignedVcores: sandboxTotalReassignedVcores - oldSandboxVcores,
              designReassignedVcores: designTotalReassignedVcores - oldDesignVcores,
              sandboxVcores: parentSandboxVcores + oldSandboxVcores,
              designVcores: parentDesignVcores + oldDesignVcores,
              // productionVcores: oldProductionVcores - (groupCreateParams.designSliderValue + productionTotalReassignedVcores),
              childGroups: isChildPresent
            })
            .eq('businessGroupId', targetGroup.parentGroupID)
            .select()
            if(updateError){
              console.log(error);
              return "Error occurred!";
            }
            console.log('update result:',updateVcores);
        console.log("Target group deleted!");
        return "Target group deleted!";
}