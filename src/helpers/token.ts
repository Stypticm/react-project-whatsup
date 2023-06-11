import { AUTH_TOKEN } from './constants';

export const getToken = () => {
    const data = localStorage.getItem(AUTH_TOKEN);
    return JSON.parse(data as string);
}

export const setToken = (token: string) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
    }
}

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
}