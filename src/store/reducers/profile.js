import PROFILE_TYPE from "../action_types/profile";

const initValues = {
    user:{}
};

export default function reducer(state = initValues, actions){
    const{ type, payload } = actions;
    if(type === PROFILE_TYPE.SAVE_USER){
        return {
            ...state,
            user: payload
        }
    }

    if(type === PROFILE_TYPE.SAVE_USERINFO){
        return{
            ...state,
            profile: payload
        }
    }

    if(type === PROFILE_TYPE.UPD_REDUX_USERINFO){
        const { profile:curProfile } = state;
        return{
            ...state,
            profile:{
                ...curProfile,
                ...payload
            }
        }
 
    }

    return state;
}