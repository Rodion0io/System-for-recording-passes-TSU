import "../../../../styles/authorizeCard.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { ROUTES } from "../../../../utils/routes"
import { authorize } from "../../../../utils/api/authorize";
import { LogInDatas } from "../../../../@types/api";
import { logIn } from "../../../../utils/store/slices/userSlice";
import { RootType } from "../../../../utils/store/store";
import { EMAIL_PATTERN } from "../../../../utils/constant";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogInComponent = () => {

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    // const logInFlag = useSelector((state: RootType) => state.userr.logIn);


    const [LogInDatas, setLogInDatas] = useState<LogInDatas>({email: "", password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    
    const handleChange = (inputName: string, value: string) => {
        setLogInDatas((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    const handleClick = async () => {

        if (LogInDatas.email.length === 0 || LogInDatas.password.length === 0){
            setErrorStatusCode(1);
            setErrorFlag(true);
        }
        else if (!EMAIL_PATTERN.test(LogInDatas.email)){
            setErrorStatusCode(3);
            setErrorFlag(true);
        }
        else if (EMAIL_PATTERN.test(LogInDatas.email) && LogInDatas.password.length !== 0){
            try{
                setErrorFlag(false);
                setErrorStatusCode(0);
                const response = await authorize(LogInDatas);
    
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem('refresh', response.refreshToken);
                
                

                navigate(ROUTES.MAINPAGE);
            }
            catch {
                setErrorStatusCode(2);
                setErrorFlag(true);
            }
        }
    };

    
    return (
        <>
            {!localStorage.getItem('token') ? 
                <article className="login-card">
                    <section className="content-card">
                        <div className="up-block">
                            <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                            <h2 className="card-title">Вход</h2>
                        </div>
                        <Input placeholder="Логин" inputHandleChange={(value) => handleChange("email", value)}/>
                        <Input placeholder="Пароль" inputHandleChange={(value) => handleChange("password", value)} type="password"/>
                        {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                        <Button className="btn form-button dark-button" text="Войти" onClick={handleClick}/>
                        <Button variant="link" className="btn form-button light-button" link={ROUTES.REGISTRATION} text="Создать аккаунт"/>
                    </section>
                </article>:
                <h1>Вы авторизованы</h1>
            }
            
        </>
    )
};

export default LogInComponent;