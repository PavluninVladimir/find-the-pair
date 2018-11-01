import {
    GET_LIST_PIC_FETCH,
    GET_LIST_PIC_SUCCESS,
    GET_LIST_PIC_ERROR,
    BIND_CELL_IMG
} from '../actions/action-types';
import fetchAPI from '../util/fetch'


export const getImg = (count) => (dispatch, getState) => {
    dispatch({type: GET_LIST_PIC_FETCH});
    return fetchAPI(`api/v1/getimg/${count}`).GET()
        .then((response) => {
            dispatch({
                type: GET_LIST_PIC_SUCCESS,
                data: response.data
            });
            bindImgCell()(dispatch, getState);
            return Promise.resolve(response);
        })
        .catch((err) => {
            dispatch({
                type: GET_LIST_PIC_ERROR,
                errorMess: err
            });
            return Promise.reject(err);
        })
}

const bindImgCell = () => (dispatch, getState) => {
    const { getImg: { listIdGeneratedCells, pictures } } = getState();
    let dublePictures = pictures.concat(pictures);
    let i = 0;
    let rest = listIdGeneratedCells.reduce((obj, element) => {
        obj.push({
            id: Math.floor(Math.random() * 10000),
            img: dublePictures[obj.length],
            cell: element
        });
        return obj;
    }, []);
    dispatch({
        type: BIND_CELL_IMG,
        data: rest.sort((a, b) => {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
    });
    return rest;
}

