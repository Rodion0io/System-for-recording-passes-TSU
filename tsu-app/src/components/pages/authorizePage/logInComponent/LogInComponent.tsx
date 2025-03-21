import "../../../../styles/authorizeCard.css"

import tsuDarkLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { ROUTES } from "../../../../utils/routes"
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

import { useLogin } from "./hooks/useLogin";

const LogInComponent = () => {

    const { errorFlag, errorStatusCode, handleChange, handleClick} = useLogin();

    
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