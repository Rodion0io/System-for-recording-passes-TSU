export const decodeToken = (jwt: string, query: string) => {
    let tokenParts = jwt.split(".");
    console.log(tokenParts);
    let result = JSON.parse(atob(tokenParts[1]));

    console.log(result);

    return result[query];
}