import { bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { DocumentAPI } from '../../api/document';
import _ from 'lodash';

import {
    UPLOAD_PDF_SUCCEEDED,
} from '../action-types'

const storeUploadedPDF = createAction(UPLOAD_PDF_SUCCEEDED, (data) => ({
    ...data
}))

export const uploadPDF = (PDF) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const {data}  = await DocumentAPI.uploadPDF(PDF);
            if(data.error){
                reject(data);
            }
            await dispatch(storeUploadedPDF(data));
            console.log("Upload PDF success")
            resolve(data);
        } catch (err) {
            reject(err.response);
        }
    });
};

export const confirmPDF = (stationId, documentId) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const {data}  = await DocumentAPI.confirmPDF(stationId, documentId);
            if(data.error){
                reject(data);
            }
            console.log("Confirm PDF success")
            resolve(data);
        } catch (err) {
            reject(err.response);
        }
    });
};

export const documentActions = {
    uploadPDF,
    confirmPDF
}

export function bindDocumentActions(currentActions, dispatch) {
    return {
        ...currentActions,
        documentActions: bindActionCreators(documentActions, dispatch),
    };
}

