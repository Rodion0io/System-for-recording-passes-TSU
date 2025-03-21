import { useState } from "react";
import { UserRegisterModel } from "../../../../../@types/api";
import { useDispatch } from "react-redux";
import { EMAIL_PATTERN, VALID_PASSWORD, VALID_PERSONAL_DATAS } from "../../../../../utils/constant";
import { registration } from "../../../../../utils/api/registration";
import { logIn } from "../../../../../utils/store/slices/userSlice";
import { ROUTES } from "../../../../../utils/routes";

export const useRegistration = () => {
    
    const [newUser, setNewUser] = useState<UserRegisterModel>({firstName: "", middleName: "", lastName: "", email: "", password: ""});
    const [errorFlag, setErrorFlag] = useState(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);

    const dispatch = useDispatch();

    const handleChange = (inputName: string, value: string) => {
        setNewUser((prevItem) => (
            {...prevItem,
            [inputName]: value}
        ))
    };


    const handleClick = async () => {
        if (newUser.firstName.length === 0){
            setErrorStatusCode(11);
            setErrorFlag(true)
        }
        else if (newUser.lastName.length === 0){
            setErrorStatusCode(12);
            setErrorFlag(true)
        }
        else if (newUser.email.length === 0){
            setErrorStatusCode(13);
            setErrorFlag(true)
        }
        else if (newUser.password.length < 8){
            setErrorStatusCode(14);
            setErrorFlag(true)
        }
        else if (!VALID_PERSONAL_DATAS.test(newUser.firstName)){
            setErrorStatusCode(15);
            setErrorFlag(true)
        }
        else if (!EMAIL_PATTERN.test(newUser.email)){
            setErrorStatusCode(3);
            setErrorFlag(true)
        }
        else if (!VALID_PASSWORD.test(newUser.password)){
            setErrorStatusCode(16);
            setErrorFlag(true)
        }
        else{
            try{
                setErrorStatusCode(0);
                setErrorFlag(false);
                const response = (await registration(newUser))

                localStorage.setItem("token", response.accessToken);
                localStorage.setItem("refresh", response.refreshToken);
                dispatch(logIn(response.accessToken));
                window.location.href = ROUTES.MAINPAGE
            }
            catch (error){
                console.error(error);
            }
        }
    }

    return { errorFlag, errorStatusCode, handleChange, handleClick};
    
}