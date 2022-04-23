//Loading action types
export const SHOW_LOADING = 'loading/SHOW'
export const HIDE_LOADING = 'loading/HIDE'

//Toast notification action types
export const SHOW_NOTIFICATION = 'toasting/SHOW'
export const HIDE_NOTIFICATION = 'toasting/HIDE'

//me
export const SET_TOKEN = 'me/SET_TOKEN';
export const RESET_TOKEN = 'me/RESET_TOKEN';
export const TOKEN = 'me/TOKEN';
export const GET_INFO = 'me/GET_INFO'
export const GET_INFO_SUCCEEDED = `${GET_INFO}_SUCCEEDED`;
export const GET_INPROCESS_DOCUMENT = 'document/GET_INPROCESS_DOCUMENT'
export const GET_INPROCESS_DOCUMENT_SUCCEEDED = `${GET_INPROCESS_DOCUMENT}_SUCCEEDED`

//Document
export const UPLOAD_PDF = 'document/UPLOAD_PDF'
export const UPLOAD_PDF_SUCCEEDED = `${UPLOAD_PDF}_SUCCEEDED`;

//Printer
export const GET_NEARBY_PRINTER = 'printer/GET_NEARBY_PRINTER'
export const GET_NEARBY_PRINTER_SUCCEEDED =  `${GET_NEARBY_PRINTER}_SUCCEEDED`
export const GET_AVAILABLE_PRINTER = 'printer/GET_AVAILABLE_PRINTER'
export const GET_AVAILABLE_PRINTER_SUCCEEDED =  `${GET_AVAILABLE_PRINTER}_SUCCEEDED`

//Customer Page
export const SWITCH_CUSTOMER_HOME = 'switch/CUSTOMER/HOME'
export const SWITCH_CUSTOMER_ORDER = 'switch/CUSTOMER/ORDER'
export const SWITCH_CUSTOMER_SETTING = 'switch/CUSTOMER/SETTING'

export const LOG_OUT = 'LOG_OUT'
