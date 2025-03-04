import { URL } from "../constant";

import { UserModel } from "../../@types/api";

import axios from "axios";

// export const getProfile = async (token: string) => {
//     const header = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//     };

//     const response = await fetch(`${URL}user/profile`, {
//         method: "GET",
//         headers: header
//     });

//     if (response.ok){
//         return response;
//     }
//     else{
//         throw Error("Не получилось получить данные");
//     }
// }

export const getProfile = async (token: string): Promise<UserModel> => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await axios.get(`${URL}user/profile`, {headers: header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения данных аккаунта");
    }
}