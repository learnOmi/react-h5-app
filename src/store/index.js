import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";
import { getToken, hasToken } from "@/utils/storage";

const store = legacy_createStore(
    rootReducer, 
    // 初始值
    {
        login: hasToken() ? getToken() : {},
    },
    composeWithDevTools(applyMiddleware(thunk)));

export default store;