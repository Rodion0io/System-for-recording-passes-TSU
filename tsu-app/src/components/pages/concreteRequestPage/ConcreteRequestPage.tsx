import "./concreteRequestPage.css"

import ApplicationCard from "../applicationCard/ApplicationCard";

import { RequestModel } from "../../../@types/api";

import { getConcreteRequest } from "../../../utils/api/getConcreteRequest";

import { useUserRoles } from "../../../utils/hooks/useUserRoles";

import { useState, useEffect } from "react";
import { useLocation } from "react-router";

const ConcreteRequestPage = () => {

    const location = useLocation();
    const requestId = location.state;

    const [concreteRequest, setConcreteRequest] = useState<RequestModel>();
    const userRoles = useUserRoles();

    useEffect(() => {
        const request = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await getConcreteRequest(token, requestId);
                setConcreteRequest((prev) => ({...prev, ...response}))
            }
        }
        request();
    },[]);


    return (
        <>
            <main className="concrete-request">
                <div className="container">
                    <div className="concrete-request_container">
                        {concreteRequest ? 
                        <ApplicationCard
                            props={concreteRequest}
                             isFull={true}
                             isConcrete={true}
                             userRoles={userRoles}
                             /> : null}
                    </div>
                </div>
            </main>
        </>
    )
};

export default ConcreteRequestPage;