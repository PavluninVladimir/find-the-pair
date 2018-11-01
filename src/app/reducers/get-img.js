import {
    GET_LIST_PIC_FETCH,
    GET_LIST_PIC_SUCCESS,
    GET_LIST_PIC_ERROR,
    ADD_ID_CELL,
    CLEAR_ID_CELL,
    BIND_CELL_IMG
} from '../actions/action-types';
import pic from '../files/img/di-IUZQY3.png';
const initState = {
    listIdGeneratedCells: [],
    pictures: [],
    img: pic,
    bindCellImg: [],
    fetch: false,
    success: false,
    error: false
}

export default function getImg(state = initState, action) {
    switch (action.type) {
        case GET_LIST_PIC_FETCH:
            return {
                ...state,
                fetch: true,
                success: false,
                error: false
            }
        case GET_LIST_PIC_SUCCESS:
            return {
                ...state,
                pictures: action.data,
                fetch: false,
                success: true,
                error: false
            }
        case GET_LIST_PIC_ERROR:
            return {
                ...state,
                errorMess: action.data,
                fetch: false,
                success: false,
                error: true
            }
        case ADD_ID_CELL:
            return {
                ...state,
                listIdGeneratedCells: [
                    ...state.listIdGeneratedCells,
                    action.id
                ],
            }
        case CLEAR_ID_CELL:
            return {
                ...state,
                listIdGeneratedCells: [],
            }
        case BIND_CELL_IMG:
            return {
                ...state,
                img: 'pic',
                bindCellImg: action.data
            }
        default:
            return state
    }
}
