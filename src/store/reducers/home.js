import HOMETYPES from "../action_types/home";

const initProps = {
    userChannels: [],
    allChannels: [],
    articles: {}
}

export default function homeReducer(state = initProps, action) {
    switch (action.type) {
        case HOMETYPES.SAVE_CHANNELS:
            return {
                ...state,
                userChannels: action.payload
            }
        case HOMETYPES.SAVE_ALL_CHANNELS:
            return {
                ...state,
                allChannels: action.payload
            }
        case HOMETYPES.SAVE_ARTICLES:
            const { list, timestamp, channelId, loadMore } = action.payload;
            return {
                ...state,
                articles: {
                    ...state.articles,
                    [channelId]: {
                        timestamp: timestamp,
                        list: loadMore ? [...state.articles[channelId].list, ...list] : list
                    }
                }
            }
        default:
            return state;
    }
}