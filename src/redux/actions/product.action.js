import {ActionTypes} from '../contants/action.type'

export const setProduct = (products) => {
     return {
        type: ActionTypes.SET_PRODUCT,
        payload: products
     };
}

export const selectedProduct = (product) => {
    return {
        type: ActionTypes.SELECTED_PRODUCT,
        payload: product
    }
}



// Một action return về type của action => để khi dispatch action đến reducer, 
// reducer sẽ kiểm tra type của action để thực hiện action => UPDATE state tương ứng