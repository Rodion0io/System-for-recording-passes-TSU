import "./profilePAge.css"

import ProfileCard from "./profileCard/ProfileCard";

import { getProfile } from "../../../utils/api/getProfile";

import { UserModel } from "../../../@types/api";

import { useEffect, useState } from "react";

const ProfilePage = () => {

    const token = localStorage.getItem('token');

    const [userProfile, setUserProfile] = useState<UserModel>({id: "", firstName: "", middleName: "", lastName: "", email: "", userType: ""})

    useEffect(() => {
        const getProfileDatas = async () => {
            if (token){
                const response = await getProfile(token);
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
                        <ProfileCard props={userProfile}/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default ProfilePage;