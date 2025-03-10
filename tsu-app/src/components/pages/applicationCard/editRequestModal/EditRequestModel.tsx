import "./editRequestModal.css"

import ModalWindow from "../../../ui/modalWindow/ModelaWindow"

import { RequestEditModel } from "../../../../@types/api";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

import { editRequest } from "../../../../utils/api/editRequest";


import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";


import { Dispatch, SetStateAction, useState } from "react";

import { useNavigate } from "react-router";

interface EditRequestModelProps{
    props: RequestEditModel,
    id: string,
    isFull: boolean,
    modalActive: boolean,
    setModalActive: Dispatch<SetStateAction<boolean>>
}

const EditRequestModel = ({ props, id, isFull, modalActive, setModalActive }: EditRequestModelProps) => {

    const navigate = useNavigate();

    
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);

    const editObj: RequestEditModel = (isFull ? 
        {status: props.status, description: props.description,
            absenceDateFrom: props.absenceDateFrom,
             absenceDateTo: props.absenceDateTo} : 
             {status: "", description: "",
        absenceDateFrom: "",
         absenceDateTo: ""}
        );

    const [editDatas, setEditDatas] = useState<RequestEditModel>(editObj);

    const handleCahnge = (field: string, value: string) => {
        setEditDatas((prevState) => (
            {...prevState, [field]: value}
        ))
    };


    const handleCancellation = () => {
        setErrorFlag(false);
        setModalActive(false);
        setErrorStatusCode(0);
        setEditDatas((prevState) => ({...prevState, ...editObj}))
    }

    const handleEditData = async () => {
        if (props.description.length === 0){
            setErrorFlag(true)
            setErrorStatusCode(7);
        }
        else if (Date.now() <= props.absenceDateFrom){
            setErrorFlag(true)
            setErrorStatusCode(9)
        }
        else if ((props.absenceDateFrom) > (props.absenceDateTo)){
            setErrorFlag(true)
            setErrorStatusCode(10)
        }
        else{
            setErrorFlag(false)
            setErrorStatusCode(0);

            const token = localStorage.getItem('token');
            const userId: string = id;

            try{
                if (token){
                    await editRequest(editDatas, token, userId);
                    setModalActive(false);
                    navigate("/");
                }
            }
            catch{
                console.log("error");
            }
        }
    }

    return (
        <>
            <ModalWindow active={modalActive} setActive={setModalActive}>
                <div className="modal-card-container">
                    <div className="edit-container">
                        <h2 className="title">Редактирование профиля</h2>
                        <p className="description-title">Опсиание</p>
                        <Input name="description" variant="textarea" className="description-input" type="text" inputHandleChange={(value) => handleCahnge("description", value)}
                            value={props.description} initialValue={props.description}/>
                        <div className="time-block">
                            <p className="time-block_text">С</p>
                            <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleCahnge("absenceDateFrom", value)}
                                initialValue={new Date(props.absenceDateFrom).toISOString().slice(0,-8)}/>
                            <p className="time-block_text">до</p>
                            <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleCahnge("absenceDateTo", value)}
                                initialValue={new Date(props.absenceDateTo).toISOString().slice(0,-8)}/>
                        </div>
                        <div className="action-block">
                            <Button variant="button" className="btn profile-actions" text="Подтвердить" onClick={handleEditData}/>
                            <Button variant="button" className="btn cancellation" text="Отменить" onClick={handleCancellation}/>
                        </div>
                        {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                    </div>
                </div>
            </ModalWindow>
        </>
    )
};

export default EditRequestModel;