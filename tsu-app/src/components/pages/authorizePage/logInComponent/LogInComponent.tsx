import "./logInComponent.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { ROUTES } from "../../../../utils/routes"

const LogInComponent = () => {

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Вход</h2>
                    </div>
                    <Input placeholder="Логин"/>
                    <Input placeholder="Пароль" type="password"/>
                    <Button className="login-button" text="Войти"/>
                    <Button variant="link" className="btn creater-button" link={ROUTES.REGISTRATION} text="Создать аккаунт"/>
                </section>
            </article>
        </>
    )
};

export default LogInComponent;