import { URL } from "../constant";

import axios from "axios";

import { LogInDatas, TokenResponseModel } from "../../@types/api";

export const authorize = async (body: LogInDatas): Promise<TokenResponseModel> => {
    const header = {
        "Content-Type": "application/json"
    };

    try{
        const response = await axios.post(`${URL}user/login`, {body}, {headers: header})

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка авторизации");
    }
}