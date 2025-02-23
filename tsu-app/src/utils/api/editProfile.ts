import { URL } from "../constant";

import { UserEditModel } from "../../@types/api";

export const editProfile = async (body: UserEditModel, token: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${URL}user/profile`, {
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