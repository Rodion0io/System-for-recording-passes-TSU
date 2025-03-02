import { URL } from "../constant";

export const getConcreteRequest = async (token: string, requestId: string) => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${URL}request/${requestId}`, {
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