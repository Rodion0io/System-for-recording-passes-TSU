import "./applicationCard.css"
import darkTsuIcon from "../../../assets/svgs/tsuDarkLogo.svg"

import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { RequestShortModel, RequestModel } from "../../../@types/api";

import EditRequestModel from "./editRequestModal/EditRequestModel";

import { modifyDate } from "../../../utils/modifyDate";

import Button from "../../ui/button/Button";
import Input from "../../ui/input/Input";

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useState } from "react";


interface ApplicationCardPropsShortModel{
    props: RequestShortModel,
    isFull: false,
    userRoles: string[],
};

interface ApplicationCardPropsModel{
    props: RequestModel,
    isFull: true,
    userRoles: string[],
}

type ApplicationCardProps = ApplicationCardPropsShortModel | ApplicationCardPropsModel;

const ApplicationCard = ({ props, isFull, userRoles }: ApplicationCardProps) => {

    const [modalActive, setModalActive] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }; 

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
                                        {userRoles.includes("Dean") || userRoles.includes("Admin") ? 
                                            <>
                                                <Button variant="button" className="btn profile-actions" text="Принять" onClick={() => setModalActive(true)}/>
                                                <Button variant="button" className="btn cancellation" text="Отклонить" onClick={() => setModalActive(true)}/>
                                            </>:
                                            <Button variant="button" className="btn profile-actions" text="Редактировать" onClick={() => setModalActive(true)}/>
                                        }
                                        
                                        <Input className="file-input" variant="file" name="photos" />
                                        {/* inputFileHandleChange={(value) => handleChange("photos", value)} */}
                                    </div>:
                                    null
                                }
                                
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
                    {modalActive ?
                        <EditRequestModel 
                            props={props}
                            id={props.id}
                            isFull={isFull}
                            modalActive={modalActive}
                            setModalActive={setModalActive}
                        />: null
                    }
                </div>
            </article>
        </>
    )
};

export default ApplicationCard;