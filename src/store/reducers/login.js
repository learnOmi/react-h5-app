import LOGIN_TYPE from "../action_types/login";

const initValues = {
    token: '',
    refreshToken: ''
}

export default function reducer(state = initValues, actions){
    const {type, payload} = actions;
    if(type === LOGIN_TYPE.LOGIN_TOKEN){
        return payload;
    }
    return state;
}