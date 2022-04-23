import { bindActionCreators } from "redux";
import {createAction} from 'redux-actions';
import {
    SWITCH_CUSTOMER_HOME, 
    SWITCH_CUSTOMER_SETTING, 
    SWITCH_CUSTOMER_ORDER
} from '../action-types'

export const switchHome =  createAction(SWITCH_CUSTOMER_HOME);
export const switchOrder =  createAction(SWITCH_CUSTOMER_ORDER);
export const switchSetting =  createAction(SWITCH_CUSTOMER_SETTING);

export function bindSwitchingActions(currentActions, dispatch) {
    return {
        ...currentActions,
        switchingActions: bindActionCreators(
            {
                home : switchHome,
                order : switchOrder,
                setting: switchSetting,
            },
            dispatch
        ),
    }
}