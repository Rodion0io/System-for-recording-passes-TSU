import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";
import FixedPhotoCard from "../../../ui/fixedPhotoCard/fixedPhotoCard";

import { createRequest } from "../../../../utils/api/createREquest";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewRequestForm = () => {


    const [requestData, setRequestData] = useState([]);

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
    };

    // const [photosArray, setPhotosArray] = useState<File[]>([]);


    // const datasRef = useRef<HTMLFormElement | null>(null);
    // const navigate = useNavigate();
    // //ВОзможно из глобального стэйта возьмем потом
    // const token = localStorage.getItem('token');

    // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    
    //     if (datasRef.current) {
    //         const formDatas = new FormData(datasRef.current);
            
    //         const newPhotos = formDatas.getAll('photos') as File[];
    
    //         setPhotosArray([...newPhotos]); // Перезаписываем, а не дополняем массив
    
    //         const absenceDateFrom = formDatas.get("absenceDateFrom") as string;
    //         const absenceDateTo = formDatas.get("absenceDateTo") as string;
    
    //         if (absenceDateFrom) {
    //             formDatas.set("absenceDateFrom", new Date(absenceDateFrom).toISOString());
    //         }
    
    //         if (absenceDateTo) {
    //             formDatas.set("absenceDateTo", new Date(absenceDateTo).toISOString());
    //         }
    
    //         try {
    //             if (token !== null) {
    //                 await createRequest(token, formDatas);
    //                 navigate(ROUTES.MAINPAGE);
    //             }
    //         } catch {
    //             console.log("Ошибка");
    //         }
    //     }
    // };
    
    

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
                        <Input className="date-time-input" type="datetime-local" name="absenceDateFrom"/>
                        <p className="time-block_text">до</p>
                        <Input className="date-time-input" type="datetime-local" name="absenceDateTo"/>
                    </div>
                    {/* {photosArray.length > 0 ? 
                        <Slider {...settings}>
                            {photosArray.map((item, index) => (
                                <FixedPhotoCard photo={item} key={index}/>)
                            )}
                        </Slider>
                        :
                        null
                    } */}
                    <Input className="file-input" type="file" multiple={true} name="photos"/>
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Отправить" type="submit"/>
                    </div>
                </div>
            </form>
        </>
    )
};

export default NewRequestForm;