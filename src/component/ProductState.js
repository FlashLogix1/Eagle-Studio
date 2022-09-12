import {createContext, useContext, useReducer} from "react";

const initalState = {
    product: ''
}

const productState = createContext(initalState)
const dispatchProductState = createContext(undefined)


export const ProductState = (props) => {
    return productState
}

export const useProductState = () => [
    useContext(productState),
    useContext(dispatchProductState)
]

export const ProductReducer = () => ( useReducer((state, newValue) => ({ ...state, ...newValue }), initalState))