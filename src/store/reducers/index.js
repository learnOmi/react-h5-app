import { combineReducers } from 'redux'
import loginReducer from './login'
import profileReducer from './profile'

const reducers = combineReducers({
    login: loginReducer,
    profile: profileReducer
})

export default reducers;