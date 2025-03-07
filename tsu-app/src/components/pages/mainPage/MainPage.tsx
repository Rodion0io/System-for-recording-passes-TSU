import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "../applicationCard/ApplicationCard";

import Button from "../../ui/button/Button";

import { decodeToken } from "../../../utils/decodeToken";
import { getUserRequests } from "../../../utils/api/getUserRequests";
import { RequestListModel, FilterModel } from "../../../@types/api";
import { createUrl } from "../../../utils/createUrl";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const MainPage = () => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [searchParams, setSeacrchParams] = useSearchParams();

    const token = localStorage.getItem('token');

    useEffect(() => {
        const userRequests = async () => {
            if (token) {
                const userId = decodeToken(token, "user_id");
                console.log(token);
                const response = await getUserRequests(token,userId);
                setUserRequest((prev) => ({...prev, ...response}))
            }
        }
        userRequests();
    },[token]);

    const handleChangeUrlComponents = (newState: FilterModel) => {
        setUrlComponents((prevState) => ({...prevState, ...newState}));
    };

    const addFilter = async () => {
        if (token){
            const userId = decodeToken(token, "user_id");
            const urlByRequset = createUrl(urlComponents, userId);
            const response = await getUserRequests(token,urlByRequset);
            setUserRequest((prev) => ({...prev, ...response}))
            const urlByLink = createUrl(urlComponents);
            setSeacrchParams(urlByLink);
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