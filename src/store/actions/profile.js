import request from '@/utils/request'
import PROFILE_TYPE from '../action_types/profile'
import { data } from 'react-router-dom'
import { type } from '@testing-library/user-event/dist/type'

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
        if (res) {
            dispatch(saveProfile(res.data));
        }
    }
}

const getUserInfo = () => {
    return async dispatch => {
        const res = await request.get('/user/profile');
        if (res) {
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

        dispatch(updReduxUserInfo(params))
    }
}

export { getProfile, getUserInfo, updUserInfo }