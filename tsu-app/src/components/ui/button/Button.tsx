import React from "react";

import "./button.css"


interface ButtonProps extends React.ComponentProps<'button'>{
    text: string
}

const Button = 
    ({className, text, ...props} : ButtonProps) => {
    
    return (
        <>
            <button
                className={`btn ${className}`}
                type="button"
                {...props}
            >
                {text}
            </button>
        </>
    )
};

export default Button;
