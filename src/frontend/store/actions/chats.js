import { createAction } from 'redux-actions';
import {
    APP_URL,
    CHATS_API,
    CHATS_LOAD_START,
    CHATS_LOAD_COMPLETE,
    CHATS_LOAD_FAIL,
    CHATS_ADD_COMPLETE,
    CHATS_ADD_FAIL,
    CHATS_DELETE_COMPLETE,
    CHATS_DELETE_FAIL
} from '../../constants'

export const loadChats = (dispatch) => {
    dispatch(loadStart());
    // fetch(`${APP_URL}${CHATS_API}`)
    //     .then((res) => res.json())
    //     .then(
    //         (res) => {
    //             dispatch(loadComplete(res.data));
    //         },
    //         () => {
    //             dispatch(loadFail());
    //         }
    //     )
    setTimeout(() => {
        dispatch(loadComplete(
            [
                { name: 'Bot', id: '0' },
                { name: 'John', id: '1' },
                { name: 'Piotr', id: '2' },
                { name: 'Vasja', id: '3' },
            ]
        )); //mock data
    }, 1500);

};

export const addChatsItem = (dispatch, item) => {
    // fetch(`${APP_URL}${CHATS_API}`)
    //     .then((res) => res.json())
    //     .then(
    //         (res) => {
    //             dispatch(addComplete(item));
    //         },
    //         () => {
    //             dispatch(addFail());
    //         }
    //     )
    dispatch(addComplete(item));
};

export const deleteChatsItem = (dispatch, item) => {
    dispatch(deleteComplete(item));
};

export const loadStart = createAction(CHATS_LOAD_START);
export const loadComplete = createAction(CHATS_LOAD_COMPLETE);
export const loadFail = createAction(CHATS_LOAD_FAIL);
export const addComplete = createAction(CHATS_ADD_COMPLETE);
export const addFail = createAction(CHATS_ADD_FAIL);
export const deleteComplete = createAction(CHATS_DELETE_COMPLETE);
export const deleteFail = createAction(CHATS_DELETE_FAIL);