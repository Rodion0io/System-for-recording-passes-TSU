import { URL } from "../constant";

import { UserRegisterModel, TokenResponseModel } from "../../@types/api";

import axios from "axios";

export const registration = async (body: UserRegisterModel): Promise<TokenResponseModel> => {
    const header = {
        "Content-Type": "application/json"
    };

    try{
        const response = await axios.post(`${URL}user/register`, {body: body}, {headers: header});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Не получилось зарегестрироваться");
    }
}