import request from '@/utils/request'
import PROFILE_TYPE from '../action_types/profile'

const saveProfile = (data) => {
    return {
        type: PROFILE_TYPE.SAVE_USER,
        payload: data
    }
}


const getProfile = () => {
    return async dispatch => {
        const res = await request.get('/user');
        if(res) {
            dispatch(saveProfile(res.data));
        }
    }
}

export {getProfile}