import axios from "axios";

export const getPhoto = async (token: string, photoPath: string) => {
    const headerAuth = {
        "Authorization": `Bearer ${token}`
    }

    try{
        const response = await axios.get(`${photoPath}`,
        {headers: headerAuth, responseType: "blob"});

        return response.data;
    }
    catch(error) {
        if (axios.isAxiosError(error)){
            console.log(error.message);
        }
        throw new Error ("Произошла ошибка получения поста");
    }
}