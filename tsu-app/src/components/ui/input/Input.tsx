import "./input.css"

import { useInput } from "./hooks/useInput";
import { useFileInput } from "./hooks/useFileInput";

type InputVariant = "input" | "textarea" | "file";
interface InputProps extends React.ComponentProps<'input'> {
    inputMask?: string,
    variant?: InputVariant,
    name?: string,
    inputHandleChange?(value: string): void,
    inputFileHandleChange?(file: File[]): void
}

const Input = ({name, variant="input", className, inputMask, inputHandleChange, inputFileHandleChange, ...props} : InputProps) => {

    const { inputValue, handleChange } = useInput("", inputHandleChange);

    const { inputFileCurrentState, handleFileChange } = useFileInput([], inputFileHandleChange);

    return (
        <>
            {variant === "input" ? 
                <input name={name} className={`input ${className}`} value={inputValue} {...props} onChange={handleChange}/> :
                variant === "file" ?
                <input name={name} className={`input ${className}`} type="file" {...props} onChange={handleFileChange} multiple/> : 
                <textarea name={name} id="" cols={30} rows={30} onChange={handleChange} value={inputValue}></textarea>
            }
            
        </>
    )
};

export default Input;