import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "./applicationCard/ApplicationCard";

import { decodeToken } from "../../../utils/decodeToken";
import { getUserRequests } from "../../../utils/api/getUserRequests";
import { RequestListModel, FilterModel } from "../../../@types/api";
import { createUrl } from "../../../utils/createUrl";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MainPage = () => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [searchParams, setSeacrchParams] = useSearchParams();

    // Эта логика временная
    //Пока берем из localStorage, потом может быть будем забирать из глобального стэйта
    const token = localStorage.getItem('token');



    // Нужно запрос обернуть в try catch
    useEffect(() => {
        const userRequests = async () => {
            if (token) {
                const userId = decodeToken(token, "user_id");
                const response = await getUserRequests(token, userId);
                const datas = await response.json();
                setUserRequest((prev) => ({...prev, ...datas}))
            }
        }
        userRequests();
    },[]);

    const handleChangeUrlComponents = (newState: FilterModel) => {
        setUrlComponents((prevState) => ({...prevState, ...newState}));
    };

    const addFilter = async () => {
        if (token){
            const userId = decodeToken(token, "user_id");
            const urlByRequset = createUrl(urlComponents, userId);
            const response = await getUserRequests(token, urlByRequset);
            const datas = await response.json();
            setUserRequest((prev) => ({...prev, ...datas}))
            const urlByLink = createUrl(urlComponents);
            setSeacrchParams(urlByLink);
        }
    }

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        <FilterCard changeStateFilters={(value) => handleChangeUrlComponents(value)} addFilter={addFilter}/>
                        {userRequest?.requestsList.map((item) => (
                            <ApplicationCard
                            key={item.id}
                            props={item}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
};

export default MainPage;