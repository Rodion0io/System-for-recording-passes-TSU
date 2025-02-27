import { useState } from "react";

export const useFileInput = (initialState:File[] = [], handleInputFileChange?: (file: File[]) => void) => {

    const [inputFileCurrentState, setInputFileCurrentState] = useState<File[]>(initialState);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = event.target.files;


        if (newFile) {
            const modifyFileList: File[] = [...newFile];
            setInputFileCurrentState((prev) => [...prev, ...modifyFileList]);
        
            if (handleInputFileChange) {
                handleInputFileChange([...inputFileCurrentState, ...modifyFileList]);
            }
        }
    }

    return {inputFileCurrentState, handleFileChange};
}