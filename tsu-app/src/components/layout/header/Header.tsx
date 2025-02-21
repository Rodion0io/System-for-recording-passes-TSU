import "./header.css"

import tsuLogo from "../../../assets/svgs/tsuLightLogo.svg"

const Header = () => {
    
    return (
        <>
            <header className="hero">
                <div className="container">
                    <div className="nav-container">
                        <img src={tsuLogo} alt="" className="hero-logo" />
                        <nav className="navbar"></nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;