import "./profileCard.css"

import profilePhoto from "../../../../assets/photos/photo_2025-02-23 19.24.49.jpeg"

import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";

const ProfileCard = () => {
    
    return (
        <>
            <div className="profile-card">
                <div className="profile-card_container">
                    <div className="datas-block">
                        <img src={profilePhoto} alt="" className="photo-profile" />
                        <div className="datas-block_user">
                            <div className="user-information">                            
                                <h2 className="user-name">Иванов Иван Иванович</h2>
                                <p className="user-type">Студент</p>
                            </div>
                            <p className="user-email">example@gmail.com</p>
                            <div className="user-status">
                                {/* В зависимости от поля userType будет добавлять приписка к классу */}
                                <div className="user-status_indicator"></div>
                                <p className="user-status_text">Аккаунт подтвержден</p>
                            </div>
                        </div>
                    </div>
                    <div className="actions-block">
                        <Button variant="link" className="btn profile-actions" link={ROUTES.MAINPAGE} text="Выход"/>
                        <Button variant="link" className="btn profile-actions" link={ROUTES.MAINPAGE} text="Редактировать пароль"/>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ProfileCard;