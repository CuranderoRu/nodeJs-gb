import {
    MESSAGES_LOAD_START,
    MESSAGES_LOAD_COMPLETE,
    MESSAGES_LOAD_FAIL,
    MESSAGES_ADD_COMPLETE,
    MESSAGES_ADD_FAIL,
    MESSAGES_DELETE_COMPLETE,
    MESSAGES_DELETE_FAIL,
    MESSAGES_INIT_COMPLETE,
} from '../../constants'


const initialState = {
    loading: false,
    entities: { '0': [] },
}


export default function messageReducer(state = initialState, action) {
    console.log('[messageReducer]', action.type, action.payload);
    switch (action.type) {
        case MESSAGES_LOAD_START:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case MESSAGES_LOAD_COMPLETE:
            {
                let entities = {};
                Object.assign(entities, state.entities, action.payload);
                return {
                    loading: false,
                    entities,
                }
            }
        case MESSAGES_LOAD_FAIL:
            {
                return {
                    loading: false,
                    entities: [],
                }
            }
        case MESSAGES_ADD_COMPLETE:
            {
                let entities = {};
                Object.assign(entities, state.entities);
                const { payload } = action;
                entities[payload.chatId] = [payload.comment, ...entities[payload.chatId]];
                return {
                    ...state,
                    entities
                }
            }
        case MESSAGES_ADD_FAIL:
            {
                return {
                    ...state,
                }
            }
        case MESSAGES_DELETE_COMPLETE:
            {
                let entities = [];
                Object.assign(entities, state.entities);
                const { payload } = action;
                // const entities = state.entities.reduce(
                //     (res, current) => {
                //         let skip = false;
                //         if (current.ticker === payload.ticker) {
                //             if (payload.quantity >= current.quantity) {
                //                 skip = true;
                //             }
                //         }
                //         if (!skip) { res.push(current) };
                //         return res;
                //     }, []);
                return {
                    loading: false,
                    entities,
                }
            }
        case MESSAGES_DELETE_FAIL:
            {
                return {
                    ...state,
                }
            }
        case MESSAGES_INIT_COMPLETE:
            {
                let entities = {};
                Object.assign(entities, state.entities);
                const { payload } = action;
                entities[payload.id] = [];
                return {
                    ...state,
                    entities
                }
            }
        default:
            return state;
    }
}