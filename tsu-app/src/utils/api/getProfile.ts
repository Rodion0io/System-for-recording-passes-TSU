import { URL } from "../constant";

import { UserModel } from "../../@types/api";

import { authorizeRequests } from "./instances";

import axios from "axios";

export const getProfile = async (): Promise<UserModel> => {

    try{
        const response = await authorizeRequests.get(`${URL}user/profile`);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения данных аккаунта");
    }
}