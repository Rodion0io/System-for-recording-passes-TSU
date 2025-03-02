import { URL } from "../constant";

import { RequestEditModel } from "../../@types/api";

export const editRequest = async (body: RequestEditModel, token: string, requestId: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${URL}request/${requestId}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Не получилось получить данные");
    }
}