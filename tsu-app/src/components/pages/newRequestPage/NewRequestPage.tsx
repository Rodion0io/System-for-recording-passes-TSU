import "./newRequestPage.css"

import NewRequestForm from "./newRequestCardForm/NewRequestCardForm";

const NewRequestPage = () => {

    return (
        <>
            <main className="new-request">
                <div className="container">
                    <div className="new-request_container">
                        <NewRequestForm/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default NewRequestPage;