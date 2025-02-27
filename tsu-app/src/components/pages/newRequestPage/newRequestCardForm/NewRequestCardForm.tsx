import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";
import FixedPhotoCard from "../../../ui/fixedPhotoCard/fixedPhotoCard";

import { RequestData } from "../../../../@types/api";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from "react";

const NewRequestForm = () => {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    }; 


    const [requestData, setRequestData] = useState<RequestData>({description: "", absenceDateFrom: null, absenceDateTo: null, photos: []});

    const handleChange = (field: string, value: string | File[]) => {
        setRequestData((prev) => (
            {...prev, [field]: value}
        ))
    }

    const handleClick = () => {

    }


    return (
        <>
        {/* ref={datasRef} onSubmit={handleSubmit} */}
            <form action="" className="request-form">
                <div className="request-form_container">
                    <h1 className="request-form_title">Новая заявка</h1>
                    <div className="description-block">
                        <h3 className="block-title">Описание</h3>
                        <textarea name="description" id="" className="description-input" cols={30} rows={30}></textarea>
                    </div>
                    <div className="time-block">
                        <p className="time-block_text">С</p>
                        <Input className="date-time-input" inputHandleChange={(value) => handleChange("absenceDateFrom", value)} type="datetime-local"/>
                        <p className="time-block_text">до</p>
                        <Input className="date-time-input" inputHandleChange={(value) => handleChange("absenceDateTo", value)} type="datetime-local"/>
                    </div>
                    {requestData.photos.length !== 0 ? 
                        <Slider {...settings}>
                            {requestData.photos.map((item, index) => (
                                <FixedPhotoCard photo={item} key={index}/>
                            ))}
                        </Slider> :
                        null
                    }
                    <Input className="file-input" variant="file" name="photos" inputFileHandleChange={(value) => handleChange("photos", value)}/>
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Отправить" onClick={handleClick}/>
                    </div>
                </div>
            </form>
        </>
    )
};

export default NewRequestForm;