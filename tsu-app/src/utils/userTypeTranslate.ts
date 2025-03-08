import { USER_TYPE } from "./translationLists/userTypeTranslation"

export const userTypeTranslate = (userRoles: string[]): string[] => {
    let result = userRoles.map(item => (
        item = USER_TYPE[item]
    ));

    return result;
};