// ФИО, почта, пароль
import "../../../../styles/authorizeCard.css"

import darkTsuLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Input from "../../../ui/input/Input"
import Button from "../../../ui/button/Button"
import { useState } from "react"


interface RegistrationDatas{
    name: string,
    lastName: string,
    middleName?: string,
    email: string,
    password: string
}

const RegistrationCard = () => {

    const [newUser, setNewUser] = useState<RegistrationDatas>({name: "", lastName: "", middleName: "", email: "", password: ""});

    return (
        <>
            <article className="login-card">
                <section className="content-card">
                    <div className="up-block">
                        <img src={darkTsuLogo} alt="logo" className="card-logo" />
                        <h2 className="card-title">Создание аккаунта</h2>
                    </div>
                    <Input placeholder="Фамилия" />
                    <Input placeholder="Имя"/>
                    <Input placeholder="Отчество"/>
                    <Input placeholder="Почта" type="email"/>
                    <Input placeholder="Пароль" type="password"/>
                    <Button variant="button" className="btn dark-button" text="Создать аккаунт"/>
                </section>
            </article>
        </>
    )
};

export default RegistrationCard;