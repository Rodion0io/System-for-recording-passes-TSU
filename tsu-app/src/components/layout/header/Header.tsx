import "./header.css"

import tsuLogo from "../../../assets/svgs/tsuLightLogo.svg"

import Button from "../../ui/button/Button"

import { ROUTES } from "../../../utils/routes"

import { useUserRoles } from "../../../utils/hooks/useUserRoles"

const Header = () => {

    const token = localStorage.getItem("token");

    const userRoles = useUserRoles();
    
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="nav-container">
                        <img src={tsuLogo} alt="" className="hero-logo" />
                        <nav className="navbar">
                            {token ? 
                                <>
                                <div className="left-part">
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.MAINPAGE} text="Главная"/>
                                    {userRoles.includes("Student") ?
                                        <Button variant="navLink" className="btn nav-link" link={ROUTES.NEW_REQUEST} text="Новая заявка"/>:
                                        null
                                    }
                                </div>
                                {userRoles.includes("Dean") || userRoles.includes("Admin") ? 
                                    <div className="right-part">
                                        <Button variant="navLink" className="btn nav-link" link={ROUTES.USER_LIST} text="Список пользоватлей"/>
                                        <Button variant="navLink" className="btn nav-link" link={ROUTES.PROFILE} text="Профиль"/>
                                    </div>:
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.PROFILE} text="Профиль"/>
                                }
                                </> :
                                null
                            }
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;