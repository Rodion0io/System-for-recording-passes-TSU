import "../../../../styles/authorizeCard.css"

import darkTsuLogo from "../../../../assets/svgs/tsuDarkLogo.svg"

import Input from "../../../ui/input/Input"
import Button from "../../../ui/button/Button"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootType } from "../../../../utils/store/store"


interface RegistrationDatas{
    name: string,
    lastName: string,
    middleName?: string,
    email: string,
    password: string
}

const RegistrationCard = () => {

    const logInFlag = useSelector((state: RootType) => state.userr.logIn);

    const [newUser, setNewUser] = useState<RegistrationDatas>({name: "", lastName: "", middleName: "", email: "", password: ""});

    const handleChange = (inputName: string, value: string) => {
        setNewUser((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    return (
        <>
            {!logInFlag ? 
                <article className="login-card">
                    <section className="content-card">
                        <div className="up-block">
                            <img src={darkTsuLogo} alt="logo" className="card-logo" />
                            <h2 className="card-title">Создание аккаунта</h2>
                        </div>
                        <Input placeholder="Фамилия" inputHandleChange={(value) => handleChange("lastname", value)}/>
                        <Input placeholder="Имя" inputHandleChange={(value) => handleChange("name", value)}/>
                        <Input placeholder="Отчество" inputHandleChange={(value) => handleChange("middlename", value)}/>
                        <Input placeholder="Почта" type="email" inputHandleChange={(value) => handleChange("email", value)}/>
                        <Input placeholder="Пароль" type="password" inputHandleChange={(value) => handleChange("password", value)}/>
                        <Button variant="button" className="btn form-button dark-button" text="Создать аккаунт"/>
                    </section>
                </article> :
                <h1>Вы авторизованы</h1>
            }
            
        </>
    )
};

export default RegistrationCard;