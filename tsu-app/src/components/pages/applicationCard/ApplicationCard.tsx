import "./applicationCard.css"
import darkTsuIcon from "../../../assets/svgs/tsuDarkLogo.svg"

import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { RequestShortModel, RequestModel } from "../../../@types/api";

import { modifyDate } from "../../../utils/modifyDate";

import Button from "../../ui/button/Button";

interface ApplicationCardProps{
    props: RequestShortModel | RequestModel,
    isFull?: boolean
}

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
                            <p className="text">{props.username}</p>
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
                    </div>
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Подробнее" id={props.id}/>
                    </div>
                    {isFull ? <h1>ssdigjnksjdgn</h1> : null}
                </div>
            </article>
        </>
    )
};

export default ApplicationCard;