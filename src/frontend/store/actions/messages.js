import { createAction } from 'redux-actions';
import { RSAA, getJSON } from 'redux-api-middleware';

import {
    APP_URL,
    MESSAGES_API,
    MESSAGES_LOAD_START,
    MESSAGES_LOAD_COMPLETE,
    MESSAGES_LOAD_FAIL,
    MESSAGES_ADD_COMPLETE,
    MESSAGES_ADD_FAIL,
    MESSAGES_DELETE_COMPLETE,
    MESSAGES_DELETE_FAIL,
    MESSAGES_INIT_COMPLETE,
} from '../../constants'

export const loadMessages = () => {
    return ({
        [RSAA]: {
            endpoint: `${APP_URL}${MESSAGES_API}.json`,
            method: 'GET',
            types: [
                MESSAGES_LOAD_START,
                {
                    type: MESSAGES_LOAD_COMPLETE,
                    payload: (action, state, res) => getJSON(res).then(
                        json => json,
                    ),
                },
                MESSAGES_LOAD_FAIL,
            ],
        },
    })
};


export const addMessageItem = (dispatch, item) => {
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

export const deleteMessageItem = (dispatch, item) => {
    dispatch(deleteComplete(item));
};

export const initNewMessageArray = (dispatch, item) => {
    dispatch(initChat(item));
}

// export const loadMessages = (dispatch) => {
//     dispatch(loadStart());
//     // fetch(`${APP_URL}${CHATS_API}`)
//     //     .then((res) => res.json())
//     //     .then(
//     //         (res) => {
//     //             dispatch(loadComplete(res.data));
//     //         },
//     //         () => {
//     //             dispatch(loadFail());
//     //         }
//     //     )
//     setTimeout(() => {
//         dispatch(loadComplete({
//             '1': [
//                 { author: 'John', message: 'id_1_test_1' },
//                 { author: 'me', message: 'id_1_test_2' },
//                 { author: 'John', message: 'id_1_test_3' },
//                 { author: 'me', message: 'id_1_test_4' },
//                 { author: 'John', message: 'id_1_test_5' },
//             ],
//             '2': [
//                 { author: 'Piotr', message: 'id_2_test_1' },
//                 { author: 'me', message: 'id_2_test_2' },
//                 { author: 'Piotr', message: 'id_2_test_3' },
//                 { author: 'me', message: 'id_2_test_4' },
//                 { author: 'Piotr', message: 'id_2_test_5' },
//             ],
//             '3': [
//                 { author: 'Vasja', message: 'id_3_test_1' },
//                 { author: 'me', message: 'id_3_test_2' },
//                 { author: 'Vasja', message: 'id_3_test_3' },
//                 { author: 'me', message: 'id_3_test_4' },
//                 { author: 'Vasja', message: 'id_3_test_5' },
//             ],
//         })); //mock data
//     }, 1500);
// };
// export const loadStart = createAction(MESSAGES_LOAD_START);
// export const loadComplete = createAction(MESSAGES_LOAD_COMPLETE);
// export const loadFail = createAction(MESSAGES_LOAD_FAIL);
export const addComplete = createAction(MESSAGES_ADD_COMPLETE);
export const initChat = createAction(MESSAGES_INIT_COMPLETE);
export const addFail = createAction(MESSAGES_ADD_FAIL);
export const deleteComplete = createAction(MESSAGES_DELETE_COMPLETE);
export const deleteFail = createAction(MESSAGES_DELETE_FAIL);