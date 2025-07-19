import request from '@/utils/request'
import HOMETYPES from '../action_types/home';

export const getChannelList = () => {
    return async dispatch => {
        const res = await request({
            url: '/user/channels',
            method: 'get'
        });
        
        dispatch(saveChannels(res.data.channels));
    }
}

export const saveChannels = (data) => {
    return {
        type: HOMETYPES.SAVE_CHANNELS,
        payload: data
    }
}