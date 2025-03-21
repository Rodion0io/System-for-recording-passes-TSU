import "./filterCard.css"

import Select from "../../../ui/select/Select";
import Input from "../../../ui/input/Input";
import Button from "../../../ui/button/Button";
import ModalWindow from "../../../ui/modalWindow/ModelaWindow";

import { useUserRoles } from "../../../../utils/hooks/useUserRoles";
import { useUsers } from "../../../../utils/hooks/useUsers";
import { useFilter } from "../hooks/useFilter";
import { useExport } from "../hooks/useExport";
import { useModal } from "../../../../utils/hooks/useModal";

import { SORT_TYPE_ARRAY, SORT_STATUS_ARRAY } from "../../../../utils/constant";
import { FilterModel } from "../../../../@types/api";
import { ERROR_MESSAGES } from "../../../../utils/errorMessages";

interface FilterCardProps{
    changeStateFilters?(value: FilterModel): void;
    addFilter?(): void;
}

const FilterCard = ({ changeStateFilters, addFilter }: FilterCardProps) => {

    const { errorFlag, errorStatusCode, handleExportChange, handleExport } = useExport();
    const { handleChangeFilter} = useFilter(changeStateFilters);
    const { stateModal, openModal, closeModal } = useModal();
    const userRoles = useUserRoles();
    const shortUserInfa = useUsers();
    
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
                            <Select isMultiply={false} className="filter-select" valuesArr={SORT_TYPE_ARRAY} name="Сортировать по" lableClass="filter-label" 
                                typeSort="sortType" selectChange={(value) => handleChangeFilter("sortType", value, "filter")}/>
                            <Select isMultiply={false} className="filter-select" valuesArr={SORT_STATUS_ARRAY} name="Статус заявок" lableClass="filter-label" 
                                typeSort="sortStatus" selectChange={(value) => handleChangeFilter("requestStatus", value, "filter")}/>
                            <div className="time-block-filter">
                                <label>Дата начала</label>
<<<<<<< HEAD
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateFrom", value, "filter")}/>
=======
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChangeFilter("dateFrom", value, 'filter')}/>
>>>>>>> refactor
                            </div>
                        </div>
                        <div className="bottom-section">
                            <div className="inputs-block">
                                <div className="time-block-filter">
                                    <label>Дата окончания</label>
<<<<<<< HEAD
                                    <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChange("dateTo", value, "filter")}/>
                                </div>
                                {userRoles.includes("Teacher") || userRoles.includes("Dean") || userRoles.includes("Admin") ? 
                                    <>
                                        <Input className="filter-user-name" placeholder="Имя пользователя" type="text" inputHandleChange={(value) => handleChange("userName", value, "filter")}/>
                                        <Button variant="button" className="btn filter-button" text="экспортировать" onClick={() => setExportModal(true)}/>
=======
                                    <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleChangeFilter("dateTo", value, 'filter')}/>
                                </div>
                                {userRoles.includes("Teacher") || userRoles.includes("Dean") || userRoles.includes("Admin") ? 
                                    <>
                                        <Input className="filter-user-name" placeholder="Имя пользователя" type="text" inputHandleChange={(value) => handleChangeFilter("userName", value, 'filter')}/>
                                        <Button variant="button" className="btn filter-button" text="экспортировать" onClick={openModal}/>
>>>>>>> refactor
                                    </> : 
                                    null
                                }
                            </div>
                            <Button variant="button" className="btn filter-button" text="Подтвердить" onClick={handleClick}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <ModalWindow active={stateModal} setActive={closeModal}>
                <div className="modal-card-container">
                    <div className="edit-container">
                        <h2 className="title">Экспорт данных</h2>
                        <div className="params-container">
                            <Select className="filter-select" valuesArr={shortUserInfa} isMultiply={true} name="Пользователи" lableClass="filter-label" 
                                typeSort="userTypes" selectChange={(value) => handleExportChange("sortType", value, "export")}/>
                            <div className="time-block-filter">
                                <label>Начальная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleExportChange("dateFrom", value, 'export')}/>
                            </div>
                            <div className="time-block-filter">
                                <label>Конечная дата</label>
                                <Input variant="input" className="date-time-input" type="datetime-local" inputHandleChange={(value) => handleExportChange("dateTo", value, 'export')}/>
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