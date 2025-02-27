import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";

import { createRequest } from "../../../../utils/api/createREquest";

import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NewRequestForm = () => {

    const datasRef = useRef<HTMLFormElement | null>(null);
    const navigate = useNavigate();
    //ВОзможно из глобального стэйта возьмем потомт
    const token = localStorage.getItem('token');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (datasRef.current){
            const formDatas = new FormData(datasRef.current);

            console.log(typeof(formDatas.get("absenceDateFrom")));

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
    
                    navigate('/');
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