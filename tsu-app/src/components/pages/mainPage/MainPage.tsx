import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "../applicationCard/ApplicationCard";

import { useUserRoles } from "../../../utils/hooks/useUserRoles";
import { useUserRequest } from "../../../utils/hooks/useUserRequest";
import { useFilter } from "./hooks/useFilter";


const MainPage = () => {
    
    const userRoles = useUserRoles();
    const userRequests = useUserRequest(userRoles);
    const {userRequest, flag, handleChangeUrlComponents, addFilter} = useFilter(userRoles);

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        <FilterCard changeStateFilters={(value) => handleChangeUrlComponents(value)} addFilter={addFilter}/>
                        {!flag ? userRequests?.requestsList.map((item) => (
                            <ApplicationCard
                            key={item.id}
                            props={item}
                            isFull={false}
                            isConcrete={false}
                            userRoles={userRoles}
                            />
                        )) :
                            userRequest?.requestsList.map((item) => (
                                <ApplicationCard
                                key={item.id}
                                props={item}
                                isFull={false}
                                isConcrete={false}
                                userRoles={userRoles}
                                />
                            ))
                        }:
                    </div>
                </div>
            </main>
        </>
    )
};

export default MainPage;