import { createAction } from 'redux-actions';
import {
    MENU_LOAD_COMPLETE,
    MENU_DELETE_COMPLETE,
} from '../../constants'

export const loadComplete = createAction(MENU_LOAD_COMPLETE);
export const deleteComplete = createAction(MENU_DELETE_COMPLETE);