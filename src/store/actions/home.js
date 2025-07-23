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

export const getAllChannels = ()=> {
    return async dispatch => {
        const res = await request.get('/channels');
        dispatch(saveAllChannels(res.data.channels));
    }
}

export const saveAllChannels = (data) => {
    return{
        type: HOMETYPES.SAVE_ALL_CHANNELS,
        payload: data
    }
}

export const saveChannels = (data) => {
    return {
        type: HOMETYPES.SAVE_CHANNELS,
        payload: data
    }
}

// 删除频道
export const delChannel = (channel) => {
  return async (dispatch, getState) => {
    // 如果用户登录了，需要发送请求删除频道
    // 如果用户没有登录，需要删除本地的这个频道
    // 不管有没有登录，都要修改redux的值
    const userChannels = getState().home.userChannels;
    if (hasToken()) {
      // 发送请求
      await request.delete('/user/channels/' + channel.id);
      // 同步频道的数据到redux中
      dispatch(
        saveChannels(userChannels.filter((item) => { return item.id !== channel.id }))
      );
    } else {
      // 没有登录
      // 修改本地，修改redux
      const result = userChannels.filter((item) => { return item.id !== channel.id });
      dispatch(saveChannels(result));
      setChannels(result);
    }
  }
}

// 添加频道
export const addChannel = (channel) => {
  return async (dispatch, getState) => {
    const channels = [
      ...getState().home.userChannels,
      channel
    ];
    if (hasToken()) {
      // 发送请求添加
      await request.patch('/user/channels', {
        channels: [{ id: channel.id }]
      });
      dispatch(saveChannels(channels));
    } else {
      dispatch(saveChannels(channels));
      setChannels(channels);
    }
  }
}

// 获取文章列表数据
export const getArticleList = (channelId,timestamp) => {
  return async dispatch => {
    const res = await request({
      method:'get',
      url:'/articles',
      params:{
        timestamp:timestamp,
        channel_id:channelId,
      }
    });
    dispatch(
      setArticleList({
        channelId,
        timestamp:timestamp,
        list:res.data.results,
      })
    );
  }
}

export const setArticleList = (payload) => {
  return {
    type:HOMETYPES.SAVE_ARTICLES,
    payload
  }
}