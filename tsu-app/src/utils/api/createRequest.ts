import axios from "axios";

import { URL } from "../constant";

import { formDataRequest } from "./instances";


export const createRequest = async (token: string, body: FormData): Promise<string> => {

    try{
        const response = await formDataRequest.post(`${URL}request`, body);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка создания поста");
    }
}