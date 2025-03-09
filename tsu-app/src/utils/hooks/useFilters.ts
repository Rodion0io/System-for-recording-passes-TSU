import { useState, useEffect } from "react";

import { FilterModel, RequestListModel } from "../../@types/api";
import { createUrl } from "../createUrl";

import { getAllUsersRequest } from "../api/getAllUsersRequest";
import { getUserRequests } from "../api/getUserRequests";

export const useFilters = (userRoles: string[], urlComponent: FilterModel, token: string, userId: string):
    [RequestListModel, string] => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlParams, setUrlParams] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (userRoles.includes("Dean") || userRoles.includes("Admin")) {
                const urlByRequset = createUrl(urlComponent);
                try {
                    const response = await getAllUsersRequest(token, urlByRequset);
                    setUserRequest((prev) => ({ ...prev, ...response }));
                    const urlByLink = createUrl(urlComponent);
                    setUrlParams(urlByLink);
                } catch (error) {
                    console.error("Ошибка", error);
                }
            } else {
                const urlByRequset = createUrl(urlComponent, userId);
                try {
                    const response = await getUserRequests(token, urlByRequset);
                    setUserRequest((prev) => ({ ...prev, ...response }));
                    const urlByLink = createUrl(urlComponent);
                    setUrlParams(urlByLink);
                } catch (error) {
                    console.error("Ошибка", error);
                }
            }
        };

        fetchData();
    }, [userRoles, urlComponent, token, userId]);

    return [userRequest, urlParams];
};