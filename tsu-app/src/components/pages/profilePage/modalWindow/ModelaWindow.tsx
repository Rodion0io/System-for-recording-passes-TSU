import React from "react";
import "./modalWindow.css"

interface ModalWindowProps{
    active: boolean,
    setActive:(flag: boolean) => void,
    children: React.ReactNode
}

const ModalWindow = ({active, setActive, children}: ModalWindowProps) => {
    
    return (
        <>
            <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>{children}</div>
            </div>
        </>
    )
};

export default ModalWindow;