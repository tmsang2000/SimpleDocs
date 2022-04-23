import { bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { PrinterAPI } from '../../api/printer';
import _ from 'lodash';

import {
    GET_AVAILABLE_PRINTER_SUCCEEDED
} from '../action-types'

const storeAvailablePrinter = createAction(GET_AVAILABLE_PRINTER_SUCCEEDED, (data) => ({
    ...data
}))

export const getAvailablePrinter = (PDF, longitude, latitude, receiveTime) => async dispatch => {
    return new Promise(async (resolve, reject) => {
        try { 
            const {data}  = await PrinterAPI.getAvailablePrinter(PDF, longitude, latitude, receiveTime);
            if(data.error){
                reject(data);
            }
            await dispatch(storeAvailablePrinter(data));
            resolve(data);
        } catch (err) {
            reject(err.response);
        }
    });
};

export const printerActions = {
    getAvailablePrinter
}

export function bindPrinterActions(currentActions, dispatch) {
    return {
        ...currentActions,
        printerActions: bindActionCreators(printerActions, dispatch),
    };
}

