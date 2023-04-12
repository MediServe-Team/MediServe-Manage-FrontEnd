import {ActionTypes} from '../contants/action.type'

const initialState = {
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_PRODUCT:
            return {
                ...state,
                products: action.payload 
            };
        default:
            return state;
    }
}