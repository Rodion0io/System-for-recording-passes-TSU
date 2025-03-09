import { useEffect, useState } from "react"

import { getUserRequests } from "../api/getUserRequests";
import { getAllUsersRequest } from "../api/getAllUsersRequest";

import { RequestListModel } from "../../@types/api"
import { decodeToken } from "../decodeToken";

export const useUserRequest = (token: string, userRoles: string[]): RequestListModel => {

    const userId = decodeToken(token, "user_id");

    const [userReuests, setUserRequests] = useState<RequestListModel>();

    useEffect(() => {
        const request = async () => {
            if (userRoles.includes("Dean") || userRoles.includes("Admin")){
                const response = await getAllUsersRequest(token, null);
                setUserRequests((prev) => ({...prev, ...response}));
            }
            else{
                const response = await getUserRequests(token, userId);
                setUserRequests((prev) => ({...prev, ...response}));
            }
        }
        request();  
    },[token, userRoles])

    return userReuests;
}