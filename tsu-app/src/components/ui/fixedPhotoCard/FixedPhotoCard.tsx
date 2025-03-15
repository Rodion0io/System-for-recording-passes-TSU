import "./fixedPhotoCard.css"

import { PHOTO_LINK_PART } from "../../../utils/constant";

import { PhotoCard } from "../../../@types/api";

import { getPhoto } from "../../../utils/api/getPhoto";
import { readFile } from "./readFile";

import ModalWindow from "../modalWindow/ModelaWindow";

import { useEffect, useState } from "react";

const FixedPhotoCard = ({ photo, id, remover, isShown }: PhotoCard) => {

    const token = localStorage.getItem("token");

    const [path, setPath] = useState<string>("");
    const [modalActive, setModalActive] = useState<boolean>(false);

    useEffect(() => {
        const getPath = async () => {
            if (isShown){
                try {
                    if (token){
                        const response = await getPhoto(token, `${PHOTO_LINK_PART}${photo}`);
                        const filePath = await readFile(response);
                        setPath(filePath);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            else{
                const filePath = await readFile(photo as File);
                setPath(filePath);
            }
        }
        getPath();
    },[photo, path]);


    if (path) {
        return (
            <>
                <div className="photo-card">
                    <div className="photo-card_container">
                        {isShown? 
                            <p className="cross" onClick={() => remover(id)}>x</p>:
                            null
                        }                        
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