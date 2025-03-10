// import { Outlet, useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/routes";
import React, { useEffect } from "react";


const ProtectedLayout = ({ children } : {children : React.ReactNode}) => {

    // const navigate = useNavigate();

    const isAuth = localStorage.getItem('token');

    if (!isAuth && window.location.pathname !== ROUTES.AUTHORIZE){
        window.location.href = ROUTES.AUTHORIZE;
    }

    return (
        <>
            {/* {isAuth ? <Outlet/> : null} */}
            {children}
        </>
    )
};

export default ProtectedLayout;