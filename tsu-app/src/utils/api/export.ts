import { URL } from "../constant";

import { formDataRequest } from "./instances";

import axios from "axios";

export const exportDatasFile = async (token: string, urlPattern: string) => {
    const headerAuth = {
        Authorization: `Bearer ${token}`
    };

    try {
        const response = await formDataRequest.get(`${URL}report${urlPattern}`, {
            headers: headerAuth,
            responseType: "blob"
        });

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.message);
        }
        throw new Error("Произошла ошибка редактирования поста или вынесения вердикта");
    }
};
