import "./applicationCard.css"
import darkTsuIcon from "../../../assets/svgs/tsuDarkLogo.svg"

import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { RequestShortModel, RequestModel, RequestEditModel } from "../../../@types/api";

import { modifyDate } from "../../../utils/modifyDate";

import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";
import ModalWindow from "../../ui/modalWindow/ModelaWindow";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useState } from "react";

interface ApplicationCardPropsShortModel{
    props: RequestShortModel,
    isFull: false
};

interface ApplicationCardPropsModel{
    props: RequestModel,
    isFull: true
}

type ApplicationCardProps = ApplicationCardPropsShortModel | ApplicationCardPropsModel;

const ApplicationCard = ({ props, isFull }: ApplicationCardProps) => {

    const [modalActive, setModalActive] = useState(false);
    
    const editObj: RequestEditModel = (isFull ? 
        {status: props.status, description: props.description,
            absenceDateFrom: props.absenceDateFrom,
             absenceDateTo: props.absenceDateTo} : 
             {status: "", description: "",
        absenceDateFrom: "",
         absenceDateTo: ""}
        );

    let [editDatas, setEditDatas] = useState<RequestEditModel>(editObj);


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }; 

    console.log(editDatas.description);

    return (
        <>
            <article className="application-card">
                <div className="aplication-card_container">
                    <div className="header-card">
                        <img src={darkTsuIcon} alt="" className="application-card_logo" />
                        <h2 className="header-card_title">Заявка на пропуск</h2>
                    </div>
                    <div className="information-block">
                        <div className="information-subBlcok">
                            <p className="section-title">Автор:</p>
                            {!isFull ? 
                                <p className="text">{props.username}</p> :
                                <p className="text">{`${props.firstName} ${props.middleName} ${props.lastName}`}</p>
                            }
                            
                        </div>
                        <div className="information-subBlcok">
                            <p className="section-title">Дата заявки:</p>
                            <p className="text">{modifyDate(props.createTime, null, true)}</p>
                        </div>
                        <div className="information-subBlcok">
                            <p className="section-title">Срок пропуска:</p>
                            <p className="text">{modifyDate(props.absenceDateFrom, props.absenceDateTo)}</p>
                        </div>
                        <div className="information-subBlcok">
                            <p className="section-title">Статус:</p>
                            <div className={`user-status_indicator ${props.status === "Checking" ? "checking" 
                            : props.status === "Confirmed" ? "confirmed" 
                            : "not-confirmed"}`}></div>
                            <div className="text">{REQUEST_STATUS[props.status]}</div>
                        </div>
                        {isFull ? 
                            <>
                                {props.checkerUsername ? 
                                    <div className="information-subBlcok">
                                        <p className="section-title">Вынес вердикт:</p>
                                        <p className="text">{props.checkerUsername}</p>
                                    </div> : null
                                }
                                <div className="description-container">
                                    <p className="description">
                                        {props.description}
                                    </p>
                                </div>
                                {props.images.length !== 0 ? 
                                    <div className="images-container">
                                        <p className="section-title">Файлы:</p>
                                        <Slider {...settings}>
                                            {/* Пока не пофиксил */}
                                        </Slider>
                                    </div>:
                                    null
                                }
                                {
                                    props.status === "Checking" ? 
                                    <div className="action-block">
                                        <Button variant="button" className="btn profile-actions" text="Редактировать" onClick={() => setModalActive(true)}/>
                                        <Input className="file-input" variant="file" name="photos" />
                                        {/* inputFileHandleChange={(value) => handleChange("photos", value)} */}
                                    </div>:
                                    null
                                }
                                <ModalWindow active={modalActive} setActive={setModalActive}>
                                    <div className="modal-card-container">
                                        <div className="edit-container">
                                            <h2 className="title">Редактирование профиля</h2>
                                            <p className="description-title">Опсиание</p>
                                            <Input name="description" variant="textarea" className="description-input" type="text" value={editDatas.description} initialValue={editDatas.description}/>
                                            <div className="time-block">
                                                <p className="time-block_text">С</p>
                                                <Input variant="input" className="date-time-input" type="datetime-local" initialValue={new Date(editDatas.absenceDateFrom).toISOString().slice(0,-8)}/>
                                                <p className="time-block_text">до</p>
                                                <Input variant="input" className="date-time-input" type="datetime-local" initialValue={new Date(editDatas.absenceDateTo).toISOString().slice(0,-8)}/>
                                            </div>
                                            <div className="action-block">
                                                <Button linkState={props.id} variant="link" link={`/request/${props.id}`} className="btn profile-actions" text="Подтвердить" id={props.id}/>
                                                <Button linkState={props.id} variant="link" link={`/request/${props.id}`} className="btn cancellation" text="Отменить" id={props.id}/>
                                            </div>
                                        </div>
                                    </div>
                                </ModalWindow>
                            </>
                            :null
                        }
                    </div>
                    {!isFull ?
                        <div className="action-block">
                            <Button linkState={props.id} variant="link" link={`/request/${props.id}`} className="btn profile-actions" text="Подробнее" id={props.id}/>
                        </div> :
                        null
                    }
                </div>
            </article>
        </>
    )
};

export default ApplicationCard;