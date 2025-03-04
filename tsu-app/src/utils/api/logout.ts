import { URL } from "../constant";

import axios from "axios";

export const logout = async (token: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await axios.post(`${URL}user/logout`, {header: header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Не получилось выйти");
    }
}