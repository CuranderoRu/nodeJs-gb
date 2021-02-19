import { createAction } from 'redux-actions';
import {
    APP_URL,
    USER_API,
    USER_LOGIN_START,
    USER_LOGIN_COMPLETE,
    USER_LOGIN_FAIL,
    USER_ADD_START,
    USER_ADD_COMPLETE,
    USER_ADD_FAIL,
    USER_UPDATE_START,
    USER_UPDATE_COMPLETE,
    USER_UPDATE_FAIL,
    USER_DELETE_COMPLETE,
    USER_DELETE_FAIL
} from '../../constants'

// export const userLogin1 = (creds) => {
//     return ({
//         [RSAA]: {
//             endpoint: `${APP_URL}${USER_API}.json`,
//             method: 'GET',
//             types: [
//                 USER_LOGIN_START,
//                 {
//                     type: USER_LOGIN_COMPLETE,
//                     payload: (action, state, res) => getJSON(res).then(
//                         json => {
//                             return (json)
//                         },
//                     ),
//                 },
//                 USER_LOGIN_FAIL,
//             ],
//         },
//     })
// };

export const userLogin = (dispatch, item) => {
    dispatch(loginStart(item));
    // fetch(`${APP_URL}${USER_API}`)
    //     .then((res) => res.json())
    //     .then(
    //         (res) => {
    //             dispatch(addComplete(item));
    //         },
    //         () => {
    //             dispatch(addFail());
    //         }
    //     )
    dispatch(loginComplete(item));
};

export const newUser = (dispatch, item) => {
    dispatch(addStart(item));
    // fetch(`${APP_URL}${USER_API}`)
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

export const updateUser = (dispatch, item) => {
    dispatch(updateStart(item));
    // fetch(`${APP_URL}${USER_API}`)
    //     .then((res) => res.json())
    //     .then(
    //         (res) => {
    //             dispatch(addComplete(item));
    //         },
    //         () => {
    //             dispatch(addFail());
    //         }
    //     )
    dispatch(updateComplete(item));
};


export const loginStart = createAction(USER_LOGIN_START);
export const loginComplete = createAction(USER_LOGIN_COMPLETE);
export const loginFail = createAction(USER_LOGIN_FAIL);
export const addStart = createAction(USER_ADD_START);
export const addComplete = createAction(USER_ADD_COMPLETE);
export const updateStart = createAction(USER_UPDATE_START);
export const updateComplete = createAction(USER_UPDATE_COMPLETE);
export const updateFail = createAction(USER_UPDATE_FAIL);
export const addFail = createAction(USER_ADD_FAIL);
export const deleteComplete = createAction(USER_DELETE_COMPLETE);
export const deleteFail = createAction(USER_DELETE_FAIL);