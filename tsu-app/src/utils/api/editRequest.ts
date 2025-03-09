import { URL } from "../constant";

import { formDataRequest } from "./instances";

import axios from "axios";

export const editRequest = async (body: FormData, token: string, requestId: string): Promise<string> => {
    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await formDataRequest.put(`${URL}request/${requestId}`, body, {headers: headerAuth});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка редактирования поста или вынесения вердикта");
    }
}