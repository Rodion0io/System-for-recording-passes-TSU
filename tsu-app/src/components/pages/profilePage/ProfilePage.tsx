import "./profilePAge.css"

import ProfileCard from "./profileCard/ProfileCard";

const ProfilePage = () => {
    
    return (
        <>
            <main className="profile-page">
                <div className="container">
                    <div className="profile-page_container">
                        <ProfileCard/>
                    </div>
                </div>
            </main>
        </>
    )
};

export default ProfilePage;