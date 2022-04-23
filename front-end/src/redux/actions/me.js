import { bindActionCreators } from 'redux';
import { createAction } from 'redux-actions';
import { MeAPI } from '../../api/me';
import {documentActions} from './document'
import _ from 'lodash';

import {
    TOKEN,
    SET_TOKEN,
    GET_INFO_SUCCEEDED,
    RESET_TOKEN,
    LOG_OUT,
    GET_INPROCESS_DOCUMENT_SUCCEEDED
} from '../action-types'

const logout = createAction(LOG_OUT, () => ({
}))

const storeToken = createAction(SET_TOKEN, (token) => ({
    token
}))

const storeInprocessDocument = createAction(GET_INPROCESS_DOCUMENT_SUCCEEDED, (data) => ({
    data
}))

const storeInfo = createAction(GET_INFO_SUCCEEDED, (data) => ({
    data
}))

export const setToken = async (token) => {
    try {
      localStorage.setItem(TOKEN, JSON.stringify(token));
      Promise.resolve();
    } catch (error) {
      console.log("Error in setToken in me.js in actions in redux")
    }
};

export const resetToken = async (token) => {
    try {
      localStorage.clear();
    } catch (error) {
    }
};

export const login = (phone) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data}  = await MeAPI.login(phone);
            if(data.error){
                reject(data);
            }
            const { token } = data;
            setToken({token: token});
            await dispatch(storeToken(token));
            await dispatch(fetchPersionalInfo(token));
            await dispatch(getInproceesDocument(token));
            resolve(data);
        } catch (err) {
            reject(err.response);
        }
    });
};

export const signUp = (phone) => async (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data}  = await MeAPI.signUp({
                phone: phone,
            });
            if(data.error){
                reject(data);
            }
            const { token } = data;
            setToken({token: token});
            await dispatch(storeToken(token));
            await dispatch(fetchPersionalInfo());
            await dispatch(getInproceesDocument());
            resolve(data);
        } catch (err) {
            reject(err.response);
        }
    });
};

export const deleteUserDataAction = (token, data) => async (dispatch, getState) => {
    try {
        localStorage.removeItem(TOKEN);
        dispatch(logout());
        Promise.resolve();
    } catch (error) {
        Promise.reject(error);
    }
}

export const fetchPersionalInfo = (token = null) => async (
    dispatch,
) => {
    try {
        const {data} = await MeAPI.getInfo();
        if(data != undefined){
            await dispatch(storeInfo(data));

            Promise.resolve();
        }
    } catch(err){
        console.log(err);
    }
}

export const getInproceesDocument = (token = null) => async (
    dispatch,
) => {
    try {
        const {data} = await MeAPI.getInprocessDocument();
        if(data != undefined){
            await dispatch(storeInprocessDocument(data));

            Promise.resolve();
        }
    } catch(err){
        console.log(err);
    }
}

export const meActions = {
    login,
    fetchPersionalInfo,
    getInproceesDocument,
    signUp
}

export function bindMeActions(currentActions, dispatch) {
    return {
        ...currentActions,
        meActions: bindActionCreators(meActions, dispatch),
    };
}

