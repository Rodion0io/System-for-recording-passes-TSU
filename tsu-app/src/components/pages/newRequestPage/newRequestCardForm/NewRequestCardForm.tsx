import "./newRequestCardForm.css"

import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import { ROUTES } from "../../../../utils/routes";

const NewRequestForm = () => {

    return (
        <>
            <form action="" className="request-form">
                <div className="request-form_container">
                    <h1 className="request-form_title">Новая заявка</h1>
                    <div className="description-block">
                        <h3 className="block-title">Описание</h3>
                        <textarea name="" id="" className="description-input" cols={30} rows={30}></textarea>
                    </div>
                    <div className="time-block">
                        <p className="time-block_text">С</p>
                        <Input className="date-time-input" type="datetime-local"/>
                        <p className="time-block_text">до</p>
                        <Input className="date-time-input" type="datetime-local"/>
                    </div>
                    <Input className="file-input" type="file"/>
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Отправить"/>
                    </div>
                </div>
            </form>
        </>
    )
};

export default NewRequestForm;