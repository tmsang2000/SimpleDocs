import { axios } from '../lib/custom-axios';
import { API_URL } from '../config';

export const DocumentAPI = {
    uploadPDF: (PDF) => {
        const formData = new FormData();
        formData.append("PDF", PDF)
        return axios.post(`${API_URL}api/customer/upload`, formData)
    },
    confirmPDF: (stationId, documentId) => {
        const formData = new FormData();
        formData.append("stationId", stationId)
        formData.append("documentId", documentId)
        return axios.post(`${API_URL}api/customer/confirmPDF`, formData)
    }
}