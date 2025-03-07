import { URL } from "../constant";

import { RequestListModel } from "../../@types/api";

import { authorizeRequests } from "./instances";

import axios from "axios";

export const getUserRequests = async (token: string, partUrl: string): Promise<RequestListModel> => {

    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.get<RequestListModel>(`${URL}request/user/${partUrl}`,
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