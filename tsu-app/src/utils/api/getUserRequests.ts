import { URL } from "../constant";

import { RequestListModel } from "../../@types/api";

import axios from "axios";

export const getUserRequests = async (token: string, partUrl: string): Promise<RequestListModel> => {

    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await axios.get<RequestListModel>(`${URL}request/user/${partUrl}`, {headers: header})

        return response.data;
    }
    catch (error){
        if (axios.isAxiosError(error)){
            console.log(error.message)
        }
        throw new Error ("Ошибка");
    }
    
}