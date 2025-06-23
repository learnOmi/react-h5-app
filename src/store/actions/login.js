import request from '@/utils/request'

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
    }
}

export {sendCode, login};