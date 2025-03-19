import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import FixedPhotoCard from "../../../ui/fixedPhotoCard/fixedPhotoCard";

import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

import { useRequest } from "../hooks/useRequest";

const NewRequestForm = () => { 

    const { requestData, errorStatusCode, errorFlag, handleChange, handleClick, clearFiles, removeFile } = useRequest();

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
                    {requestData.photos.length !== 0 ? 
                        <div className="test-block">
                            {requestData.photos.map((item, index) => (
                                <FixedPhotoCard photo={item} id={index} key={index} isShown={false} remover={removeFile} isDeleted={true}/>
                            ))}
                        </div>:
                        null
                    }
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