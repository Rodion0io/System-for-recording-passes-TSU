import { URL } from "../constant";

import axios from "axios";

import { UserEditModel } from "../../@types/api";

// export const editProfile = async (body: UserEditModel, token: string) => {
//     const header = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//     };

//     const response = await fetch(`${URL}user/profile`, {
//         method: "PUT",
//         body: JSON.stringify(body),
//         headers: header
//     });

//     if (response.ok){
//         return response;
//     }
//     else{
//         throw Error("Не получилось получить данные");
//     }
// }


export const editProfile = async (body: UserEditModel, token: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await axios.put(`${URL}user/profile`, {body}, {headers: header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка редактирования поста");
    }
}