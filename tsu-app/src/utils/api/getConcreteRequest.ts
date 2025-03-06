import { URL } from "../constant";

import axios from "axios";

import { authorizeRequests } from "./instances";

import { RequestModel } from "../../@types/api";


export const getConcreteRequest = async (token: string, requestId: string): Promise<RequestModel> => {
    const header = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    try{
        const response = await authorizeRequests.get(`${URL}request/${requestId}`);

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения поста");
    }
}