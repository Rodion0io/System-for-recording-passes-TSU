import "./input.css"

interface InputProps extends React.ComponentProps<'input'> {
    inputMask?: string
}

const Input = ({className, inputMask, ...props} : InputProps) => {
    return (
        <>
            
            <input className={`input ${className}`} {...props}/>
        </>
    )
};

export default Input;