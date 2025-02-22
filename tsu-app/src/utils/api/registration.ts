import { URL } from "../constant";

import { LogInDatas } from "../../@types/api";

export const registration = async (body: LogInDatas) => {
    const header = {
        "Content-Type": "application/json"
    };

    const response = await fetch(`${URL}user/login`, {
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