import "./editRequestModal.css"

import ModalWindow from "../../../ui/modalWindow/ModelaWindow"
import FixedPhotoCard from "../../../ui/fixedPhotoCard/fixedPhotoCard";

import { RequestEditModel } from "../../../../@types/api";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";
import { editRequest } from "../../../../utils/api/editRequest";

import Button from "../../../ui/button/Button";
import Input from "../../../ui/input/Input";

import { Dispatch, SetStateAction, useState } from "react";


interface EditRequestModelProps{
    props: RequestEditModel,
    id: string,
    isFull: boolean,
    modalActive: boolean,
    setModalActive: Dispatch<SetStateAction<boolean>>
}

const EditRequestModel = ({ props, id, isFull, modalActive, setModalActive }: EditRequestModelProps) => {
    
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);

    const editObj: RequestEditModel = (isFull ? 
        {status: props.status, images: props.images, description: props.description,
            absenceDateFrom: props.absenceDateFrom,
             absenceDateTo: props.absenceDateTo,
            newImages: props.newImages} : 
             {status: "", images: [], description: "",
        absenceDateFrom: "",
         absenceDateTo: "",
        newImages: []}
        );

    const [editDatas, setEditDatas] = useState<RequestEditModel>(editObj);

    // Выдал гпт
    const handleChange = (field: string, value: string | File[] | string[]) => {
        setEditDatas((prev) => {
            const isValueArray = Array.isArray(value);
    
            return {
                ...prev,
                [field]: field === "images" && isValueArray ?
                    [...(prev.images ?? []), ...value] :
                    field === "newImages" && isValueArray ?
                        [...(prev.newImages ?? []), ...value] :
                        value
            };
        });
    };

    const removeImages = (id: number) => {
        setEditDatas((prev) => (
                {...prev, ["images"]: prev['images']?.filter((item, index) => index !== id)}
        ))
    }

    const removeNewImages = (id: number) => {
        setEditDatas((prev) => (
            {...prev, ["newImages"]: prev['newImages']?.filter((item, index) => index !== id)}
        ))
    }


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
                    const formData = new FormData();
                    formData.append("absenceDateFrom", editDatas.absenceDateFrom);
                    formData.append("absenceDateTo", editDatas.absenceDateTo);
                    formData.append("description", editDatas.description);
                    if(editDatas.status !== "Checking" && editDatas.status){
                        formData.append("status", editDatas.status)
                    }

                    editDatas.images?.map((item) => (
                        formData.append("images", item)
                    ));

                    editDatas.newImages?.map((item) => (
                        formData.append("newImages", item)
                    ));

                    await editRequest(formData, token, userId);
                    setModalActive(false);
                    window.location.href = "/";
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
                        <Input name="description" variant="textarea" className="description-input" type="text" inputHandleChange={(value) => handleChange("description", value)}
                            value={props.description} initialValue={props.description}/>
                        <div className="time-block">
                            <p className="time-block_text">С</p>
                            <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("absenceDateFrom", value)}
                                initialValue={new Date(props.absenceDateFrom).toISOString().slice(0,-8)}/>
                            <p className="time-block_text">до</p>
                            <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("absenceDateTo", value)}
                                initialValue={new Date(props.absenceDateTo).toISOString().slice(0,-8)}/>
                        </div>
                        <Input className="file-input" variant="file" name="photos" inputFileHandleChange={(value) => handleChange("newImages", value)}/>
                        {editDatas.images?.length !== 0 || editDatas.newImages?.length !== 0 ?
                            <div className="images-container">
                                <p className="section-title">Файлы:</p>
                                <div className="test-block">
                                    {editDatas.images?.map((item, index) => (
                                        <FixedPhotoCard photo={item} id={index} key={index} remover={removeImages} isShown={true} isDeleted={true}/>
                                    ))}
                                    {editDatas.newImages?.map((item, index) => (
                                        <FixedPhotoCard photo={item} id={index} key={index} remover={removeNewImages} isShown={false} isDeleted={true}/>
                                    ))}
                                </div>
                            </div>:
                            null
                        }
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