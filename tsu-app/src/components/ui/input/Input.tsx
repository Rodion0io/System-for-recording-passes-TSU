import "./input.css"

import { useInput } from "./hooks/useInput";
import { useFileInput } from "./hooks/useFileInput";

type InputVariant = "input" | "textarea" | "file";
interface InputProps extends React.ComponentProps<'input'> {
    inputMask?: string,
    variant?: InputVariant,
    inputHandleChange?(value: string): void,
    inputFileHandleChange?(file: File[]): void
}

const Input = ({variant="input", className, inputMask, inputHandleChange, inputFileHandleChange, ...props} : InputProps) => {

    const { inputValue, handleChange } = useInput("", inputHandleChange);

    const { inputFileCurrentState, handleFileChange } = useFileInput([], inputFileHandleChange);

    return (
        <>
            {variant === "input" ? 
                <input className={`input ${className}`} value={inputValue} {...props} onChange={handleChange}/> :
                <input className={`input ${className}`} type="file" {...props} onChange={handleFileChange} multiple/>
            }
            
        </>
    )
};

export default Input;