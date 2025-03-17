import "./select.css"

import { SORT_TYPE_TRANSLATION } from "../../../utils/translationLists/sortTypeTranslation";
import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { selectedValue } from "../../../@types/api";

import React, { useEffect, useState } from "react";
import { USER_TYPE } from "../../../utils/translationLists/userTypeTranslation";


interface SelectProps extends React.ComponentProps<'select'>{
    valuesArr: string[] | selectedValue[],
    lableClass: string,
    typeSort: string,
    selectChange?(value: string | selectedValue[]): void,
    isMultiply?: boolean
}

const Select = ({ className, valuesArr, name, lableClass, isMultiply, typeSort, selectChange, ...props } : SelectProps) => {

    const [selected, setSelected] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<selectedValue[]>([]);

    const handleChooseValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (!isMultiply){
            const value = event.target.value;
            setSelected(value);

            if (selectChange){
                selectChange(value);
            }
        }
        else{
            const value: selectedValue[] = Array.from(event.target.selectedOptions).map(option => ({
                value: option.value,
                id: option.getAttribute('id')
            }));
            setSelectedOptions(value);

            if (selectChange){
                selectChange(value);
            }
        }
    }

    return (
        <>
            <div className="select-block">
                <label className={`label ${lableClass}`} htmlFor={name}>{name}</label>
                <select className={`select ${className}`} name={name} multiple={isMultiply ? true : undefined} {...props} 
                    value={isMultiply ? selectedOptions.map(option => option.value) : selected} onChange={handleChooseValue}>

                    {/* {valuesArr.map((item, index) => (
                        <option value={typeof item === "string" ? item : item.value} key={index}>{
                            typeSort === "sortType" ?
                             SORT_TYPE_TRANSLATION[typeof item === "string" ? item : item.value] :
                                typeSort === "rolesType" ?
                                USER_TYPE[typeof item === "string" ? item : item.value] :
                                    REQUEST_STATUS[typeof item === "string" ? item : item.value]
                        }</option>
                    ))} */}
                    {valuesArr.map((item, index) => (
                        <option value={typeof item === "string" ? item : item.value} 
                            id={typeof item !== "string" ? item.id : undefined} key={index}>{
                            typeSort === "sortType" 
                                ? SORT_TYPE_TRANSLATION[typeof item === "string" ? item : item.value]
                                : typeSort === "userTypes" ?  typeof item === "string" ? item : item.value :
                                typeSort === "rolesType" ?
                                USER_TYPE[typeof item === "string" ? item : item.value] :
                                REQUEST_STATUS[typeof item === "string" ? item : item.value]
                        }</option>
                    ))}
                </select>
            </div>
        </>
    )
};

export default Select;