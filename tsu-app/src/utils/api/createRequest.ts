import { URL } from "../constant";

import { RequestData } from "../../@types/api";

export const createRequest = async (token: string, body: FormData) => {
    const header = {
        // "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };

    const response = await fetch(`${URL}request`, {
        method: "POST",
        body: body,
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Не получилось получить данные");
    }
}