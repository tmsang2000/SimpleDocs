import React, { Component } from 'react';
import { connect } from 'react-redux'
import {channingActions} from '../lib/helper'
import './scss/loading.scss'

class Loading extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {visible} = this.props.loading;
        if(!visible) return null;
        return (
            <div id="loading-cont"></div>
        )
    }
}

export default connect(
    state => ({loading: state.loading}),
    dispatch => channingActions({}, dispatch)
)(Loading)