import "./usersPage.css"

import UserCard from "../../userCard/UserCard";

import { getAllUseres } from "../../../utils/api/getAllUseres";
import { useUserInformation } from "../../../utils/hooks/useUserInformation";

import { UserModel } from "../../../@types/api";

import { useState, useEffect } from "react";


const UsersPage = () => {

    const token = localStorage.getItem('token');

    const user = useUserInformation()
    
    const [usersList, setUseresList] = useState<UserModel[]>([]);

    useEffect(() => {
        const getProfileDatas = async () => {
            if (token){
                const response = await getAllUseres(token);
                setUseresList((prev) => ([...prev, ...response]));
            }
        }
        getProfileDatas();
    }, []);
    
    return (
        <>
            <main className="users-section">
                <div className="container">
                    <div className="user-section_container">
                        {usersList.map((item) => (
                            user.id !== item.id ?
                            <UserCard 
                            props={item}
                            forList={true}
                            key={item.id}
                            />:
                            null
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
};

export default UsersPage;