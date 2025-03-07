import { URL } from "../constant";

import { RequestListModel } from "../../@types/api";

import { authorizeRequests } from "./instances";

import axios from "axios";

export const getAllUsersRequest = async (token: string, partUrl: string | null): Promise<RequestListModel> => {

    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    console.log(partUrl);

    try{
        const response = await authorizeRequests.get<RequestListModel>(`${URL}request${partUrl !== null ? partUrl : ""}`,
            {headers: headerAuth}
        )


        return response.data;
    }
    catch (error){
        if (axios.isAxiosError(error)){
            console.log(error.message)
        }
        throw new Error ("Ошибка");
    }
    
}