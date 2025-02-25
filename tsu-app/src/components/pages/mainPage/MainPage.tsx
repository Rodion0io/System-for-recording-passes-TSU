import "./mainPage.css"

import FilterCard from "./filterCard/FilterCard";
import ApplicationCard from "./applicationCard/ApplicationCard";

const MainPage = () => {

    return (
        <>
            <main className="main-page">
                <div className="container">
                    <div className="main-page-container">
                        {/* <FilterCard/> */}
                        <ApplicationCard/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default MainPage;