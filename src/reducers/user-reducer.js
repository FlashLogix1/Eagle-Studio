import {readLS} from "../shared/LS";

const initialState = {
    data: [],
    message: null,
    errMess: null,
    isLoading: false,
    LoggedIn: !!readLS('    findMeToken'),
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type){
        default: return state
        case 'USER_LOADING':
            return {...state, isLoading: true, message: null, errMess: null}
        case 'USER_SUCCESS_SIGNUP':
            return {...state, message: action.payload, errMess: null, LoggedIn: false, isLoading: false}
        case 'USER_SUCCESS':
            return {...state, message: action.payload, errMess: null, LoggedIn: true, isLoading: false}
        case 'USER_FAILED':
            return {...state, errMess: action.payload, message: null, isLoading: false}
        case 'USER_LOGOUT':
            return {...state, errMess: null, message: action.payload, isLoading: false, LoggedIn: false}
        case 'USER_LOGGED_IN':
            return {...state, errMess: null, message: action.payload, isLoading: false, LoggedIn: true}
    }
}
