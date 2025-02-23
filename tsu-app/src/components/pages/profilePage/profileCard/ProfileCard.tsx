import "./profileCard.css"

import profilePhoto from "../../../../assets/photos/photo_2025-02-23 19.24.49.jpeg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";
import { ROUTES } from "../../../../utils/routes";
import { USER_TYPE } from "../../../../utils/userTypeTranslation";
import { logout } from "../../../../utils/api/logout";
import { editProfile } from "../../../../utils/api/editProfile";

import { ACCOUNT_CONFIRMED_TEXT, ACCOUNT_NOT_CONFIRMED_TEXT } from "../../../../utils/constant";

import ModalWindow from "../modalWindow/ModelaWindow";

import { UserModel, UserEditModel } from "../../../../@types/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

interface PropsProfile{
    props: UserModel
}

const ProfileCard = ( { props } : PropsProfile) => {

    const userRole = props.userType;
    const navigate = useNavigate();

    const [modalActive, setModalActive] = useState(false);
    const [newPassword, setNewPassword] = useState<UserEditModel>({password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState(0);

    const handleClickLogout = () => {
        const token = localStorage.getItem('token');
        if (token){
            logout(token);
            localStorage.clear();
            navigate("/authorize");
        }
        
    }

    const handleChange = (inputName: string, value: string) => {
        setNewPassword((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    const handleClickChangePassword = async() => {
        if (newPassword.password.length !== 0){
            if (/\d/.test(newPassword.password)){
                const token = localStorage.getItem('token');
                try{
                    setErrorFlag(false);
                    setErrorStatusCode(0);
                    
                    await editProfile(newPassword, token);

                    setModalActive(false);
                }
                catch {
                    setErrorStatusCode(2);
                    setErrorFlag(true);
                }
            }
            else{
                setErrorFlag(true);
                setErrorStatusCode(4);
            }
        }
        else{
            setErrorFlag(true);
            setErrorStatusCode(5); 
        }
    }

    useEffect(() => {
        console.log(newPassword);
    },[newPassword]);
    

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
                        <Button variant="button" className="btn profile-actions"text="Выход" onClick={handleClickLogout}/>
                        <Button variant="button" className="btn profile-actions" text="Редактировать пароль" onClick={() => setModalActive(true)}/>
                    </div>
                </div>
            </div>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <p className="title">Придумайте новый пароль</p>
                <Input placeholder="Пароль" inputHandleChange={(value) => handleChange("password", value)} type="password"/>
                <Button variant="button" className="btn dark-button newPassword-button" text="Подтвердить" onClick={handleClickChangePassword}/>
                {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
            </ModalWindow>
        </>
    )
};

export default ProfileCard;