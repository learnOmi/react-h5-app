import { combineReducers } from 'redux'
import loginReducer from './login'
import profileReducer from './profile'
import homeReducer from './home';

const reducers = combineReducers({
    login: loginReducer,
    profile: profileReducer,
    home: homeReducer
})

export default reducers;