import { URL } from "../constant";

import { UserRegisterModel } from "../../@types/api";

export const registration = async (body: UserRegisterModel) => {
    const header = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${URL}user/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Произошла ошибка авторизации!");
    }
}