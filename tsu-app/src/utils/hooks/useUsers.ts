import { useState, useEffect } from "react"

import { selectedValue } from "../../@types/api";

import { getAllUseres } from "../api/getAllUseres";

export const useUsers = (token: string): selectedValue[] => {
    const [userRoles, setUserRoles] = useState<selectedValue[]>([]);
    let arr: selectedValue[] = [];

    useEffect(() => {
        const request = async () => {
            try{
                const response = await getAllUseres(token);
                response.map((item) => (
                    arr.push({value: `${item.firstName} ${item.middleName} ${item.lastName}`, id: item.id})
                ))
                setUserRoles(arr);
            }
            catch(error){
                console.log("Ошибка в получении списка ролей");
            }
        }
        request()
    },[]);

    return userRoles;
};