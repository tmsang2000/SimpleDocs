import React, { Component, Suspense } from 'react';
import Layout from './components/Layout';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import {initializeStore} from "./redux"
import Loading from './components/Loading';
import { connect } from 'react-redux'
import {channingActions} from './lib/helper'
import { bindMeActions } from './redux/actions/me';

// Import Css
import './Apps.scss';

// Include Routes 
import AppEntry from './routes';


// Root Include
const storage = initializeStore({})

class App extends Component {
  render() {
    return (
      <Provider store={storage.store}>
        <PersistGate loading={null} persistor={storage.persistor}>
          <AppEntry />
        </PersistGate>
      </Provider>
    );
  }
}

export default withRouter(App);