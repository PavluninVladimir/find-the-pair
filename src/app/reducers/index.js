import { combineReducers } from 'redux'
import getImg from './get-img';
import generate from './generate-field';

export default combineReducers({
    getImg,
    generate
})