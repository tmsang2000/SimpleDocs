import axios from 'axios';
import _ from 'lodash';
import { store } from '../redux';

let callback401 = null;

export function set401Callback(cb) {
    callback401 = cb;
}

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { response } = error;
        if (
            !_.isEmpty(response) &&
            response.status === 401 &&
            !_.isNull(callback401)
        ) {
            callback401(response.data.error);
        }

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use(
    config => {
        config.headers.authorization = `${store.getState().me.token}`;
        return config;
    },

    error => Promise.reject(error)
);

export { axiosInstance as axios };
