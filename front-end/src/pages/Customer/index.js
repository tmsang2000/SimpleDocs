// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindSwitchingActions } from '../../redux/actions/customer';
import { user1 } from './data-example'
import './scss/customer.scss';

// import images
import Home from './Home';
import OrderScreen from './Order';

import Sample from '../../SimpleDocs.images/Customer/sampleavt.svg'
import Order from '../../SimpleDocs.images/Customer/order-icon.svg'
import Earn from '../../SimpleDocs.images/Customer/earn-icon.svg'
import Discount from '../../SimpleDocs.images/Customer/discount.svg'
import Event from '../../SimpleDocs.images/Customer/event.svg'
import Add from '../../SimpleDocs.images/Customer/add.svg'
import Logo from '../../SimpleDocs.images/Customer/logo.svg'
import Dashboard from '../../SimpleDocs.images/Customer/Order/dashboard.svg'
import DashboardN from '../../SimpleDocs.images/Customer/Order/dashboard-n.svg'
import OrderC from '../../SimpleDocs.images/Customer/Order/order-color.svg'
import OrderN from '../../SimpleDocs.images/Customer/Order/order-n.svg'
import Setting from '../../SimpleDocs.images/Customer/Order/setting.svg'
import Message from '../../SimpleDocs.images/Customer/Order/message.svg'
import { bindMeActions } from '../../redux/actions/me';
import { bindToastNotificationActions } from '../../redux/actions/notification';

class Customer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hidden: true,
          page: "home",
          process: 1,
          stage: 0,
        };
    }

    render() {
        //console.log("counted");
        const {me, switchingActions, notificationActions} = this.props;
        console.log("me: ", this.props.me)
        let total = 0;
        if (me.information.data.orderHistory.length > 0) me.information.data.orderHistory.forEach((idx) => total += idx.document.cost.initial)
        return (
            <React.Fragment>
                <div className = "cus-cont">
                    <div className ="left-menu-cont">
                        <div className="sec1">
                            <img src={Logo} className="img"/>
                        </div>
                        <div className="sec2">
                                <div onClick = {() => {switchingActions.home()}} className={this.props.customer.page == 'home' ? "active item-un" : "item-un"}><img src={this.props.customer.page == 'home' ? Dashboard : DashboardN}/><p>Home</p></div>
                                <div onClick = {() => {switchingActions.order()}} className={this.props.customer.page == 'order' ? "active item-un" : "item-un"}><img src={this.props.customer.page == 'order' ? OrderN : OrderC}/><p>Orders</p></div>
                                {/* <div className="item-un"><img src={Message}/><p>Messages</p></div> */}
                                <div className="item-un"><img src={Setting}/><p>Settings</p></div>

                        </div>
                    </div>
                    <div className = "middle-cont">
                        {this.props.customer.page == 'home' == true ? (<Home> </Home>) :
                            <OrderScreen></OrderScreen>}
                    </div>
                    <div className = "right-menu-cont">
                        <div className = "sec1">
                            <div className="avatar">
                                <img src={Sample} className="cus-logo"/>
                            </div>
                            <div className="info">
                                <div className="name-wrapper">
                                    <h1>{me.information.data.profile.name}</h1>
                                </div>
                                <div className="address-wrapper">
                                    <p>{me.information.data.profile.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className = "sec2">
                            <div className="box-wrapper">
                                <div className="order box">
                                    <div className="icon">
                                        <img src={Order} className="img"></img>
                                    </div>
                                    <div className="content">
                                        <p>Ordering Times</p>
                                        <h1>{me.information.data.orderHistory.length}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="box-wrapper">
                                <div className="earn box">
                                    <div className="icon">
                                        <img src={Earn} className="img"></img>
                                    </div>
                                    <div className="content">
                                        <p>Earnings Report</p>
                                        <h1>{total} vnđ</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "sec3">
                            <div className="title-wrapper">
                                <p className="title">Best deal for you</p>
                            </div>
                            <div className="promo-wrapper">
                                <div className = "promotion">
                                    <div className="img">
                                        <img src={Discount}></img>
                                    </div>
                                    <div className="content-wrapper">
                                        <p className="content">Newbie Discount</p>
                                    </div>

                                </div>
                                <div className = "promotion">
                                    <div className="img">
                                        <img src={Event}></img>
                                    </div>
                                    <div className="content-wrapper">
                                        <p className="content">Weekly Event</p>
                                    </div>
                                </div>
                                <div className = "promotion">
                                    <div className="img">
                                        <img src={Add}></img>
                                    </div>
                                    <div className="content-wrapper">
                                        <p className="content">More deals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(
    state => ({customer: state.customer, me: state.me, document: state.document}),
    dispatch => channingActions({}, dispatch, bindSwitchingActions, bindMeActions, bindToastNotificationActions)
  )(Customer)