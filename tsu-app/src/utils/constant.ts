export const URL = "http://localhost:5693/api/";

export const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const VALID_PERSONAL_DATAS = /[A-Za-zа-яА-ЯёЁ]/;
export const VALID_PASSWORD = /^(?=.*\d)[A-Za-z\d\W]+$/;

export const BEARER_TOKEN_PART = "Bearer";
export const ACCOUNT_CONFIRMED_TEXT = "Аккаунт подтвержден";
export const ACCOUNT_NOT_CONFIRMED_TEXT = "Аккаунт не подтвержден";

export const MONTHS = ["янв","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек"];
export const SORT_TYPE_ARRAY = ["", "NameAsc", "NameDesc", "CreateAsc", "CreateDesc"];
export const SORT_STATUS_ARRAY = ["", "Checking", "Confirmed", "Rejected"];
export const USERS_ROLES = ["", "Student", "Teacher", "Dean", "Admin"];