export const decodeToken = (jwt: string, query: string) => {
    let tokenParts = jwt.split(".");
    let result = JSON.parse(atob(tokenParts[1]));

    return result[query];
}