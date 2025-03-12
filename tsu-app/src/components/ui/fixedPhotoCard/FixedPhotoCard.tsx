import "./fixedPhotoCard.css"

import { PhotoCard } from "../../../@types/api";

import ModalWindow from "../modalWindow/ModelaWindow";

import { useEffect, useState } from "react";

const FixedPhotoCard = ({ photo, id, remover }: PhotoCard) => {

    const [path, setPath] = useState<string | null>(null);
    const [modalActive, setModalActive] = useState<boolean>(false);

    useEffect(() => {

        if (path){
            return
        }
        else{
            const reader = new FileReader();

            reader.onload = (event) => {
                setPath(event.target?.result as string);
            }

            reader.readAsDataURL(photo);
        }
    },[path]);

    if (path) {
        return (
            <>
                <div className="photo-card">
                    <div className="photo-card_container">
                        <p className="cross" onClick={() => remover(id)}>x</p>
                        <img src={path} alt="" className="photo-card_photo" onClick={() => setModalActive(true)}/>
                    </div>
                </div>
                <ModalWindow active={modalActive} setActive={setModalActive}>
                    <div className="modal-card-container">
                        <img className="photo-block" src={path} alt="" />
                    </div>
                </ModalWindow>
            </>
        )
    }
    
};

export default FixedPhotoCard;