import "./usersConcretePage.css"

import UserCard from "../../../userCard/UserCard";
import FilterCard from "../../mainPage/filterCard/FilterCard";
import ApplicationCard from "../../applicationCard/ApplicationCard";

import { UserModel } from "../../../../@types/api";

import { useUserInformation } from "../../../../utils/hooks/useUserInformation";

import { useState } from "react";


const UsersConcretePage = () => {

    const userInformation: UserModel = useUserInformation();
    
    
    
    return (
        <>
            <div className="user-concrete-section">
                <div className="container">
                    <div className="user-concrete-section_container">
                        <UserCard 
                            props={userInformation}
                            forList={true}
                        />
                        <FilterCard/>

                    </div>
                </div>
            </div>
        </>
    )
};

export default UsersConcretePage;