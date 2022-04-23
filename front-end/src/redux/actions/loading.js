import { bindActionCreators } from "redux";
import {createAction} from 'redux-actions';
import {SHOW_LOADING, HIDE_LOADING} from '../action-types'

export const showLoading =  createAction(SHOW_LOADING);
export const hideLoading =  createAction(HIDE_LOADING)

export function bindLoadingActions(currentActions, dispatch) {
    return {
        ...currentActions,
        loadingActions: bindActionCreators(
            {
                show : showLoading,
                hide : hideLoading
            },
            dispatch
        ),
    }
}