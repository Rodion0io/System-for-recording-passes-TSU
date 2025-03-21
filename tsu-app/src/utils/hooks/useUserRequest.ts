import { useEffect, useState } from "react"

import { getUserRequests } from "../api/getUserRequests";
import { getAllUsersRequest } from "../api/getAllUsersRequest";

import { RequestListModel } from "../../@types/api"
import { decodeToken } from "../decodeToken";

export const useUserRequest = (userRoles: string[]): RequestListModel => {

    const token = localStorage.getItem('token');

    const userId = decodeToken(token, "user_id");

    const [userReuests, setUserRequests] = useState<RequestListModel>();

    useEffect(() => {
        const request = async () => {
            if (token){
                if ((userRoles.includes("Dean") || userRoles.includes("Admin"))){
                    const response = await getAllUsersRequest(token, null);
                    setUserRequests((prev) => ({...prev, ...response}));
                }
                else{
                    const response = await getUserRequests(token, userId);
                    setUserRequests((prev) => ({...prev, ...response}));
                }
            }
        }
        request();  
    },[token, userRoles])

    return userReuests;
}