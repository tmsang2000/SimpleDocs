import {handleActions} from 'redux-actions';
import {SHOW_NOTIFICATION, HIDE_NOTIFICATION} from '../action-types'

const initialState = {
    notification1: "",
    notification2: "",
    isShow: false,
}

export default handleActions(
    {
        [SHOW_NOTIFICATION]: (state, action) => ({
            ...initialState,
            notification1: action.payload.notification1,
            notification2: action.payload.notification2,
            isShow: true
        }),
        [HIDE_NOTIFICATION]: (state, action) => ({
            ...state,
            isShow: false,
        })
    },
    initialState
);