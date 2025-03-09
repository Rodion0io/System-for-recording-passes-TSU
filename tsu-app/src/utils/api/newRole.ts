import { URL } from "../constant";

import axios from "axios";

import { authorizeRequests } from "./instances";

export const newRole = async (token: string, urlPattern: string) => {

    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await authorizeRequests.post(`${URL}role/${urlPattern}`, {headerAuth: headerAuth});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Не получилось выйти");
    }
}