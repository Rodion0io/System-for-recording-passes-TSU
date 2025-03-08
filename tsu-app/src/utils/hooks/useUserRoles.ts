import { useState, useEffect } from "react"

import { getProfile } from "../api/getProfile";

export const useUserRoles = (): string[] => {
    const [userRoles, setUserRoles] = useState<string[]>([]);

    useEffect(() => {
        const request = async () => {
            try{
                const response = await getProfile();
                setUserRoles((prev) => ([...prev, ...response.userTypes]));
            }
            catch(error){
                console.log("Ошибка в получении списка ролей");
            }
        }
        request()
    },[]);

    return userRoles;
};