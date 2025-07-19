import HOMETYPES from "../action_types/home";

const initProps = {
    userChannels: [],
}

export default function homeReducer(state = initProps, action){
    switch (action.type) {
        case HOMETYPES.SAVE_CHANNELS:
            return{
                ...state,
                userChannels: action.payload
            }
        default:
            return state;
    }
}