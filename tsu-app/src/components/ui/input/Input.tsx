import "./input.css"

import { useInput } from "./hooks/useInput";

interface InputProps extends React.ComponentProps<'input'> {
    inputMask?: string,
    inputHandleChange?(value: string): void
}

const Input = ({className, inputMask, inputHandleChange, ...props} : InputProps) => {

    const { value, handleChange } = useInput("", inputHandleChange);

    return (
        <>
            
            <input className={`input ${className}`} value={value} {...props} onChange={handleChange}/>
        </>
    )
};

export default Input;