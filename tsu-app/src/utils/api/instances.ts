import axios, { isAxiosError } from "axios";

import { URL } from "../constant";

import { ROUTES } from "../routes";

import { refreshToken } from "./refreshToken";

import { decodeToken } from "../decodeToken";

const TOKEN = localStorage.getItem('token');
const REFRESH = localStorage.getItem('refresh');


export const authorizeRequests = axios.create({
    baseURL: URL,
    headers: {"Content-Type": "application/json"},
})

export const formDataRequest = axios.create({
    baseURL: URL,
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
                const newAccess = localStorage.getItem('token');
                const newRefresh =localStorage.getItem('refresh')
                if (newAccess && newRefresh){
                    const userId = decodeToken(newAccess, "user_id")
                    try {
                        const response = await refreshToken(userId, newRefresh);
                        localStorage.setItem('token', response.accessToken);
                        localStorage.setItem('refresh', response.refreshToken);
                        error.config.headers.Authorization = `Bearer ${response.accessToken}`;
                        return authorizeRequests(error.config)
                    } 
                    catch (error) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        window.location.href = ROUTES.MAINPAGE;
                    }
                }
            }
        }
        return Promise.reject(error);
    }
)

authorizeRequests.interceptors.response.use(
    (result) => {
        return result;
    },
    async (error) => {
        if (isAxiosError(error)){
            if (error.response?.status === 401){
                const newAccess = localStorage.getItem('token');
                const newRefresh =localStorage.getItem('refresh')
                if (newAccess && newRefresh){
                    const userId = decodeToken(newAccess, "user_id")
                    try {
                        const response = await refreshToken(userId, newRefresh);
                        localStorage.setItem('token', response.accessToken);
                        localStorage.setItem('refresh', response.refreshToken);
                        error.config.headers.Authorization = `Bearer ${response.accessToken}`;
                        return authorizeRequests(error.config)
                    } 
                    catch (error) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('refresh');
                        window.location.href = ROUTES.MAINPAGE;
                    }
                }
            }
        }
        return Promise.reject(error);
    }
)