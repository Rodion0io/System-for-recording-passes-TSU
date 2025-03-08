import { URL } from "../constant";

import { UserModel } from "../../@types/api";

import { authorizeRequests } from "./instances";


import axios from "axios";

export const getAllUseres = async (token: string): Promise<UserModel[]> => {
    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.get(`${URL}report/users`, {headers: headerAuth});

        return response.data.usersList;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения списка пользователей");
    }
}