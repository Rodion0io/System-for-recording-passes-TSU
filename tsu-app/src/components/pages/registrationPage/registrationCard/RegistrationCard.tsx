import "../../../../styles/authorizeCard.css"

import darkTsuLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Input from "../../../ui/input/Input"
import Button from "../../../ui/button/Button"

import { UserRegisterModel } from "../../../../@types/api"
import { ERROR_MESSAGES } from "../../../../utils/errorMessages"
import { VALID_PERSONAL_DATAS, EMAIL_PATTERN, VALID_PASSWORD } from "../../../../utils/constant"
import { ROUTES } from "../../../../utils/routes"

import { registration } from "../../../../utils/api/registration"

import { RootType } from "../../../../utils/store/store"

import { useState } from "react"

import { useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"


const RegistrationCard = () => {

    const logInFlag = useSelector((state: RootType) => state.userr.logIn);

    const [newUser, setNewUser] = useState<UserRegisterModel>({firstName: "", middleName: "", lastName: "", email: "", password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);

    const navigate = useNavigate();

    const handleChange = (inputName: string, value: string) => {
        setNewUser((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };


    const handleClick = async () => {
        if (newUser.firstName.length === 0){
            setErrorStatusCode(11);
            setErrorFlag(true)
        }
        else if (newUser.lastName.length === 0){
            setErrorStatusCode(12);
            setErrorFlag(true)
        }
        else if (newUser.email.length === 0){
            setErrorStatusCode(13);
            setErrorFlag(true)
        }
        else if (newUser.password.length === 0){
            setErrorStatusCode(14);
            setErrorFlag(true)
        }
        else if (!VALID_PERSONAL_DATAS.test(newUser.firstName)){
            setErrorStatusCode(15);
            setErrorFlag(true)
        }
        else if (!EMAIL_PATTERN.test(newUser.email)){
            setErrorStatusCode(3);
            setErrorFlag(true)
        }
        else if (!VALID_PASSWORD.test(newUser.password)){
            setErrorStatusCode(16);
            setErrorFlag(true)
        }
        else{
            try{
                setErrorStatusCode(0);
                setErrorFlag(false);
                const response = (await registration(newUser))

                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("refresh", response.refreshToken);
                navigate(ROUTES.MAINPAGE);
            }
            catch{
                // Временно
                console.log("error")
            }
        }
    }

    return (
        <>
            {!logInFlag ? 
                <article className="login-card">
                    <section className="content-card">
                        <div className="up-block">
                            <img src={darkTsuLogo} alt="logo" className="card-logo" />
                            <h2 className="card-title">Создание аккаунта</h2>
                        </div>
                        <Input placeholder="Фамилия" inputHandleChange={(value) => handleChange("lastName", value)}/>
                        <Input placeholder="Имя" inputHandleChange={(value) => handleChange("firstName", value)}/>
                        <Input placeholder="Отчество*" inputHandleChange={(value) => handleChange("middleName", value)}/>
                        <Input placeholder="Почта" type="email" inputHandleChange={(value) => handleChange("email", value)}/>
                        <Input placeholder="Пароль" type="password" inputHandleChange={(value) => handleChange("password", value)}/>
                        {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                        <Button variant="button" className="btn form-button dark-button" text="Создать аккаунт" onClick={handleClick}/>
                        <Button variant="link" className="btn form-button light-button" link={ROUTES.AUTHORIZE} text="Назад"/>
                    </section>
                </article> :
                <h1>Вы авторизованы</h1>
            }
            
        </>
    )
};

export default RegistrationCard;