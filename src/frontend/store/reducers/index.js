import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import chatReducer from './chats'
import menuReducer from './menu'
import messageReducer from './messages'
import userReducer from './user'

export default (history) => combineReducers({
    router: connectRouter(history),
    menu: menuReducer,
    chats: chatReducer,
    messages: messageReducer,
    user: userReducer,
})