import { URL } from "../constant";

import axios from "axios";

import { authorizeRequests } from "./instances";

import { UserEditModel } from "../../@types/api";

export const editProfile = async (body: UserEditModel, token: string) => {
    
    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.put(`${URL}user/profile`, body, {headers: headerAuth});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка редактирования поста");
    }
}