import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { RequestData } from "../../../../@types/api";
import { ROUTES } from "../../../../utils/routes";

import { createRequest } from "../../../../utils/api/createRequest";

export const useRequest = () => {
    const navigate = useNavigate();

    const [requestData, setRequestData] = useState<RequestData>({description: "", absenceDateFrom: null, absenceDateTo: null, photos: []});
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);

    const handleChange = (field: string, value: string | File[]) => {
        setRequestData((prev) => (
            {...prev, [field]: Array.isArray(value) ? [...prev.photos, ...value] : value}
        ))
    }

    const clearFiles = () => {
        setRequestData((prev) => (
            {...prev, ["photos"]: []}
        ))
    };

    const removeFile = (id: number) => {
        setRequestData((prev) => (
            {...prev, ["photos"]: prev['photos'].filter((item, index) => index !== id)}
        ))
    }

    

    const handleClick = async () => {
        const token = localStorage.getItem("token");

        if (requestData.description.length === 0){
            setErrorFlag(true)
            setErrorStatusCode(7);
        }
        else if (Date.now() <= requestData.absenceDateFrom){
            setErrorFlag(true)
            setErrorStatusCode(9)
        }
        else if ((requestData.absenceDateFrom) > (requestData.absenceDateTo)){
            setErrorFlag(true)
            setErrorStatusCode(10)
        }
        else{
            setErrorFlag(false)
            setErrorStatusCode(0);

            try{
                if (token){
                    const formData = new FormData();
                    formData.append("absenceDateFrom", requestData.absenceDateFrom);
                    formData.append("absenceDateTo", requestData.absenceDateTo);
                    formData.append("description", requestData.description);
                    requestData.photos.forEach((file) => {
                        formData.append("files", file);
                    });
                    await createRequest(token, formData);
                    navigate(ROUTES.MAINPAGE);
                }
            }
            catch (error){
                console.error(error);
            }
        }
    }
    return { requestData, errorStatusCode, errorFlag, handleChange, handleClick, clearFiles, removeFile };
}