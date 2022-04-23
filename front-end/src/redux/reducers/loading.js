import {handleActions} from 'redux-actions';
import {SHOW_LOADING, HIDE_LOADING} from '../action-types'

const initialState = {
    visible: false
}

export default handleActions(
    {
        [SHOW_LOADING]: (state, action) => ({
            ...initialState,
            visible: true
        }),
        [HIDE_LOADING]: (state, action) => ({
            ...initialState
        })
    },
    initialState
);