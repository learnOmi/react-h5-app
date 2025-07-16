import request from '@/utils/request'
import { removeToken, setToken } from '@/utils/storage'
import LOGIN_TYPE from '../action_types/login'

const sendCode = (mobile) => {
    return async () => {
        const res = await request.get(`/sms/codes/${mobile}`)
    }
}

const saveToke = (data) => {
    return {
        type: LOGIN_TYPE.LOGIN_TOKEN,
        payload: data
    }
}

const login = (params) => {
    return async (dispatch) =>{
        const res = await request({
            url: '/authorizations',
            method: 'post',
            data: params
        });

        // 保存到redux中，是为了响应式
        dispatch(saveToke(res.data));

        // 保存到本地，提供给redux作为刷新时的初始值，因为页面刷新redux中会丢失
        setToken(res.data);
    }
}

const removeReduxToken = () => {
    return {
        type : LOGIN_TYPE.LOGOUT
    }
}

const logout = () => {
    return async ( dispatch ) => {
        removeToken();
        dispatch(removeReduxToken());
    }
}

export {sendCode, login, logout, saveToke};