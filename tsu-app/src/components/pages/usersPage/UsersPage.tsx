import "./usersPage.css"

import UserCard from "../../userCard/UserCard";

import { getAllUseres } from "../../../utils/api/getAllUseres";

import { UserModel } from "../../../@types/api";

import { useState, useEffect } from "react";

const UsersPage = () => {

    const token = localStorage.getItem('token');

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

    useEffect(() => {
        console.log(usersList);
    },[usersList]);
    
    return (
        <>
            <main className="users-section">
                <div className="container">
                    <div className="user-section_container">
                        {usersList.map((item) => (
                            <UserCard 
                            props={item}
                            forList={true}
                            key={item.id}
                        />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
};

export default UsersPage;