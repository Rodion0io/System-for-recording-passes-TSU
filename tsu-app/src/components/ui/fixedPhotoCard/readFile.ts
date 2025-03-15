export const readFile = (blob: Blob) : Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            resolve(event.target?.result as string);
        }

        reader.readAsDataURL(blob);
    })
};