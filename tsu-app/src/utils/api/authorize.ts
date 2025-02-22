export const authorize = async () => {
    const header = {
        "Content-Type": "application/json"
    };

    const response = await fetch("jsdonsdjgf", {
        method: "POST",
        headers: header
    });

    if (response.ok){
        return response;
    }
    else{
        throw Error("Произошла ошибка авторизации!");
    }
}