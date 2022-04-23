import { handleActions } from 'redux-actions';

import {
    TOKEN,
    SET_TOKEN,
    LOG_OUT,
    GET_INFO_SUCCEEDED,
    RESET_TOKEN,
    GET_INPROCESS_DOCUMENT_SUCCEEDED
} from '../action-types'

const initialState = {
    token: '',
    role: '',
    isLoggedIn: false,
    inProcessDocument: {
        data: [],
        offsetId: null,
        isLoading: false,
    },
    information: {

    },
}

export default handleActions(
    {
        [SET_TOKEN]: (state, action) => ({
            ...state,
            ...action.payload,
            isLoggedIn: true,
        }),
        [RESET_TOKEN]: (state, action) => initialState,
        [GET_INFO_SUCCEEDED]: (state, action) => ({
            ...state,
            information: action.payload,
            }
        ),
        [LOG_OUT]: (state, action) => ({
            ...state,
            isLoggedIn: false
        }),
        [GET_INPROCESS_DOCUMENT_SUCCEEDED]: (state, action) => ({
            ...state,
            inProcessDocument: {...action.payload},
        }),
    },
    initialState
);