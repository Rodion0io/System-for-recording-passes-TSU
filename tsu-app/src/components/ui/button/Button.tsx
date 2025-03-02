import React from "react";

import "./button.css"

import { Link } from "react-router-dom";

type ButtonVariant = 'button' | 'link'
interface ButtonProps extends React.ComponentProps<'button'>{
    text: string,
    variant?: ButtonVariant,
    link?: string,
    linkState?: string
}

const Button = 
    ({linkState, variant = 'button', className, text, link, ...props} : ButtonProps) => {
    
    return (
        <>
            {variant === "button" ? 
                <button
                    className={`btn ${className}`}
                    type="button"
                    {...props}
                >
                    {text}
                </button>
                : 
                <Link state={linkState} className={`link ${className}`} to={link} {...props}>{text}</Link>
            }
        </>
    )
};

export default Button;
