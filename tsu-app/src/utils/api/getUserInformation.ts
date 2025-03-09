import { URL } from "../constant";

import { UserFullModel } from "../../@types/api";

import { authorizeRequests } from "./instances";

import axios from "axios";

export const getUserInformation = async (token: string, userId: string): Promise<UserFullModel> => {

    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.get<UserFullModel>(`${URL}user/profile/${userId}`,
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