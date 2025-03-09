import "./userCard.css"

import profilePhoto from "../../assets/photos/photo_2025-02-23 19.24.49.jpeg"

import Button from "../ui/button/Button";
import Input from "../ui/input/Input";
import { ROUTES } from "../../utils/routes";
import { USER_TYPE } from "../../utils/translationLists/userTypeTranslation";
import { logout } from "../../utils/api/logout";
import { editProfile } from "../../utils/api/editProfile";
import { userTypeTranslate } from "../../utils/userTypeTranslate";
import { newRole } from "../../utils/api/newRole";
import { useUserRoles } from "../../utils/hooks/useUserRoles";

import { logOut } from "../../utils/store/slices/userSlice";

import { ACCOUNT_CONFIRMED_TEXT, ACCOUNT_NOT_CONFIRMED_TEXT, USERS_ROLES } from "../../utils/constant";
import { ERROR_MESSAGES } from "../../utils/errorMessages";

import ModalWindow from "../ui/modalWindow/ModelaWindow";

import { UserModel, UserEditModel } from "../../@types/api";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import Select from "../ui/select/Select";
import { createUrl } from "../../utils/createUrl";

interface PropsProfile{
    props: UserModel,
    forList: boolean
}

const UserCard = ( { props, forList = false } : PropsProfile) => {
    
    const [redactModalActive, setRedactModal] = useState<boolean>(false);
    const [appointModal, setAppointModal] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<UserEditModel>({password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState(0);
    const [role, setRole] = useState<string>("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentUserRoles: string[] = useUserRoles();

    const handleClickLogout = () => {
        const token = localStorage.getItem('token');
        if (token){
            logout(token);
            dispatch(logOut());
            localStorage.clear();
            navigate(ROUTES.AUTHORIZE);
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

                    setRedactModal(false);
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
        setNewPassword((prevItem) => (
            {...prevItem,
            ["password"]: ""}
            
        ))
        setErrorFlag(false);
        setErrorStatusCode(0);
    },[redactModalActive]);

    const handleNewRole = async () => {
        console.log(!currentUserRoles.includes("Dean") 
        || !currentUserRoles.includes("Admin"));
        if ((role === "Admin" && !currentUserRoles.includes("Admin")) || 
            role === "Dean" && !currentUserRoles.includes("Admin")){
                setErrorStatusCode(17);
                setErrorFlag(true);
        }
        else if (role === "Teacher" && (!currentUserRoles.includes("Dean") 
            || !currentUserRoles.includes("Admin"))||
                role === "Student" && (!currentUserRoles.includes("Dean") 
                || !currentUserRoles.includes("Admin"))){
                setErrorStatusCode(18);
                setErrorFlag(true);
        }
        else if (props.userTypes.includes(role)){
            setErrorStatusCode(19);
            setErrorFlag(true);
        }
        else{
            try{
                const token = localStorage.getItem('token');
                const urlPattern = createUrl(role, props.id);
                setErrorFlag(false);
                setErrorStatusCode(0);
                if (token){
                    await newRole(token, urlPattern);   
                }
                navigate(ROUTES.USER_LIST)
            }
            catch(error){
                console.error("Ошибка назнаяения роли")
            }
        }
    }
    

    return (
        <>
            <div className="profile-card">
                <div className="profile-card_container">
                    <div className="datas-block">
                        <img src={profilePhoto} alt="photo" className="photo-profile" />
                        <div className="datas-block_user">
                            <div className="user-information">
                                {!forList ? 
                                    <h2 className="user-name">{`${props.lastName} ${props.firstName} ${props.middleName}`}</h2>:
                                    <Button variant="link" className="user-name user-link" link={`${ROUTES.USER_LIST}/${props.id}`}
                                     text={`${props.lastName} ${props.firstName} ${props.middleName}`}/>
                                }                      
                                {!props.userTypes.includes("Unverified") ? <p className="user-type">{userTypeTranslate(props.userTypes).join(',')}</p> : null}
                            </div>
                            <p className="user-email">{props.email}</p>
                            <div className="user-status">
                                <div className={`user-status_indicator ${!props.userTypes.includes("Unverified") ? "confirmed" : "not-confirmed"}`}></div>
                                <p className="user-status_text">{!props.userTypes.includes("Unverified") ? ACCOUNT_CONFIRMED_TEXT : ACCOUNT_NOT_CONFIRMED_TEXT}</p>
                            </div>
                        </div>
                    </div>
                    {!forList ?
                        <div className="actions-block">
                            <Button variant="button" className="btn profile-actions" text="Выход" onClick={handleClickLogout}/>
                            <Button variant="button" className="btn profile-actions" text="Редактировать пароль" onClick={() => setRedactModal(true)}/>
                        </div>:
                        <div className="actions-block">
                            <Button variant="button" className="btn profile-actions" text="Назначить" onClick={() => setAppointModal(true)}/>
                            <Button variant="button" className="btn cancellation" text="Отстранить" onClick={() => setAppointModal(true)}/>
                        </div>
                    }
                    
                </div>
            </div>
            <ModalWindow active={redactModalActive} setActive={setRedactModal}>
                <div className="modal-card-container">
                    <p className="title">Придумайте новый пароль</p>
                    <Input placeholder="Пароль" inputHandleChange={(value) => handleChange("password", value)} type="password"/>
                    <Button variant="button" className="btn newPassword-button" text="Подтвердить" onClick={handleClickChangePassword}/>
                    {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                </div>
            </ModalWindow>
            <ModalWindow active={appointModal} setActive={setAppointModal}>
                <div className="modal-card-container">
                    <p className="title">Назначить роль</p>
                    <p className="title">{`Текущие роли: ${props.userTypes}`}</p>
                    <Select className="filter-select" valuesArr={USERS_ROLES} name="Статус заявок" lableClass="filter-label" 
                                typeSort="rolesType" selectChange={(value) => setRole(value)}/>
                    <Button variant="button" className="btn newPassword-button" text="Подтвердить" onClick={handleNewRole}/>
                    {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                </div>
            </ModalWindow>
        </>
    )
};

export default UserCard;