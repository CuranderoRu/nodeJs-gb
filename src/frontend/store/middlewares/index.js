import { apiMiddleware } from 'redux-api-middleware';
import messageMiddleware from './messageMiddleware';

export default [
    apiMiddleware,
    messageMiddleware,
];