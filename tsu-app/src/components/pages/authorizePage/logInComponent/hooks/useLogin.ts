import { useState } from "react";
import { useDispatch } from "react-redux";

import { LogInDatas } from "../../../../../@types/api";
import { EMAIL_PATTERN } from "../../../../../utils/constant";
import { authorize } from "../../../../../utils/api/authorize";
import { logIn } from "../../../../../utils/store/slices/userSlice";
import { ROUTES } from "../../../../../utils/routes";

export const useLogin = () => {
    const dispatch = useDispatch();

    const [LogInDatas, setLogInDatas] = useState<LogInDatas>({email: "", password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    
    const handleChange = (inputName: string, value: string) => {
        setLogInDatas((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };

    const handleClick = async () => {

        if (LogInDatas.email.length === 0 || LogInDatas.password.length === 0){
            setErrorStatusCode(1);
            setErrorFlag(true);
        }
        else if (!EMAIL_PATTERN.test(LogInDatas.email)){
            setErrorStatusCode(3);
            setErrorFlag(true);
        }
        else if (EMAIL_PATTERN.test(LogInDatas.email) && LogInDatas.password.length !== 0){
            try{
                setErrorFlag(false);
                setErrorStatusCode(0);
                const response = await authorize(LogInDatas);
    
                localStorage.setItem("token", response.accessToken);
                localStorage.setItem('refresh', response.refreshToken);
                
                dispatch(logIn(response.accessToken));

                window.location.href = ROUTES.MAINPAGE
            }
            catch {
                setErrorStatusCode(2);
                setErrorFlag(true);
            }
        }
    };

    return { errorFlag, errorStatusCode, handleChange, handleClick};
}