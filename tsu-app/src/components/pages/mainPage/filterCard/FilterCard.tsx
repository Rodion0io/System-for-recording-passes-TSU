import "./filterCard.css"

import Select from "../../../ui/select/Select";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";

import { decodeToken } from "../../../../utils/decodeToken";

import { SORT_TYPE_ARRAY, SORT_STATUS_ARRAY } from "../../../../utils/constant";
import { FilterModel } from "../../../../@types/api";

import { useEffect, useState } from "react";

interface FilterCardProps{
    changeStateFilters?(value: FilterModel): void;
    addFilter?(): void;
}


const FilterCard = ({ changeStateFilters, addFilter }: FilterCardProps) => {

    //Пока отсюда берем токен, потом будем получать из global state
    const token = localStorage.getItem('token');
    let userRole;
    if (token){
        userRole = decodeToken(token, "role");
    }

    
    
    const [filters, setFilters] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});

    const handleChange = (field: string, value: string) => {
        setFilters((prevState) => (
            {...prevState, [field]: field === "dateFrom" || field === "dateTo" ? new Date(value).toISOString() : value}
        ))
    }

    useEffect(() => {
        if (changeStateFilters){
            changeStateFilters(filters);
        }
    },[filters]);

    const handleClick = () => {
        
        if (addFilter){
            addFilter();
        }
    }

    return (
        <>
            <div className="filter-card">
                <div className="filter-card_container">
                    <h2 className="film-card_title">Фильтры</h2>
                    <div className="inputs-container">
                        <div className="up-section">
                            <Select className="filter-select" valuesArr={SORT_TYPE_ARRAY} name="Сортировать по" lableClass="filter-label" 
                                typeSort="sortType" selectChange={(value) => handleChange("sortType", value)}/>
                            <Select className="filter-select" valuesArr={SORT_STATUS_ARRAY} name="Статус заявок" lableClass="filter-label" 
                                typeSort="sortStatus" selectChange={(value) => handleChange("requestStatus", value)}/>
                            <div className="time-block-filter">
                                <label>Дата начала</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateFrom", value)}/>
                            </div>
                        </div>
                        <div className="bottom-section">
                            <div className="inputs-block">
                                <div className="time-block-filter">
                                    <label>Дата окончания</label>
                                    <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateTo", value)}/>
                                </div>
                                {userRole === "Dean" || userRole === "Admin" ? 
                                    <Input className="filter-user-name" placeholder="Имя пользователя" type="text" inputHandleChange={(value) => handleChange("userName", value)}/> : 
                                    null
                                }
                            </div>
                            <Button variant="button" className="btn filter-button" text="Подтвердить" onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default FilterCard;