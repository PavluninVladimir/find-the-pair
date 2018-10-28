
import { FIELD_GENERATION, IS_PAIR, GAME_OVER } from '../actions/action-types';

const initState = {
    fieldInit: false,
    fields: [],
    pair: ''
}

export default function generate(state = initState, action) {
    switch (action.type) {
        case FIELD_GENERATION:
            return {
                ...state,
                fieldInit: true,
                fields: action.data
            }
        case IS_PAIR:
            return {
                ...state,
                pair: action.pair
            }
        case GAME_OVER:
            return {
                ...state,
                fields: []
            }
        default:
            return state
    }
}