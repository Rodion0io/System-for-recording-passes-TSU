import { URL } from "../constant";

export const logout = async (token: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${URL}user/logout`, {
        method: "POST",
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Ошибка!");
    }
}