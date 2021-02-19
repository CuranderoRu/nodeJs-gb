import { MESSAGES_ADD_COMPLETE } from '../../constants'
import { addComplete } from '../actions/messages'

export default store => next => (action) => {
    console.log('[messageMiddleware]', action.type, action.payload, store);
    switch (action.type) {
        case MESSAGES_ADD_COMPLETE:
            const { comment, chatId } = action.payload;
            if (comment.author === 'me' && chatId === "0") {
                setTimeout(
                    () => store.dispatch(addComplete({
                        comment: { author: 'Bot', message: `Hi, bot here!` },
                        chatId: '0'
                    })), 1000)
            }
            break;
    }
    return next(action)
}