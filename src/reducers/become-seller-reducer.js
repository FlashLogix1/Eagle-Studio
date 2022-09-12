
const initialState = {
    becomeSeller: false,
    errMess: null,
    isLoading: false,
}

export const BecomeSellerReducer = (state = initialState, action) => {
    switch (action.type){
        default:
            return {...state}
        case 'BECOME_SELLER_LOADING':
            return {...state, isLoading: true}
        case 'BECOME_SELLER_SUCCESS':
            return {...state, becomeSeller: action.payload, isLoading: false}
        case 'BECOME_SELLER_FAILED':
            return {...state, errMess: action.payload, isLoading: false}
    }
}
