import "./usersConcretePage.css";

import UserCard from "../../../userCard/UserCard";
import FilterCard from "../../mainPage/filterCard/FilterCard";
import ApplicationCard from "../../applicationCard/ApplicationCard";

import { FilterModel, RequestListModel, UserFullModel } from "../../../../@types/api";

import { getUserInformation } from "../../../../utils/api/getUserInformation";
import { useUserRoles } from "../../../../utils/hooks/useUserRoles";

import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { decodeToken } from "../../../../utils/decodeToken";
import { createUrl } from "../../../../utils/createUrl";
import { getAllUsersRequest } from "../../../../utils/api/getAllUsersRequest";
import { getUserRequests } from "../../../../utils/api/getUserRequests";

const UsersConcretePage = () => {

    const [fullUserInformation, setFullUserInformation] = useState<UserFullModel | null>(null);
    const [urlComponents, setUrlComponents] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [userRequest, setUserRequest] = useState<RequestListModel>();
    const [searchParams, setSeacrchParams] = useSearchParams();
    const [flag, setFlag] = useState<boolean>(false);

    const { id } = useParams();
    const token = localStorage.getItem('token');
    const userRoles = useUserRoles();
    const userId = decodeToken(token, "user_id");

    useEffect(() => {
        const request = async () => {
            if (token && id) {
                try {
                    const response = await getUserInformation(token, id);
                    setFullUserInformation((prev) => ({ ...prev, ...response }));
                } catch (error) {
                    console.error('Ошибка загрузки информации о пользователе!');
                }
            }
        };
        request();
    }, [id, token]);

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

    
    if (!fullUserInformation) {
        return <div>Данные о пользователе не найдены.</div>;
    }

    return (
        <div className="user-concrete-section">
            <div className="container">
                <div className="user-concrete-section_container">
                    <UserCard
                        props={fullUserInformation.user}
                        forList={true}
                    />
                    <FilterCard changeStateFilters={(value) => handleChangeUrlComponents(value)} addFilter={addFilter}/>
                    {!flag ? fullUserInformation.requests?.map((item) => (
                        <ApplicationCard
                            key={item.id}
                            props={item}
                            isFull={false}
                            userRoles={userRoles}
                        />
                    )):
                        userRequest?.requestsList.map((item) => (
                            <ApplicationCard
                                key={item.id}
                                props={item}
                                isFull={false}
                                userRoles={userRoles}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default UsersConcretePage;