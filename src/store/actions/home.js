import request from '@/utils/request'
import HOMETYPES from '../action_types/home';
import { getChannles, hasChannels, hasToken, setChannels } from '@/utils/storage';

export const getChannelList = () => {
    return async dispatch => {
        if(hasToken()){
            const res = await request({
                url: '/user/channels',
                method: 'get'
            });
            dispatch(saveChannels(res.data.channels));
        }

        if(!hasToken() && !hasChannels()){
            const res = await request({
                url: '/user/channels',
                method: 'get'
            });
            setChannels(res.data.channels);
        }
        
        if(!hasToken() && hasChannels()){
            dispatch(saveChannels(getChannles()));
        }
    }
}

export const saveChannels = (data) => {
    return {
        type: HOMETYPES.SAVE_CHANNELS,
        payload: data
    }
}