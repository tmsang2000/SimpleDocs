import { bindActionCreators } from "redux";
import {createAction} from 'redux-actions';
import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../action-types'

export const showNotification = createAction(SHOW_NOTIFICATION, (notification1, notification2) => ({
    notification1: notification1,
    notification2: notification2,
}));

export const hideNotification =  createAction(HIDE_NOTIFICATION)

export function bindToastNotificationActions(currentActions, dispatch) {
    return {
        ...currentActions,
        notificationActions: bindActionCreators(
            {
                show : showNotification,
                hide: hideNotification,
            },
            dispatch
        ),
    }
}