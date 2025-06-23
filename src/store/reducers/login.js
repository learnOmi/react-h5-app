const initValues = {
    token: '',
    refreshToken: ''
}

export default function reducer(state = initValues, actions){
    const {type, payload} = actions;
    if(type === 'login/token'){
        return payload;
    }
    return state;
}