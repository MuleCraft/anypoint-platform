import adminAuthClient from "./api";


export default async function fetchUserInviteTable() {


    const { data, error } = await adminAuthClient.listUsers()



    if (error) {
        return error;
    }
    else {

        return data;
    }
}