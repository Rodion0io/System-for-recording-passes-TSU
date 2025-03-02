import "./concreteRequestPage.css"

import ApplicationCard from "../applicationCard/ApplicationCard";

import { RequestShortModel } from "../../../@types/api";

const ConcreteRequestPage = () => {

    

    return (
        <>
            <main className="concrete-request">
                <div className="container">
                    <div className="concrete-request_container">
                        <ApplicationCard props={requestsList} isFull={true}/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default ConcreteRequestPage;