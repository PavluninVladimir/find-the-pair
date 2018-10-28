import uuid4 from 'uuid/v4';
import defaultImg from '../files/img/di-IUZQY3.png';
import { FIELD_GENERATION,
    ADD_ID_CELL,
    CLEAR_ID_CELL,
    IS_PAIR,
    GAME_OVER
} from './action-types';

const generateRow = (elements, count) => {
    if (count === 1) {
        return elements;
    }
    return [].concat(elements, generateRow(elements, count - 1));
};

export const clearIdCell = () => (dispatch) => {
    dispatch({type: CLEAR_ID_CELL});
}

export const addIdCell = () => (dispatch) => {
    let id = uuid4();
    dispatch({
        type: ADD_ID_CELL,
        id
    });
    return id;
};

export const imgView = (id) => (dispatch, getState) => {
    const { getImg: { bindCellImg } } = getState();
    return bindCellImg.filter(element => element.cell === id)[0].img;
}

export const imgHide = () => (dispatch) => {
    dispatch({
        type: IS_PAIR,
        pair: ''
    })
    return defaultImg;
}
export const isPair = (field) => (dispatch, getState) => {
    const { generate: { pair } } = getState();
    if (!pair) {
        dispatch({
            type: IS_PAIR,
            pair: field
        })
        return undefined;
    }
    if (imgView(field.dataset.key)(dispatch, getState)
        === imgView(pair.dataset.key)(dispatch, getState)) {
        return true;
    } else {
        return false;
    }
}

export const generate = (options) => (dispatch, getState) => {
    const { count, row, cell, init, show } = options;
    const { getImg: { bindCellImg } } = getState();
    try {
        let i = -1;
        let rowImg = () => generateRow(cell, count).map(
            element => {
                if (bindCellImg.length !== 0 && !init) {
                    i++;
                    return element({
                        count,
                        key: bindCellImg[i].cell,
                        img: show ? bindCellImg[i].img : defaultImg
                    })
                }
                let key = addIdCell()(dispatch)
                return element({ count, key, img: defaultImg })
            }
        )
        let fieldPlay = generateRow(row, count).map(
            (element) => element(rowImg()));
        dispatch({
            type: FIELD_GENERATION,
            data: fieldPlay
        });
    } catch (err) {
        console.log(err);
    }
};

export const gameOver = () => (dispatch) => {
    dispatch({type: GAME_OVER});
}