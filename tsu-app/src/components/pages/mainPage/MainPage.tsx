import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "../applicationCard/ApplicationCard";

import Button from "../../ui/button/Button";

import { decodeToken } from "../../../utils/decodeToken";
import { getUserRequests } from "../../../utils/api/getUserRequests";
import { getAllUsersRequest } from "../../../utils/api/getAllUsersRequest";
import { RequestListModel, FilterModel } from "../../../@types/api";
import { createUrl } from "../../../utils/createUrl";
import { USER_TYPE } from "../../../utils/translationLists/userTypeTranslation";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const MainPage = () => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [searchParams, setSeacrchParams] = useSearchParams();

    const token = localStorage.getItem('token');
    const userId = decodeToken(token, "user_id");
    const userRole = decodeToken(token, "role");

    useEffect(() => {
        const userRequests = async () => {
            if (token) {
                if (userRole === "Dean" || userRole === "Admin"){
                    const response = await getAllUsersRequest(token, null);
                    setUserRequest((prev) => ({...prev, ...response}))
                }
                else{
                    const response = await getUserRequests(token,userId);
                    setUserRequest((prev) => ({...prev, ...response}))
                }
            }
        }
        userRequests();
    },[token]);

    const handleChangeUrlComponents = (newState: FilterModel) => {
        setUrlComponents((prevState) => ({...prevState, ...newState}));
    };

    const addFilter = async () => {
        if (token){

            const urlByRequset = createUrl(urlComponents);

            if (userRole === "Dean" || userRole === "Admin"){
                const response = await getAllUsersRequest(token,urlByRequset);
                setUserRequest((prev) => ({...prev, ...response}))
                const urlByLink = createUrl(urlComponents);
                setSeacrchParams(urlByLink);
            }
            else{
                const response = await getUserRequests(token,urlByRequset);
                setUserRequest((prev) => ({...prev, ...response}))
                const urlByLink = createUrl(urlComponents);
                setSeacrchParams(urlByLink);
            }
            
        }
    }

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        {token ? 
                            <><FilterCard changeStateFilters={(value) => handleChangeUrlComponents(value)} addFilter={addFilter}/>
                            {userRequest?.requestsList.map((item) => (
                                <ApplicationCard
                                key={item.id}
                                props={item}
                                isFull={false}
                                />
                            ))}</> :
                            <div className="no-auth-block">
                                <h1>Вы не авторизованы, перейдите по ссылке -</h1>
                                <Button variant="link"  link={ROUTES.AUTHORIZE} text="авторизоваться"/>
                            </div>
                        }
                    </div>
                </div>
            </main>
        </>
    )
};

export default MainPage;