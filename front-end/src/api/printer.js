import { axios } from '../lib/custom-axios';
import { API_URL } from '../config';

export const PrinterAPI = {
    getAvailablePrinter: (PDF, longtitude, latitude, receiveTime) => {
        const formData = new FormData();
        formData.append("PDF", PDF)
        formData.append("longtitude", longtitude)
        formData.append("latitude", latitude)
        formData.append("receiveTime", receiveTime)
        return axios.post(`${API_URL}api/customer/orderPDF`, formData)
    }
}