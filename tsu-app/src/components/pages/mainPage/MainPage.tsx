import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "../applicationCard/ApplicationCard";
import ModalWindow from "../../ui/modalWindow/ModelaWindow";

import Button from "../../ui/button/Button";

import { decodeToken } from "../../../utils/decodeToken";
import { getUserRequests } from "../../../utils/api/getUserRequests";
import { getAllUsersRequest } from "../../../utils/api/getAllUsersRequest";
import { RequestListModel, FilterModel } from "../../../@types/api";
import { createUrl } from "../../../utils/createUrl";
import { useUserRoles } from "../../../utils/hooks/useUserRoles";
import { useUserRequest } from "../../../utils/hooks/useUserRequest";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const MainPage = () => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [searchParams, setSeacrchParams] = useSearchParams();
    const [flag, setFlag] = useState<boolean>(false);
    
    const userRoles = useUserRoles();

    const token = localStorage.getItem('token');
    const userId = decodeToken(token, "user_id");
    const userRequests = useUserRequest(token, userRoles);


    const handleChangeUrlComponents = (newState: FilterModel) => {
        setUrlComponents((prevState) => ({...prevState, ...newState}));
    };

    const addFilter = async () => {
        if (token){

            if (userRoles.includes("Dean") || userRoles.includes("Admin")){
                const urlByRequset = createUrl(urlComponents);
                const response = await getAllUsersRequest(token,urlByRequset);
                setUserRequest((prev) => ({...prev, ...response}))
                const urlByLink = createUrl(urlComponents);
                setSeacrchParams(urlByLink);
            }
            else{
                const urlByRequset = createUrl(urlComponents, userId);
                const response = await getUserRequests(token,urlByRequset);
                setUserRequest((prev) => ({...prev, ...response}))
                const urlByLink = createUrl(urlComponents);
                setSeacrchParams(urlByLink);
            }
            setFlag(true);
        }
    }

    

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        {token ? 
                            <><FilterCard changeStateFilters={(value) => handleChangeUrlComponents(value)} addFilter={addFilter}/>
                            {!flag ? userRequests?.requestsList.map((item) => (
                                <ApplicationCard
                                key={item.id}
                                props={item}
                                isFull={false}
                                userRoles={userRoles}
                                />
                            )) :
                                userRequest?.requestsList.map((item) => (
                                    <ApplicationCard
                                    key={item.id}
                                    props={item}
                                    isFull={false}
                                    userRoles={userRoles}
                                    />
                                ))
                            }</> :
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