import { Outlet, useNavigate } from "react-router-dom"

import { ROUTES } from "../../utils/routes";
import { useEffect } from "react";


const ProtectedLayout = () => {

    const navigate = useNavigate();

    const isAuth = localStorage.getItem('token');

    useEffect(() => {
        if (!isAuth){
            navigate(ROUTES.AUTHORIZE);
        }
    },[isAuth])

    
    return (
        <>
            {isAuth ? <Outlet/> : null}
        </>
    )
};

export default ProtectedLayout;