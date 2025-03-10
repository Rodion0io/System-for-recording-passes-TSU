import "./filterCard.css"

import Select from "../../../ui/select/Select";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import ModalWindow from "../../../ui/modalWindow/ModelaWindow";

import { decodeToken } from "../../../../utils/decodeToken";
import { useUserRoles } from "../../../../utils/hooks/useUserRoles";
import { exportDatas } from "../../../../utils/api/export";
import { useUsers } from "../../../../utils/hooks/useUsers";

import { SORT_TYPE_ARRAY, SORT_STATUS_ARRAY } from "../../../../utils/constant";
import { FilterModel, ExportDatas, ExportUserInforamtion } from "../../../../@types/api";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

import { useEffect, useState } from "react";


interface FilterCardProps{
    changeStateFilters?(value: FilterModel): void;
    addFilter?(): void;
}


const FilterCard = ({ changeStateFilters, addFilter }: FilterCardProps) => {

    const [exportModal, setExportModal] = useState<boolean>(false);
    const [errorFlag, setErrorFlag] = useState<boolean>(false);
    const [errorStatusCode, setErrorStatusCode] = useState<number>(0);
    const [exportDatas, setExportDatas] = useState<ExportDatas>({userId: [], dateFrom: "", dateTo: ""});
    const [filters, setFilters] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});

    const token = localStorage.getItem('token');
    let userRoles = useUserRoles();


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

    const handleExport = () => {
        if (exportDatas.dateFrom >= exportDatas.dateTo){
            setErrorFlag(true);
            setErrorStatusCode(8);
        }
        else if (exportDatas.userId.length === 0){
            setErrorFlag(true);
            setErrorStatusCode(24);
        }
        else{
            try {
                console.log('test');
            } catch (error) {
                console.error("Ошибка")
            }
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
                                {userRoles.includes("Dean") || userRoles.includes("Admin") ? 
                                    <>
                                        <Input className="filter-user-name" placeholder="Имя пользователя" type="text" inputHandleChange={(value) => handleChange("userName", value)}/>
                                        <Button variant="button" className="btn filter-button" text="экспортировать" onClick={() => setExportModal(true)}/>
                                    </> : 
                                    null
                                }
                            </div>
                            <Button variant="button" className="btn filter-button" text="Подтвердить" onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
            <ModalWindow active={exportModal} setActive={setExportModal}>
                <div className="modal-card-container">
                    <div className="edit-container">
                        <h2 className="title">Экспорт данных</h2>
                        <div className="params-container">
                            <Select className="filter-select" valuesArr={SORT_TYPE_ARRAY} name="Пользователи" lableClass="filter-label" 
                                typeSort="sortType" selectChange={(value) => handleChange("sortType", value)}/>
                            <div className="time-block-filter">
                                <label>Начальная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateFrom", value)}/>
                            </div>
                            <div className="time-block-filter">
                                <label>Конечная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateFrom", value)}/>
                            </div>
                        </div>
                        {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                    </div>
                </div>
            </ModalWindow>
        </>
    )
};

export default FilterCard;