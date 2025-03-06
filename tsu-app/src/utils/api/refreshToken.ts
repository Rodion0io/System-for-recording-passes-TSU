import { URL } from "../constant";

import { TokenResponseModel, RefreshTokenRequestToken } from "../../@types/api";

import { notAuthorizedRequest } from "./instances";

import axios from "axios";

export const refreshToken = async (userId: string, currentRefreshToken: string): Promise<TokenResponseModel> => {

    let body: RefreshTokenRequestToken = {
        userId: userId,
        refreshToken: currentRefreshToken
    }

    try{
        const response = await notAuthorizedRequest.post(`${URL}user/refresh-token`, body);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка отпарвки рефреш токена");
    }
}