import "./usersConcretePage.css";

import UserCard from "../../../userCard/UserCard";
import FilterCard from "../../mainPage/filterCard/FilterCard";
import ApplicationCard from "../../applicationCard/ApplicationCard";

import { UserFullModel } from "../../../../@types/api";

import { getUserInformation } from "../../../../utils/api/getUserInformation";
import { useUserRoles } from "../../../../utils/hooks/useUserRoles";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UsersConcretePage = () => {
    const [fullUserInformation, setFullUserInformation] = useState<UserFullModel | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { id } = useParams();
    const token = localStorage.getItem('token');
    const userRoles = useUserRoles();

    useEffect(() => {
        const request = async () => {
            if (token && id) {
                try {
                    const response = await getUserInformation(token, id);
                    setFullUserInformation((prev) => ({ ...prev, ...response }));
                } catch (error) {
                    console.error('Ошибка загрузки информации о пользователе!');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        request();
    }, [id, token]);

    
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
                    <FilterCard />
                    {fullUserInformation.requests?.map((item) => (
                        <ApplicationCard
                            key={item.id}
                            props={item}
                            isFull={false}
                            userRoles={userRoles}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UsersConcretePage;