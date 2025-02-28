import "./fixedPhotoCard.css"

import { PhotoCard } from "../../../@types/api";

import { useEffect, useState } from "react";

const FixedPhotoCard = ({ photo }: PhotoCard) => {

    // console.log(photo);

    const [path, setPath] = useState<string | null>(null);

    useEffect(() => {
        // console.log("new photo");

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
                        <p className="cross">x</p>
                        <img src={path} alt="" className="photo-card_photo"/>
                    </div>
                </div>
            </>
        )
    }
    
};

export default FixedPhotoCard;