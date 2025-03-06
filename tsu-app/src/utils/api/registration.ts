import { URL } from "../constant";

import { UserRegisterModel, TokenResponseModel } from "../../@types/api";

import { notAuthorizedRequest } from "./instances";

import axios from "axios";

export const registration = async (body: UserRegisterModel): Promise<TokenResponseModel> => {

    try{
        const response = await notAuthorizedRequest.post(`${URL}user/register`, body);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Не получилось зарегестрироваться");
    }
}