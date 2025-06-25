import PROFILE_TYPE from "../action_types/profile";

const initValues = {
    user:{}
};

export default function reducer(state = initValues, actions){
    const{ type, payload } = actions;
    if(type === PROFILE_TYPE.SAVE_USER){
        return {
            ...state,
            user:payload
        }
    }
    return state;
}