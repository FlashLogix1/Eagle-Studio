import {applyMiddleware, createStore, combineReducers, compose} from "redux"
import { logger } from 'redux-logger'
import thunk from "redux-thunk"
import {UserReducer} from "./reducers/user-reducer"
import {SettingReducer} from "./reducers/system-setiings-reducer";
import {BecomeSellerReducer} from "./reducers/become-seller-reducer";

export const ConfigureStore = () => {

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    return createStore(combineReducers({
        UserReducer,
        SettingReducer,
        BecomeSellerReducer
    }), composeEnhancers(applyMiddleware(thunk,logger)))
}