import { useEffect, useState } from "react";

import { UserModel } from "../../@types/api"
import { getProfile } from "../api/getProfile";

export const useUserInformation = (): UserModel => {
    const [userInformation, setUserInformation] = useState<UserModel>({id: "", firstName: "", middleName: "", lastName: "", email: "", userTypes: []});

    useEffect(() => {
        const getProfileDatas = async () => {
            const response = await getProfile();
            setUserInformation((prev) => ({...prev, ...response}));
        }
        getProfileDatas();
    }, []);

    return userInformation
}