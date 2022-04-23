import React, { Component, Suspense } from 'react';
import Layout from './components/Layout/';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Loading from './components/Loading';
import Notification from './components/Notification'
import { connect } from 'react-redux'
import {channingActions} from './lib/helper'
import { bindMeActions } from './redux/actions/me';
import { PersistGate } from 'redux-persist/integration/react'

// Import all components
const Root = React.lazy(() => import('./pages/Home/indexRoot'));
const Signup = React.lazy(() => import('./pages/Sign-up/index'));
const Customer = React.lazy(() => import('./pages/Customer/index'));

const routes = [

    // public Routes
    // { path: '/index-saas', component: Saas },
    { path: '/customer', component: Customer, isWithoutLayout : true, loadLocal: true },

    { path: '/signup', component: Signup, isWithoutLayout : true, loadLocal: false },
    { path: '/', component: Root, loadLocal: false},

];

function withLayout(WrappedComponent) {
    // ...and returns another component...
    return class extends React.Component {  
        render() {
        return (
            <Layout>
                <WrappedComponent></WrappedComponent>
            </Layout>
            )
        }
    };
}
  
class AppEntry extends Component {

    Loader = () => {
        return (
        <div id="pageLoader">
            <div id="preloader">
            <div id="status">
                <div className="spinner">
                    <div className="symbol"></div>
                    <div className="shadow"></div>
                </div>
            </div>
            </div>
        </div>
        )
    }

    render() {
        const {me} = this.props;
        return (
                <React.Fragment>  
                    <Router>
                        <Suspense fallback = {this.Loader()}>
                            <Switch>
                            {routes.map((route, idx) =>
                                route.isWithoutLayout ?
                                    <Route path={route.path} component={route.component} key={idx} />
                                :
                                    <Route path={route.path} component={withLayout(route.component)} key={idx} />
                            )}
                            </Switch>
                        </Suspense>
                        <Loading />
                        <Notification />
                    </Router>
                </React.Fragment>
        );
    }
}

export default connect(
state => ({me: state.me}),
dispatch => channingActions({}, dispatch, bindMeActions)
)(AppEntry);