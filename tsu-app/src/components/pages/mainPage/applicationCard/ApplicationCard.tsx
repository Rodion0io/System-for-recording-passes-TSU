import "./applicationCard.css"
import darkTsuIcon from "../../../../assets/svgs/tsuDarkLogo.svg"

import { REQUEST_STATUS } from "../../../../utils/translationLists/requestStatusTranslation";

import Button from "../../../ui/button/Button";

const ApplicationCard = () => {
    
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
                            <p className="text">Иванов Иван Иванович, студент</p>
                        </div>
                        <div className="information-subBlcok">
                            <p className="section-title">Дата заявки:</p>
                            <p className="text">1 марта 2025аа</p>
                        </div>
                        <div className="information-subBlcok">
                            <p className="section-title">Срок пропуска:</p>
                            <p className="text">с 4 по 6 марта</p>
                        </div>
                        <div className="information-subBlcok">
                            {/* ${props.userType !== "Unverified" ? "confirmed" : "not-confirmed"}`} */}
                            <p className="section-title">Статус:</p>
                            <div className={`user-status_indicator confirmed`}></div>
                            <div className="text">Подвержден</div>
                        </div>
                    </div>
                    <div className="action-block">
                        <Button variant="button" className="btn profile-actions" text="Редактировать пароль"/>
                    </div>
                </div>
            </article>
        </>
    )
};

export default ApplicationCard;