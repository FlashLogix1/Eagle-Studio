
const initialState = {
    settings: [],
    errMess: null,
    isLoading: false,
}

export const SettingReducer = (state = initialState, action) => {
    switch (action.type){
        default:
            return {...state}
        case 'SETTING_LOADING':
            return {...state, isLoading: true}
        case 'SETTING_SUCCESS':
            return {...state, settings: action.payload, isLoading: false}
        case 'SETTING_FAILED':
            return {...state, errMess: action.payload, isLoading: false}
    }
}
