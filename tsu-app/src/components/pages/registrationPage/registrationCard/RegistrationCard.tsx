import "../../../../styles/authorizeCard.css"

import darkTsuLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Input from "../../../ui/input/Input"
import Button from "../../../ui/button/Button"

import { ERROR_MESSAGES } from "../../../../utils/errorMessages"
import { ROUTES } from "../../../../utils/routes"

import { useRegistration } from "./hooks/useRegistration"

const RegistrationCard = () => {

    const token = localStorage.getItem('token');

    const { errorFlag, errorStatusCode, handleChange, handleClick} = useRegistration();
    

    return (
        <>
            {!token ? 
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