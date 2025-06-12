import { combineReducers } from 'redux'

const testReducer = (state = 0, action) => {
    return state;
}

const userReducer = (state = {name:'ddd'}, action) => {
    return state;
}

const reducers = combineReducers({
    test:testReducer,
    user:userReducer
})

export default reducers;