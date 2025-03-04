import { URL } from "../constant";

import { RequestEditModel } from "../../@types/api";


import axios from "axios";

export const editRequest = async (body: RequestEditModel, token: string, requestId: string): Promise<string> => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await axios.put(`${URL}request/${requestId}`, {body}, {headers:header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка редактирования поста");
    }
}