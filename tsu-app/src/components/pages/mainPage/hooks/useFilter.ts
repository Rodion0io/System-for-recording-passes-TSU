import { useEffect, useState } from "react";

import { FilterModel, selectedValue } from "../../../../@types/api";

export const useFilter = (changeStateFilters: ((value: FilterModel) => void) | undefined) => {

    const [filters, setFilters] = useState<FilterModel>({sortType: "", requestStatus: "", dateFrom: "", dateTo: "", userName: ""});

    useEffect(() => {
        if (changeStateFilters){
            changeStateFilters(filters);
        }
    },[filters]);

    const handleChangeFilter = (field: string, value: string | selectedValue[], name: string) => {
        if (typeof value === "string" && name === "filter"){
            setFilters((prevState) => (
                {...prevState, [field]: field === "dateFrom" || field === "dateTo" ? new Date(value).toISOString() : value}
            ))
        }
    }

    return { handleChangeFilter};
}