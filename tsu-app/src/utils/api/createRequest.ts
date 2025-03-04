import axios from "axios";

import { URL } from "../constant";


export const createRequest = async (token: string, body: FormData): Promise<string> => {
    const header = {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    try{
        const response = await axios.post(`${URL}request`, {body}, {headers: header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка создания поста");
    }
}