import { useState } from "react"

export const useInput = (initialState: string, handleInputChange?: (value: string) => void) => {

    const [inputValue, setInputValue] = useState(initialState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        setInputValue(newValue);

        if (handleInputChange){
            handleInputChange(newValue);
        }
    };

    return {inputValue, handleChange};
}