import request from '@/utils/request'
import PROFILE_TYPE from '../action_types/profile'

const saveProfile = (data) => {
    return {
        type: PROFILE_TYPE.SAVE_USER,
        payload: data
    }
}

const saveUserInfo = (data) => {
    return {
        type: PROFILE_TYPE.SAVE_USERINFO,
        payload: data
    }
}

const getProfile = () => {
    return async dispatch => {
        const res = await request.get('/user');
        if (res.data) {
            dispatch(saveProfile(res.data));
        }
    }
}

const getUserInfo = () => {
    return async dispatch => {
        const res = await request.get('/user/profile');
        if (res.data) {
            dispatch(saveUserInfo(res.data));
        }
    }
}

const updReduxUserInfo = (params) => {
    return {
        type: PROFILE_TYPE.UPD_REDUX_USERINFO,
        payload: params
    }
}

const updUserInfo = (params) => {
    return async dispatch => {
        const res = await request.patch('/user/profile', params);
        if(res.message === 'OK'){
            dispatch(updReduxUserInfo(params));
            return res;
        }
    }
}

const updUserPhoto = (params) => {
    return async dispatch => {
        const res = await request.patch('/user/photo', params);
        dispatch(getUserInfo());
        return res;
    }
}

export { getProfile, getUserInfo, updUserInfo, updUserPhoto }