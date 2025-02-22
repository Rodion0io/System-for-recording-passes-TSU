import "../../../../styles/authorizeCard.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { ROUTES } from "../../../../utils/routes"
import { authorize } from "../../../../utils/api/authorize";

import { useState } from "react";

import { LogInDatas } from "../../../../@types/api";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { logIn } from "../../../../utils/store/slices/userSlice";

const LogInComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [LogInDatas, setLogInDatas] = useState<LogInDatas>({email: "", password: ""});
    
    const handleChange = (inputName: string, value: string) => {
        setLogInDatas((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    const handleClick = async () => {
        try{
            console.log(LogInDatas);
            const token = (await (await(authorize(LogInDatas))).json()).token;

            dispatch(logIn(token));
            navigate('/');
        }
        catch (error){
            console.log(error)
            alert("Ошибка авторизации");
        }
    }

    

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Вход</h2>
                    </div>
                    <Input placeholder="Логин" inputHandleChange={(value) => handleChange("email", value)}/>
                    <Input placeholder="Пароль" inputHandleChange={(value) => handleChange("password", value)} type="password"/>
                    <Button className="dark-button" text="Войти" onClick={handleClick}/>
                    <Button variant="link" className="btn light-button" link={ROUTES.REGISTRATION} text="Создать аккаунт"/>
                </section>
            </article>
        </>
    )
};

export default LogInComponent;