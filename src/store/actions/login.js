import request from '@/utils/request'
import { setToken } from '@/utils/storage'

const sendCode = (mobile) => {
    return async () => {
        const res = await request.get(`/sms/codes/${mobile}`)
    }
}

const saveToke = (data) => {
    return {
        type: "login/token",
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

        dispatch(saveToke(res.data));

        // 保存到本地，提供给redux作为刷新时的初始值，因为页面刷新redux中会丢失
        setToken(res.data);
    }
}

export {sendCode, login};