import "./logInComponent.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";

const LogInComponent = () => {

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={tsuDarkLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Вход</h2>
                    </div>
                    <input type="text" />
                    <input type="text" />
                    <Button className="login-button" text="Войти"/>
                    <Button className= "creater-button" text="Создать аккаунт"/>
                </section>
            </article>
        </>
    )
};

export default LogInComponent;