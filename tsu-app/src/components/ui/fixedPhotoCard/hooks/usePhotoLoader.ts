import { getPhoto } from "../../../../utils/api/getPhoto";
import { readFile } from "../readFile";

import { PHOTO_LINK_PART } from "../../../../utils/constant";

import { useState, useEffect } from "react";

interface usePhotoLoaderParams{
    photo: string | File,
    isShown: boolean
}

const usePhotoLoader = ({ photo, isShown }: usePhotoLoaderParams) : string => {

    const token = localStorage.getItem('token');

    const [path, setPath] = useState<string>("");

    useEffect(() => {
        const getPath = async () => {
            if (isShown){
                try {
                    if (token){
                        const response = await getPhoto(token, `${PHOTO_LINK_PART}${photo}`);
                        const filePath = await readFile(response);
                        setPath(filePath);
                    }
                } 
                catch (error) {
                    console.error(error);
                }
            }
            else{
                const filePath = await readFile(photo as File);
                setPath(filePath);
            }
        }
        getPath();
    }, [photo, path]);

    return path;
};

export default usePhotoLoader