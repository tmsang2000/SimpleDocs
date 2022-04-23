import React, { Component } from 'react';
import { connect } from 'react-redux'
import {channingActions} from '../lib/helper'
import { bindToastNotificationActions } from '../redux/actions/notification';
import checked from '../SimpleDocs.images/Signup/Signup-Info/Checked.svg'
import Logo from '../SimpleDocs.images/Customer/logo.svg'
import Modal from 'react-awesome-modal';
import './scss/notification.scss'

class Notification extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { notificationActions } = this.props
        const {isShow, notification1, notification2} = this.props.notification
        return (
            <Modal visible={isShow} position="absolute" width="45%" height="40%" effect="fadeInUp" onClickAway={() => notificationActions.hide()}>
                <div id="notification-cont">
                    <div className="symbol">
                        <img src={Logo} />
                    </div>
                    <div className="notification1">
                        <p>{notification1}</p>
                    </div>
                    <div className="notification2">
                        <p>{notification2} <img src={checked} /></p>
                    </div>
                    <div className="redirecting">
                        <p>redirecting...</p>
                    </div>    
                </div>
            </Modal>
        )
    }
}

export default connect(
    state => ({notification: state.notification}),
    dispatch => channingActions({}, dispatch, bindToastNotificationActions)
)(Notification)