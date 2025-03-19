import { ROUTES } from "../../utils/routes";

import React from "react";


const ProtectedLayout = ({ children } : {children : React.ReactNode}) => {

    const isAuth = localStorage.getItem('token');

    if (!isAuth && window.location.pathname !== ROUTES.AUTHORIZE){
        window.location.href = ROUTES.AUTHORIZE;
    }

    return (
        <>
            {children}
        </>
    )
};

export default ProtectedLayout;