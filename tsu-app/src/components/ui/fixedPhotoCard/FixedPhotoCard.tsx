import "./fixedPhotoCard.css"

import { PhotoCard } from "../../../@types/api";

import { useEffect, useState } from "react";

const FixedPhotoCard = ({ photo }: PhotoCard) => {

    const [path, setPath] = useState<string | null>(null);

    useEffect(() => {
        const reader = new FileReader();

        reader.onload = () => {
            setPath(reader.result as string);
        }

        reader.readAsDataURL(photo);
    },[photo]);

    if (path) {
        return (
            <>
                <div className="photo-card">
                    <div className="photo-card_container">
                        <p className="cross">x</p>
                        <img src={path} alt="" className="photo-card_photo"/>
                    </div>
                </div>
            </>
        )
    }
    
};

export default FixedPhotoCard;