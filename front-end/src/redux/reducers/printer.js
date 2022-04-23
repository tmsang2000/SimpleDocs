import { handleActions } from 'redux-actions';

import {
    GET_NEARBY_PRINTER_SUCCEEDED,
    GET_AVAILABLE_PRINTER_SUCCEEDED
} from '../action-types'

const initialState = {
    nearbyPrinter: {
        data: [],
        offsetId: null,
        isLoading: false,
    },
    availablePrinter: {
        data: [],
        offsetId: null,
        isLoading: false,
    },
    allPrinter: {
        data: [],
        offsetId: null,
        isLoading: false,
    },
}

export default handleActions(
    {
        [GET_AVAILABLE_PRINTER_SUCCEEDED]: (state, action) => ({
            ...state,
            availablePrinter: action.payload,
            }
        ),
    },
    initialState
);
