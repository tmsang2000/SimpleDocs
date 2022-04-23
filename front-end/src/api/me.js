import { axios } from '../lib/custom-axios';
import { API_URL, LOGIN_URL } from '../config';

export const MeAPI = {
    login: (phone) =>
        axios.post(LOGIN_URL, {
            phone,
        }
    ),
    getInfo: () => {
        return axios.get(`${API_URL}api/customer/me`);
    },
    getInprocessDocument: () => {
        return axios.get(`${API_URL}api/customer/inProcessDocument`);
    },
    signUp: data => {
        return axios.post(`${API_URL}api/login/signUp`, data);
    },
}