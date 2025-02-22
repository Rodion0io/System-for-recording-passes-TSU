import "./authorizePage.css"

import LogInComponent from "./logInComponent/LogInComponent";

const AuthorizePage = () => {

    return (
        <>
            <main className="authorize-section">
                <div className="container">
                    <div className="authorize-container">
                        <LogInComponent/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default AuthorizePage;