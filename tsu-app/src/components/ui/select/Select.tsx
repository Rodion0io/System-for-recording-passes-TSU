import "./select.css"

import { SORT_TYPE_TRANSLATION } from "../../../utils/translationLists/sortTypeTranslation";
import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";
import { USER_TYPE } from "../../../utils/translationLists/userTypeTranslation";
import { selectedValue } from "../../../@types/api";

import React, { useState } from "react";

interface SelectProps extends React.ComponentProps<'select'>{
    valuesArr: string[],
    lableClass: string,
    typeSort: string,
    selectChange?(value: string): void,
    isObj?: boolean
}

const Select = ({ className, valuesArr, name, lableClass, typeSort, isObj, selectChange, ...props } : SelectProps) => {

    const [selected, setSelected] = useState("");

    const handleChooseValue = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected(value);

        if (selectChange){
            selectChange(value);
        }
    }

    return (
        <>
            <div className="select-block">
                <label className={`label ${lableClass}`} htmlFor={name}>{name}</label>
                <select className={`select ${className}`} name={name} id="" {...props} value={selected} onChange={handleChooseValue}>
                    {valuesArr.map((item, index) => (
                        <option 
                            value={item}
                            key={index}
                        >{
                            typeSort === "sortType" ?
                             SORT_TYPE_TRANSLATION[item] :
                                typeSort === "rolesType" ?
                                USER_TYPE[item] :
                                    REQUEST_STATUS[item]
                        }</option>
                    ))}
                </select>
            </div>
        </>
    )
};

export default Select;