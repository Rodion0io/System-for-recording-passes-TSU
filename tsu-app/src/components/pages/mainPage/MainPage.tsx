import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "./applicationCard/ApplicationCard";

import { decodeToken } from "../../../utils/decodeToken";
import { getUserRequests } from "../../../utils/api/getUserRequests";
import { RequestListModel } from "../../../@types/api";
import { useEffect, useState } from "react";

const MainPage = () => {

    const [userRequest, setUserRequest] = useState<RequestListModel>();

    // Эта логика временная
    //Пока берем из localStorage, потом может быть будем забирать из глобального стэйта
    const token = localStorage.getItem('token');

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

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        <FilterCard/>
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