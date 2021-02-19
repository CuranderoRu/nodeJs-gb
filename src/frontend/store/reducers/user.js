import {
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


const initialState = {
    loading: false,
    user: {
        id: null,
        nick: null,
        login: null,
    },
}


export default function userReducer(state = initialState, action) {
    console.log('[userReducer]', action.type, action.payload);
    switch (action.type) {
        case USER_LOGIN_START:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case USER_LOGIN_COMPLETE:
            {
                return {
                    loading: false,
                    user: action.payload,
                }
            }
        case USER_LOGIN_FAIL:
            {
                return {
                    ...initialState
                }
            }
        case USER_ADD_START:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case USER_ADD_COMPLETE:
            {
                return {
                    ...state,
                    user: action.payload
                }
            }
        case USER_ADD_FAIL:
            {
                return {
                    ...state,
                }
            }
        case USER_UPDATE_START:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case USER_UPDATE_COMPLETE:
            {
                return {
                    ...state,
                    user: {
                        id: state.user.id,
                        nick: action.payload.nick,
                        login: state.user.login,
                    },
                }
            }
        case USER_UPDATE_FAIL:
            {
                return {
                    ...state,
                }
            }
        case USER_DELETE_COMPLETE:
            {
                return {
                    ...initialState
                }
            }
        case USER_DELETE_FAIL:
            {
                return {
                    ...state,
                }
            }

        default:
            return state;
    }
}