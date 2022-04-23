import {handleActions} from 'redux-actions';
import {
    SWITCH_CUSTOMER_HOME, 
    SWITCH_CUSTOMER_SETTING, 
    SWITCH_CUSTOMER_ORDER
} from '../action-types'

const initialState = {
    page: 'home'
}

export default handleActions(
    {
        [SWITCH_CUSTOMER_HOME]: (state, action) => ({
            ...initialState,
        }),
        [SWITCH_CUSTOMER_SETTING]: (state, action) => ({
            page: 'setting'
        }),
        [SWITCH_CUSTOMER_ORDER]: (state, action) => ({
            page: 'order'
        })
    },
    initialState
);