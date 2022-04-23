import { handleActions } from 'redux-actions';

import {
    UPLOAD_PDF_SUCCEEDED,
} from '../action-types'

const initialState = {
    allDocument: {
        data: [],
        offsetId: null,
        isLoading: false,
    },
    uploadedFile: {
    }
}

export default handleActions(
    {
        [UPLOAD_PDF_SUCCEEDED]: (state, action) => ({
            ...state,
            uploadedFile: action.payload,
            }
        ),
    },
    initialState
);

