import { handleActions } from 'redux-actions'

import {
    loadStart,
    loadComplete,
    loadFail,
    addComplete,
    addFail,
    deleteComplete,
    deleteFail
} from 'actions/chats'

const initialState = {
    loading: false,
    entities: [],
}


export default handleActions({
    [loadStart]: (state) => {
        return {
            ...state,
            loading: true,
        }
    },
    [loadComplete]: (state, action) => {
        console.log('[ChatsReducer]: loadComplete', action.payload);
        return {
            loading: false,
            entities: action.payload,
        }
    },
    [loadFail]: (state, action) => {
        return {
            loading: false,
            entities: [],
        }
    },
    [addComplete]: (state, action) => {
        let entities = [];
        Object.assign(entities, state.entities);
        const { payload } = action;
        let item = entities.find(item => item.id === payload.id);
        if (!item) { //add new
            entities.unshift(payload);
        } else {
            console.log('[ChatReducer]: addComplete: chat is already exists', payload);
        }
        console.log('[ChatReducer]: addComplete', entities);
        return {
            ...state,
            entities
        }
    },
    [addFail]: (state, action) => {
        return {
            ...state,
        }
    },
    [deleteComplete]: (state, action) => {
        const { payload } = action;
        const entities = state.entities.reduce(
            (res, current) => {
                let skip = false;
                if (current.ticker === payload.ticker) {
                    if (payload.quantity >= current.quantity) {
                        skip = true;
                    }
                }
                if (!skip) { res.push(current) };
                return res;
            }, []);
        console.log('[ChatReducer]: deleteComplete', entities);
        return {
            loading: false,
            entities,
        }
    },
    [deleteFail]: (state, action) => {
        return {
            ...state,
        }
    },
}, initialState)