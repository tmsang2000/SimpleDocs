// React basic and bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindSwitchingActions } from '../../redux/actions/customer';
import './scss/home.scss';

import Discuss from '../../SimpleDocs.images/Customer/Home/discuss.svg'
import RedSent from '../../SimpleDocs.images/Customer/Home/RedSent.svg'
import BlueWaiting from '../../SimpleDocs.images/Customer/Home/BlueWaiting.svg'
import BlueFinished from '../../SimpleDocs.images/Customer/Home/BlueFinished.svg'
import BlueSent from '../../SimpleDocs.images/Customer/Home/BlueSent.svg'
import RedWaiting from '../../SimpleDocs.images/Customer/Home/RedWaiting.svg'
import RedFinished from '../../SimpleDocs.images/Customer/Home/RedFinished.svg'
import Next from '../../SimpleDocs.images/Customer/Home/next.svg'
import { user1 } from './data-example';
import { bindMeActions } from '../../redux/actions/me';
import { bindDocumentActions } from '../../redux/actions/document';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const {meActions} = this.props;
        meActions.getInproceesDocument().then(res => {
            console.log("Get Inprocess complete")
        }).catch(rej => {
            console.log("Get Inprocess fail")
        })
    }

    checkSent = (process) => {
        if (process.document.status.sent && process.document.status.isPrinting == false && process.document.status.isPrinted == false){
            return true;
        } else {
            return false;
        }
    }

    checkWaiting = (process) => {
        if (process.document.status.isPrinting == true && process.document.status.isPrinted == false){
            return true;
        } else {
            return false;
        }
    }

    checkFinished = (process) => {
        if (process.document.status.isPrinting == false && process.document.status.isPrinted == true){
            return true;
        } else {
            return false;
        }
    }


    render() {
        const { me } = this.props;
        const {switchingActions} = this.props;
        const user = this.props.user;
        const {stage} = this.props;
        const {stage2} = this.state; 
        return ( 
            <div className="container" id= "customerhome"  >
                <div className = "section-1">
                    <div className="sc1">
                        <p className="wrapper">
                            Simple<span className="doc">Doc</span>.<span className="customer">customer</span>
                        </p>
                    </div>
                    <div className = "sc2">
                        <img src={Discuss} className="discuss-i"/>
                        <div className="welcome-l">
                            <div className="hi-wrapper">
                                <h1>Hi! Welcome back, {me.information.data.profile.name}.</h1>
                            </div>
                            <div className="simple-wrapper">
                                <p>It's that simple, isn't it?</p>
                            </div>
                        </div>
                        <div className ="order-n">
                            <Button onClick = {() => {switchingActions.order()}}  className="login-btn" >Order Now</Button>
                        </div>
                    </div>
                </div>
                <div className = "section-2">
                    <div className="in-process-wrapper">
                        <p className="in-process">In-process orders</p>
                    </div>
                    <div className="content-wrapper">
                        {
                            me.inProcessDocument.data.map((process) => {
                                let createTime = '' , arriveTime = ''; 
                                let createDate = '', arriveDate = '';
                                for (let i = 16; i < 21; i++) {
                                    createTime += Date(process.document.createdAt)[i]
                                    arriveTime += Date(process.document.receivingTime)[i]
                                }
                                for (let i = 0; i < 15; i++) {
                                    createDate += Date(process.document.createdAt)[i]
                                    arriveDate += Date(process.document.receivingTime)[i]
                                }
                                if (!process.document.status.isTaken) {
                                    return (
                                        <div className="process-wrapper">
                                            <div className="process">
                                                <div className="info">
                                                    <div className="name-wrapper">
                                                        <p className="name">printer</p>
                                                    </div>
                                                    <div className="address-wrapper">
                                                        <p className="address">address</p>
                                                    </div>
                                                </div>
                                                <div className="timeline-wrapper">
                                                    <div className="wrapper">
                                                        <p className="timeline">Order Time: <span className="number"> {createTime} </span> {createDate}</p>
                                                        <p className="timeline">Arrive Time: <span className="number"> {arriveTime} </span> {arriveDate}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="status-wrapper">
                                                <div className="img-wrapper">
                                                    <img src={this.checkSent(process) ? RedSent : BlueSent} className="sent" />
                                                    <img src={this.checkWaiting(process) ? RedWaiting : BlueWaiting} className="waiting" />
                                                    <img src={this.checkFinished(process) ? RedFinished : BlueFinished} className="finished" />
                                                    <img src={Next} className="next-1" />
                                                    <img src={Next} className="next-2" />
                                                </div>
                                                <div className="notice-wrapper">
                                                    <p className="notice">
                                                        {this.checkSent(process) ? "WAITING FOR US" : ""}
                                                        {this.checkWaiting(process) ? "WAITING FOR PRINTING" : ""}
                                                        {this.checkFinished(process) ? "YOUR DOCUMENT IS COMPLETED !" : ""}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>)
    }
}

export default connect(
    state => ({customer: state.customer, me: state.me, document: state.document}),
    dispatch => channingActions({}, dispatch, bindSwitchingActions, bindMeActions, bindDocumentActions)
  )(Home)