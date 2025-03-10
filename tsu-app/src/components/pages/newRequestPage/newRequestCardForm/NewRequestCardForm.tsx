import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";
import FixedPhotoCard from "../../../ui/fixedPhotoCard/fixedPhotoCard";

import { createRequest } from "../../../../utils/api/createRequest";

import { RequestData } from "../../../../@types/api";

// import Slider from "react-slick";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewRequestForm = () => {

    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // }; 

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
    }

    const handleClick = async () => {
        // Пока так берем токен, потом будем брать из global state
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
                    // formData.append("files", requestData.photos);
                    await createRequest(token, formData);
                    navigate(ROUTES.MAINPAGE);
                }
            }
            catch{
                // Сейчас проведем запрос даты
                console.log("error");
            }
        }
    }

    return (
        <>
        {/* ref={datasRef} onSubmit={handleSubmit} */}
            <form action="" className="request-form">
                <div className="request-form_container">
                    <h1 className="request-form_title">Новая заявка</h1>
                    <div className="description-block">
                        <h3 className="block-title">Описание</h3>
                        <Input name="description" variant="textarea" className="description-input" inputHandleChange={(value) => handleChange("description", value)} type="text"/>
                    </div>
                    <div className="time-block">
                        <p className="time-block_text">С</p>
                        <Input variant="input" className="date-time-input" inputHandleChange={(value) => handleChange("absenceDateFrom", value)} type="datetime-local"/>
                        <p className="time-block_text">до</p>
                        <Input variant="input" className="date-time-input" inputHandleChange={(value) => handleChange("absenceDateTo", value)} type="datetime-local"/>
                    </div>
                    {/* Пока это забросим */}
                    {/* {requestData.photos.length !== 0 ? 
                        <Slider {...settings}>
                            {requestData.photos.map((item, index) => (
                                <FixedPhotoCard photo={item} key={index}/>
                            ))}
                        </Slider> :
                        null
                    } */}
                    <div className="files-block">
                        <Input className="file-input" variant="file" name="photos" inputFileHandleChange={(value) => handleChange("photos", value)}/>
                        <Button variant="button" className="btn cleaer-files" text="Очистить" onClick={clearFiles}/>
                    </div>
                    
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Отправить" onClick={handleClick}/>
                    </div>
                    {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                </div>
            </form>
        </>
    )
};

export default NewRequestForm;