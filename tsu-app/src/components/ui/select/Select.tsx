import "./select.css"

import { SORT_TYPE_TRANSLATION } from "../../../utils/translationLists/sortTypeTranslation";
import { REQUEST_STATUS } from "../../../utils/translationLists/requestStatusTranslation";

interface SelectProps extends React.ComponentProps<'select'>{
    valuesArr: string[],
    lableClass: string,
    typeSort: string
}

const Select = ({ className, valuesArr, name, lableClass, typeSort, ...props } : SelectProps) => {

    return (
        <>
            <div className="select-block">
                <label className={`label ${lableClass}`} htmlFor={name}>{name}</label>
                <select className={`select ${className}`} name={name} id="" {...props}>
                    {valuesArr.map((item, index) => (
                        <option value="item" key={index}>{
                            typeSort === "sortType" ? SORT_TYPE_TRANSLATION[item] : REQUEST_STATUS[item]
                        }</option>
                    ))}
                </select>
            </div>
        </>
    )
};

export default Select;