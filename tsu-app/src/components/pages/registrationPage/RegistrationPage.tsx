import "./registrationPage.css"

import RegistrationCard from "./registrationCard/RegistrationCard";

const RegistrationPage = () => {
    
    return (
        <>
            <main className="authorize-section">
                <div className="container">
                    <div className="authorize-container">
                        <RegistrationCard/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default RegistrationPage;