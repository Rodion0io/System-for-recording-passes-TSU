import "./filterCard.css"

import Select from "../../../ui/select/Select";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import ModalWindow from "../../../ui/modalWindow/ModelaWindow";

import { useUserRoles } from "../../../../utils/hooks/useUserRoles";
import { exportDatasFile } from "../../../../utils/api/export";
import { useUsers } from "../../../../utils/hooks/useUsers";
import { createUrl } from "../../../../utils/createUrl";

import { SORT_TYPE_ARRAY, SORT_STATUS_ARRAY } from "../../../../utils/constant";
import { FilterModel, ExportDatas, selectedValue } from "../../../../@types/api";
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
    const [exportDatas, setExportDatas] = useState<ExportDatas>({targetUsersId: [], dateFrom: "", dateTo: ""});
    const [filters, setFilters] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});
    const [exports, setExports] = useState<selectedValue[]>([]);

    const token = localStorage.getItem('token');
    let userRoles = useUserRoles();
    const shortUserInfa = useUsers(token);
    


    const handleChange = (field: string, value: string | selectedValue[], name: string) => {
        if (typeof value === "string" && name === "filter"){
            setFilters((prevState) => (
                {...prevState, [field]: field === "dateFrom" || field === "dateTo" ? new Date(value).toISOString() : value}
            ))
        }
        else if (typeof value === "string" && name === "export"){
            setExportDatas((prevState) => (
                {...prevState, [field]: field === "dateFrom" || field === "dateTo" ? new Date(value).toISOString() : value}
            ))
        }
        else{
            setExports(value);
        }
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

    useEffect(() => {
        const usersList: string[] = exports.map((item) => item.id);
        setExportDatas((prev) => ({
            ...prev, ["targetUsersId"]: usersList
        }))
    },[exports])

    const handleExport = async () => {
        try {
            const urlPattern = createUrl(exportDatas);
            const response = await exportDatasFile(token, urlPattern);
    
            if (response.status !== 200) {
                throw new Error(`Ошибка при экспорте: ${response.status}`);
            }
    
            // 🔹 Берем бинарные данные напрямую
            const blob = response.data;
    
            // Создаем ссылку и скачиваем файл
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "exported_data.docx"; // Название файла
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
    
        } catch (error) {
            console.error("Ошибка при скачивании файла:", error);
        }
    };

    return (
        <>
            <div className="filter-card">
                <div className="filter-card_container">
                    <h2 className="film-card_title">Фильтры</h2>
                    <div className="inputs-container">
                        <div className="up-section">
                            <Select isMultiply={false} className="filter-select" valuesArr={SORT_TYPE_ARRAY} name="Сортировать по" lableClass="filter-label" 
                                typeSort="sortType" selectChange={(value) => handleChange("sortType", value, "filter")}/>
                            <Select isMultiply={false} className="filter-select" valuesArr={SORT_STATUS_ARRAY} name="Статус заявок" lableClass="filter-label" 
                                typeSort="sortStatus" selectChange={(value) => handleChange("requestStatus", value, "filter")}/>
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
                                {userRoles.includes("Teacher") || userRoles.includes("Dean") || userRoles.includes("Admin") ? 
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
                            <Select className="filter-select" valuesArr={shortUserInfa} isMultiply={true} name="Пользователи" lableClass="filter-label" 
                                typeSort="userTypes" selectChange={(value) => handleChange("sortType", value, "export")}/>
                            <div className="time-block-filter">
                                <label>Начальная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateFrom", value, 'export')}/>
                            </div>
                            <div className="time-block-filter">
                                <label>Конечная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateTo", value, 'export')}/>
                            </div>
                        </div>
                        <Button variant="button" className="btn filter-button" text="Экспортировать" onClick={handleExport}/>
                        {errorFlag ? <p className="error-message">{ERROR_MESSAGES[errorStatusCode]}</p> : null}
                    </div>
                </div>
            </ModalWindow>
        </>
    )
};

export default FilterCard;