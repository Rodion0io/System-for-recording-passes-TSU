import { URL } from "../constant";

import axios from "axios";

import { authorizeRequests } from "./instances";

export const logout = async (token: string) => {

    try{
        const response = await authorizeRequests.post(`${URL}user/logout`);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Не получилось выйти");
    }
}