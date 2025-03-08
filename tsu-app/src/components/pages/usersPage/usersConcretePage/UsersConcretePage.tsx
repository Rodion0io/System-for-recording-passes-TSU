import "./usersConcretePage.css"

import UserCard from "../../../userCard/UserCard";
import FilterCard from "../../mainPage/filterCard/FilterCard";
import ApplicationCard from "../../applicationCard/ApplicationCard";

import { UserModel } from "../../../../@types/api";

import { useUserInformation } from "../../../../utils/hooks/useUserInformation";
import { useUserRequest } from "../../../../utils/hooks/useUserRequest";
import { useUserRoles } from "../../../../utils/hooks/useUserRoles";

const UsersConcretePage = () => {

    const token = localStorage.getItem('token');
    const userRoles = useUserRoles();

    const userInformation: UserModel = useUserInformation();
    const userRequests = useUserRequest(token, userRoles); 
    
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
                        {userRequests?.requestsList.map((item) => (
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
        </>
    )
};

export default UsersConcretePage;