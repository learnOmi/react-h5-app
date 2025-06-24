import axios from 'axios';
import { Toast } from "antd-mobile";
import { getToken, hasToken } from './storage';

const service = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (hasToken()) {
            const { expire } = getToken();
            if (expire && expire < Date.now()) {
                Toast.show({
                    content: 'Token invalid',
                    icon: 'fail',
                    duration: 1000
                });
                throw new Error('Token expired');
            } else {
                config.headers.Authorization = `Bearer ${getToken()}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        Toast.show({
            content: response.data.message,
            icon: 'success',
            duration: 1000
        });
        return response.data;
    },
    error => {
        const mes = error?.response?.data?.message;
        const status = error?.response?.status;
        if (status && status === 401) {
            Toast.show({
                content: mes,
                icon: 'fail',
                duration: 1000
            });
        } else if (mes) {
            Toast.show({
                content: mes,
                icon: 'fail',
                duration: 1000
            });
        } else if (axios.isAxiosError(error)) {
            Toast.show({
                content: error.message,
                icon: 'fail',
                duration: 1000
            });
        }
        return Promise.reject(new Error(error.message))
    }
)

export default service;