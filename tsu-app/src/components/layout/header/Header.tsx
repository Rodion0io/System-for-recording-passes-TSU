import "./header.css"

import tsuLogo from "../../../assets/svgs/tsuLightLogo.svg"

import Button from "../../ui/button/Button"
import { ROUTES } from "../../../utils/routes"

import { useEffect, useState } from "react"

// import { useSelector } from "react-redux"

// import { RootType } from "../../../utils/store/store"

const Header = () => {

    // const isLogin = useSelector((state:RootType) => state.userr.logIn);
    const token = localStorage.getItem("token");
    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        setFlag(token ? true: false);
    },[token])
    
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="nav-container">
                        <img src={tsuLogo} alt="" className="hero-logo" />
                        <nav className="navbar">
                            {flag ? 
                                <>
                                <div className="left-part">
                                    <Button variant="link" className="btn nav-link" link={ROUTES.MAINPAGE} text="Главная"/>
                                    <Button variant="link" className="btn nav-link" link={ROUTES.NEW_REQUEST} text="Новая заявка"/>
                                </div>
                                <Button variant="link" className="btn nav-link" link={ROUTES.PROFILE} text="Профиль"/></> :
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