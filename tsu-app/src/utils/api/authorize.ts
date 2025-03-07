import { URL } from "../constant";

import axios from "axios";

import { notAuthorizedRequest } from "./instances";

import { LogInDatas, TokenResponseModel } from "../../@types/api";

export const authorize = async (body: LogInDatas): Promise<TokenResponseModel> => {

    try{
        const response = await notAuthorizedRequest.post(`${URL}user/login`, body)

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка авторизации");
    }
}