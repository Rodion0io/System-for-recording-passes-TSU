import "./filterCard.css"

import Select from "../../../ui/select/Select";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { decodeToken } from "../../../../utils/decodeToken";

import { SORT_TYPE_ARRAY, SORT_STATUS_ARRAY } from "../../../../utils/constant";


const FilterCard = () => {

    //Пока отсюда берем токен, потом будем получать из global state
    const token = localStorage.getItem('token');
    let userRole;
    if (token){
        userRole = decodeToken(token, "role");
    }
     

    return (
        <>
            <div className="filter-card">
                <div className="filter-card_container">
                    <h2 className="film-card_title">Фильтры</h2>
                    <div className="inputs-container">
                        <div className="up-section">
                            <Select className="filter-select" valuesArr={SORT_TYPE_ARRAY} name="Сортировать по" lableClass="filter-label" typeSort="sortType"/>
                            <Select className="filter-select" valuesArr={SORT_STATUS_ARRAY} name="Статус заявок" lableClass="filter-label" typeSort="sortStatus"/>
                            <div className="time-block">
                                <label>Дата начала</label>
                                <Input variant="input" className="date-time-input" type="datetime-local"/>
                            </div>
                        </div>
                        <div className="bottom-section">
                            <div className="inputs-block">
                                <div className="time-block">
                                    <label>Дата окончания</label>
                                    <Input variant="input" className="date-time-input" type="datetime-local"/>
                                </div>
                                {userRole === "Dean" || userRole === "Admin" ? 
                                    <Input className="filter-user-name" placeholder="Имя пользователя" type="text"/> : 
                                    null
                                }
                            </div>
                            <Button variant="button" className="btn filter-button" text="Подтвердить"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FilterCard;