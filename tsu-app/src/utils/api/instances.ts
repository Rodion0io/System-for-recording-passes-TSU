import axios, { isAxiosError } from "axios";

import { URL } from "../constant";

import { ROUTES } from "../routes";

import { refreshToken } from "./refreshToken";

import { decodeToken } from "../decodeToken";

const TOKEN = localStorage.getItem('token');
const REFRESH = localStorage.getItem('refresh');

export const authorizeRequests = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`},
})

export const formDataRequest = axios.create({
    baseURL: URL,
    headers: {"Authorization": `Bearer ${TOKEN}`},
})

export const notAuthorizedRequest = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    }
});

authorizeRequests.interceptors.response.use(
    (result) => {
        return result;
    },
    async (error) => {
        if (isAxiosError(error)){
            if (error.response?.status === 401){
                if (TOKEN && REFRESH){
                    const userId = decodeToken(TOKEN, "user_id")
                    try {
                        const response = await refreshToken(userId, REFRESH);
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        localStorage.setItem('token', response.accessToken);
                        localStorage.setItem('refresh', response.refreshToken);
                    } 
                    catch (error) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        window.location.href = ROUTES.MAINPAGE;
                    }
                }
            }
        }
    }
)

formDataRequest.interceptors.response.use(
    (result) => {
        return result;
    },
    async (error) => {
        if (isAxiosError(error)){
            if (error.response?.status === 401){
                if (TOKEN && REFRESH){
                    const userId = decodeToken(TOKEN, "user_id")
                    try {
                        const response = await refreshToken(userId, REFRESH);
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        localStorage.setItem('token', response.accessToken);
                        localStorage.setItem('refresh', response.refreshToken);
                    } 
                    catch (error) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        window.location.href = ROUTES.MAINPAGE;
                    }
                }
            }
        }
    }
)