import { useState, useEffect } from "react"

import { selectedValue } from "../../@types/api";

import { getAllUseres } from "../api/getAllUseres";

export const useUsers = (): selectedValue[] => {
    const [userRoles, setUserRoles] = useState<selectedValue[]>([]);
    let arr: selectedValue[] = [];

    const token = localStorage.getItem('token');

    useEffect(() => {
        const request = async () => {
            try{
                if (token){
                    const response = await getAllUseres(token);
                    response.map((item) => (
                        arr.push({value: `${item.firstName} ${item.middleName} ${item.lastName}`, id: item.id})
                    ))
                    setUserRoles(arr);
                }
            }
            catch(error){
                console.log("Ошибка в получении списка ролей");
            }
        }
        request()
    },[]);

    return userRoles;
};