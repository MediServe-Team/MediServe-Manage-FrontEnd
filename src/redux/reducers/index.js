import {combineReducers} from 'redux'
import {productReducer} from './product.reducer'

const rootReducer = combineReducers({
    allProduct: productReducer
});


export default rootReducer;
