import { handleActions } from 'redux-actions'

import {
    loadComplete,
    deleteComplete,
} from 'actions/menu'

const initialState = {
    entities: [{ name: 'Lesson 3', href: 'lesson3' }, { name: 'Chat', href: 'login' }],
}


export default handleActions({
        [loadComplete]: (state, action) => {
            console.log('[menuReducer]: loadComplete', action.payload);
            return {
                entities: action.payload,
            }
        },
        [deleteComplete]: (state, action) => {
            console.log('[menuReducer]: deleteComplete');
            return {
                entities: [],
            }
        },
    },
    initialState)