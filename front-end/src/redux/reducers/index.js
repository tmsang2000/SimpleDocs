import { combineReducers } from 'redux';

import loading from './loading';
import customer from './customer';
import me from './me'
import document from './document'
import printer from './printer'
import notification from './notification'

export default function createRootReducer() {
    return combineReducers({
        me,
        loading,
        customer,
        document,
        printer,
        notification
    });
}