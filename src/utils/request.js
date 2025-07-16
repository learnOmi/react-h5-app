import axios from 'axios';
import { Toast } from "antd-mobile";
import { getToken, hasToken, setToken } from './storage';
import { history } from './history';
import store from '@/store';
import { logout, saveToke } from '@/store/actions/login';

const baseURL = 'http://geek.itheima.net/v1_0';

const service = axios.create({
    baseURL: baseURL,
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
    async error => {
        const { refresh_token } = getToken();
        const { response, config } = error;
        const mes = response?.data?.message;
        const status = response?.status;
        if (status && status === 401 && refresh_token) {
            try {
                // 重新获取token
                const res = await axios.post({
                    method: 'put',
                    url: baseURL + '/authorizations',
                    headers: {
                        Authorization: `Bearer ${refresh_token}`
                    }
                });
                
                const tokenInfo = {
                    token: res.data.data.token,
                    refresh_token: refresh_token
                };
                // redux外存储token到redux
                store.dispatch(saveToke(tokenInfo));
                // 存储token到本地
                setToken(tokenInfo);

                // 重新发送请求
                return service(config);
                
            } catch (error) {
                Toast.show({
                    content: mes,
                    icon: 'fail',
                    duration: 1000
                });

                store.dispatch(logout());
                history.push('/login', {
                    from: history.location.pathname
                });
                
                return Promise.reject(error);
            }
            
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