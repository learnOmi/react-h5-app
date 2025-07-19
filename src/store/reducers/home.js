import HOMETYPES from "../action_types/home";

const initProps = {
    userChannels: [],
    allChannels: []
}

export default function homeReducer(state = initProps, action){
    switch (action.type) {
        case HOMETYPES.SAVE_CHANNELS:
            return{
                ...state,
                userChannels: action.payload
            }
        case HOMETYPES.SAVE_ALL_CHANNELS:
            return {
                ...state,
                allChannels: action.payload
            }

        default:
            return state;
    }
}