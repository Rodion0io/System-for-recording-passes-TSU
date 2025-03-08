import "./profilePAge.css"

import UserCard from "../../userCard/UserCard";

import { getProfile } from "../../../utils/api/getProfile";

import { UserModel } from "../../../@types/api";

import { useEffect, useState } from "react";

const ProfilePage = () => {

    const token = localStorage.getItem('token');

    const [userProfile, setUserProfile] = useState<UserModel>({id: "", firstName: "", middleName: "", lastName: "", email: "", userTypes: []})

    useEffect(() => {
        const getProfileDatas = async () => {
            if (token){
                const response = await getProfile();
                setUserProfile((prev) => ({...prev, ...response}));
            }
        }
        getProfileDatas();
    }, []);
    
    return (
        <>
            <main className="profile-page">
                <div className="container">
                    <div className="profile-page_container">
                        <UserCard 
                            props={userProfile}
                            forList={false}
                        />
                    </div>
                </div>
            </main>
        </>
    )
};

export default ProfilePage;