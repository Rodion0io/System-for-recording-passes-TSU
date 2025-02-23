import "./profileCard.css"

import profilePhoto from "../../../../assets/photos/photo_2025-02-23 19.24.49.jpeg"

import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";
import { USER_TYPE } from "../../../../utils/userTypeTranslation";

import { ACCOUNT_CONFIRMED_TEXT, ACCOUNT_NOT_CONFIRMED_TEXT } from "../../../../utils/constant";

import { UserModel } from "../../../../@types/api";

interface PropsProfile{
    props: UserModel
}

const ProfileCard = ( { props } : PropsProfile) => {

    const userRole = props.userType;

    return (
        <>
            <div className="profile-card">
                <div className="profile-card_container">
                    <div className="datas-block">
                        <img src={profilePhoto} alt="photo" className="photo-profile" />
                        <div className="datas-block_user">
                            <div className="user-information">                            
                                <h2 className="user-name">{`${props.lastName} ${props.firstName} ${props.middleName}`}</h2>
                                {props.userType !== "Unverified" ? <p className="user-type">{USER_TYPE.userRole}</p> : null}
                            </div>
                            <p className="user-email">{props.email}</p>
                            <div className="user-status">
                                <div className={`user-status_indicator ${props.userType !== "Unverified" ? "confirmed" : "not-confirmed"}`}></div>
                                <p className="user-status_text">{props.userType !== "Unverified" ? ACCOUNT_CONFIRMED_TEXT : ACCOUNT_NOT_CONFIRMED_TEXT}</p>
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