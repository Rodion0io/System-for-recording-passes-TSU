import { useState } from "react";

import { useSearchParams } from "react-router-dom";

import { FilterModel, RequestListModel } from "../../../../@types/api";
import { decodeToken } from "../../../../utils/decodeToken";
import { createUrl } from "../../../../utils/createUrl";
import { getAllUsersRequest } from "../../../../utils/api/getAllUsersRequest";
import { getUserRequests } from "../../../../utils/api/getUserRequests";


export const useFilter = (userRoles: string[]) => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [searchParams, setSeacrchParams] = useSearchParams();
    const [flag, setFlag] = useState<boolean>(false);

    const token = localStorage.getItem('token');

    const userId = decodeToken(token, "user_id");

    const handleChangeUrlComponents = (newState: FilterModel) => {
        setUrlComponents((prevState) => ({...prevState, ...newState}));
    };
    
    const addFilter = async () => {
        if (token){

            try{
                if (userRoles.includes("Dean") || userRoles.includes("Admin")){
                    const urlByRequset = createUrl(urlComponents);
                    const response = await getAllUsersRequest(token, urlByRequset);
                    setUserRequest((prev) => ({...prev, ...response}))
                    const urlByLink = createUrl(urlComponents);
                    if (urlByLink){
                        setSeacrchParams(urlByLink);
                    }
                }
                else{
                    const urlByRequset = createUrl(urlComponents, userId);
                    const urlByLink = createUrl(urlComponents);
                    if (urlByLink && urlByRequset){
                        const response = await getUserRequests(token, urlByRequset);
                        setUserRequest((prev) => ({...prev, ...response}))
                        setSeacrchParams(urlByLink);
                    }
                }
                setFlag(true);
            }
            catch (error){
                console.error(error);
            }
        }
    }

    return {userRequest, flag, handleChangeUrlComponents, addFilter};
}