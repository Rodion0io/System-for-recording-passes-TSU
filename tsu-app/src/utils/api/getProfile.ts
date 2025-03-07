import { URL } from "../constant";

import { UserModel } from "../../@types/api";

import { authorizeRequests } from "./instances";

import axios from "axios";

export const getProfile = async (): Promise<UserModel> => {

    const token = localStorage.getItem('token')

    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.get(`${URL}user/profile`, {headers: headerAuth});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения данных аккаунта");
    }
}