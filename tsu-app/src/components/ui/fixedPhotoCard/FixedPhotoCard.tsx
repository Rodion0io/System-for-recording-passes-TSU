import "./fixedPhotoCard.css"

import { PhotoCard } from "../../../@types/api";

import usePhotoLoader from "./hooks/usePhotoLoader";

import ModalWindow from "../modalWindow/ModelaWindow";

import { useState } from "react";

const FixedPhotoCard = ({ photo, id, remover, isShown, isDeleted }: PhotoCard) => {

    const [modalActive, setModalActive] = useState<boolean>(false);

    console.log(photo);

    const path = usePhotoLoader({photo, isShown});

    if (path) {
        return (
            <>
                <div className="photo-card">
                    <div className="photo-card_container">
                        {isDeleted? 
                            <p className="cross" onClick={() => remover(id)}>x</p>:
                            null
                        }                        
                        <img src={path} alt="" className="photo-card_photo" onClick={() => setModalActive(true)}/>
                    </div>
                </div>
                <ModalWindow active={modalActive} setActive={setModalActive}>
                    <div className="modal-card-container">
                        <img className="photo-block" src={path} alt="Фото" />
                    </div>
                </ModalWindow>
            </>
        )
    }
    
};

export default FixedPhotoCard;