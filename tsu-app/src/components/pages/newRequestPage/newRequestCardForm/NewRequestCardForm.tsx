import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";

import { createRequest } from "../../../../utils/api/createREquest";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewRequestForm = () => {


    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6
      };

    const [photosArray, setPhotosArray] = useState<File[]>([]);


    const datasRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();
    //ВОзможно из глобального стэйта возьмем потом
    const token = localStorage.getItem('token');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (datasRef.current){
            const formDatas = new FormData(datasRef.current);

            console.log(formDatas.getAll('photos'));

            console.log(typeof(formDatas.getAll('photos')));

            setPhotosArray((prev) => ([...prev, ...formDatas.getAll('photos') as File[]]))

            const absenceDateFrom = formDatas.get("absenceDateFrom") as string;
            const absenceDateTo = formDatas.get("absenceDateTo") as string;

            if (absenceDateFrom) {
                formDatas.set("absenceDateFrom", new Date(absenceDateFrom).toISOString());
            }

            if (absenceDateTo) {
                formDatas.set("absenceDateTo", new Date(absenceDateTo).toISOString());
            }

            try{
            
                if (token !== null) {

                    await createRequest(token, formDatas);
    
                    navigate(ROUTES.MAINPAGE);
                }
            }
            catch{
                //Временно
                console.log("Ошибка")
            }
        }
        else{
            return;
        }
    }
    

    return (
        <>
            <form action="" className="request-form" ref={datasRef} onSubmit={handleSubmit}>
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
                    {photosArray ? 
                        <Slider {...settings}>
                            <div>
                                <h3>1</h3>
                            </div>
                            <div>
                                <h3>2</h3>
                            </div>
                            <div>
                                <h3>3</h3>
                            </div>
                            <div>
                                <h3>4</h3>
                            </div>
                            <div>
                                <h3>5</h3>
                            </div>
                            <div>
                                <h3>6</h3>
                            </div>
                        </Slider> :
                        null
                    }
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