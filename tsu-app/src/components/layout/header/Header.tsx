import "./header.css"

import tsuLogo from "../../../assets/svgs/tsuLightLogo.svg"

import Button from "../../ui/button/Button"
import { ROUTES } from "../../../utils/routes"

import { useUserRoles } from "../../../utils/hooks/useUserRoles"

import { useSelector } from "react-redux"

import { RootType } from "../../../utils/store/store"

const Header = () => {

    const selector = useSelector((state: RootType) => state.userr.token);

    const userRoles = useUserRoles();
    
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="nav-container">
                        <img src={tsuLogo} alt="" className="hero-logo" />
                        <nav className="navbar">
                            {selector ? 
                                <>
                                <div className="left-part">
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.MAINPAGE} text="Главная"/>
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.NEW_REQUEST} text="Новая заявка"/>
                                </div>
                                <div className="right-part">
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.USER_LIST} text="Список пользоватлей"/>
                                    <Button variant="navLink" className="btn nav-link" link={ROUTES.PROFILE} text="Профиль"/>
                                </div></> :
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