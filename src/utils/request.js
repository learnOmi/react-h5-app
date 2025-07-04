import axios from 'axios';
import { Toast } from "antd-mobile";
import { getToken, hasToken } from './storage';
import { history } from './history';

const service = axios.create({
    baseURL: 'http://geek.itheima.net/v1_0',
    timeout: 5000
});

/*
    使用闭包就能够简单的解决严格模式前后两次history.push导致传递state和预期不符的问题
 */
// // 显式固化状态
// function createNavigationTask(to, state) {
//   // 固化状态
//   const fixedState = {...state};
  
//   return () => {
//     // 使用固化状态
//     history.push(to, fixedState);
//   };
// }

// const redirectFunc =  createNavigationTask('/login', {from :history.location.pathname});

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
                config.headers.Authorization = `Bearer ${getToken().token}`;
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
        return response.data;
    },
    error => {
        const { refresh_token } = getToken();
        const mes = error?.response?.data?.message;
        const status = error?.response?.status;
        if (status && status === 401 && refresh_token) {
            Toast.show({
                content: mes,
                icon: 'fail',
                duration: 1000
            });
        } else if(status && status === 401 && !refresh_token){
            Toast.show({
                content: mes,
                icon: 'fail',
                duration: 1000
            });
            
            //redirectFunc();
            history.push('/login',{
                from: history.location.pathname
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
        return Promise.reject(error)
    }
)

export default service;