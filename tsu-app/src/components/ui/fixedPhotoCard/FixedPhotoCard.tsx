import "./fixedPhotoCard.css"

import { PhotoCard } from "../../../@types/api";

interface PhotoCardProps{
    props: PhotoCard
}

const FixedPhotoCard = ({ props }: PhotoCardProps) => {
    return (
        <>
            <div className="photo-card">
                <div className="photo-card_container">
                    <p className="cross">x</p>
                    {/* <img src={props.photo} alt="" /> */}
                </div>
            </div>
        </>
    )
};

export default FixedPhotoCard;