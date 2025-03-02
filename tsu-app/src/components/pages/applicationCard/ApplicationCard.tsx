import "./applicationCard.css"
import darkTsuIcon from "../../../assets/svgs/tsuDarkLogo.svg"

import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { RequestShortModel, RequestModel } from "../../../@types/api";

import { modifyDate } from "../../../utils/modifyDate";

import Button from "../../ui/button/Button";

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
                                    </div>:
                                    null
                                }
                                {
                                    props.status === "Checking" ? 
                                    <div className="action-block">
                                        <Button linkState={props.id} variant="link" link={`/request/${props.id}`} className="btn profile-actions" text="Редактировать" id={props.id}/>
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
                </div>
            </article>
        </>
    )
};

export default ApplicationCard;