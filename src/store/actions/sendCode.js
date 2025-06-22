import request from '@/utils/request'

const sendCode = (mobile) => {
    return async() => {
        const res = await request.get(`/sms/codes/${mobile}`)
    }
}

export {sendCode};