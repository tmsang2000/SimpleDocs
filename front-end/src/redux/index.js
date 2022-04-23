import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // which reducer want to store
}

const pReducer = persistReducer(persistConfig, createRootReducer())

export let store;

export function initializeStore(initialState) {
    store = createStore(
        pReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    )
    let persistor = persistStore(store)

    return {store, persistor};
}