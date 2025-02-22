import "./logInComponent.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { ROUTES } from "../../../../utils/routes"

import { useState } from "react";

interface LogInDatas{
    login: string,
    password: string
}

const LogInComponent = () => {

    const [LogInDatas, setLogInDatas] = useState<LogInDatas>({login: "", password: ""});

    const handleChange = (inputName: string, value: string) => {
        setLogInDatas((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Вход</h2>
                    </div>
                    <Input placeholder="Логин" inputHandleChange={(value) => handleChange("login", value)}/>
                    <Input placeholder="Пароль" inputHandleChange={(value) => handleChange("password", value)} type="password"/>
                    <Button className="login-button" text="Войти"/>
                    <Button variant="link" className="btn creater-button" link={ROUTES.REGISTRATION} text="Создать аккаунт"/>
                </section>
            </article>
        </>
    )
};

export default LogInComponent;