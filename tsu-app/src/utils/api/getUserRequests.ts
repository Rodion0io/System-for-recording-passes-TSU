import { URL } from "../constant";

export const getUserRequests = async (token: string, partUrl: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    console.log(token)
    console.log(partUrl);

    const response = await fetch(`${URL}request/user/${partUrl}`, {
        method: "GET",
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Не получилось получить данные");
    }
}