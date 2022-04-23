// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindLoadingActions } from '../../redux/actions/loading';
import './scss/sms.scss'

// import images
import imgBackground from '../../SimpleDocs.images/Signup/SMS/background.svg'
import connectLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-logo.svg'
import connectTopLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-top.svg'
import connectBottomLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-bottom.svg'
import { bindToastNotificationActions } from '../../redux/actions/notification';

class PageSMS extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            sms: "",
        };
    }

    changeSMS = (event) => {
        this.setState({
            sms: event.target.value
        })
    }

    onValidSubmit = () => {
        const {notificationActions} = this.props;
        if (this.state.sms == "123456") {
            this.props.history.push('/customer')
            notificationActions.show("Hi there, welcome to SimpleDoc.", "Your registration is done!");
        }
        // loadingActions.show();
    }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <section>
                    <Container id="sms-cont">
                        <div className="sms-leftside">   
                            <img src={imgBackground} className="img-sms" alt=""/>
                            <div className="img-connect">
                                <img src={connectLogo} className="img-connect-middle" alt=""/>
                                <img src={connectTopLogo} className="img-connect-top" alt=""/>
                                <div className ="white-area"></div>
                                <img src={connectBottomLogo} className="img-connect-bottom" alt=""/>
                            </div>
                        </div>
                        <div className="sms-rightside">
                            <div className ="sms-wrapper">
                                <div className="sms-logo">
                                    <p className="wrapper">
                                        <Link to="/index">
                                            Simple<span className="doc">Doc</span>.customer
                                        </Link>
                                    </p>
                                </div>
                                <div className="sms-middle-wrapper">
                                    <div className="input-wrapper">
                                        <p className= "custom-text1">To make sure that is you</p>
                                        <p className= "custom-text2">we have sent a <span className="secret"> secret </span> code to your phone</p>
                                        <div className="input">
                                            <form autoComplete="on" autoCorrect="on" className="field-wrapper">
                                                <input type="tel" autoSave="off" autoFill="off" autoComplete="off" autoFocus="off" autoCorrect="off" maxLength={6} onChange={this.changeSMS} name="sms" id="sms" placeholde="" className="input-text" />
                                                <div className="sms-box">
                                                    <p className="box">{this.state.sms[0]}</p>
                                                    <p className="box">{this.state.sms[1]}</p>
                                                    <p className="box">{this.state.sms[2]}</p>
                                                    <p className="box">{this.state.sms[3]}</p>
                                                    <p className="box">{this.state.sms[4]}</p>
                                                    <p className="box">{this.state.sms[5]}</p>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="submit-wrapper">     
                                                <Button disabled={this.state.sms.length == 6 ? false : true} className="sms-btn" onClick={this.onValidSubmit}>  CONFIRM </Button>
                                        </div>
                                    </div>
                                </div>
                                <p className="already-have-account">Already have an account?&nbsp;&nbsp;<Link to="/page-login" >Login here</Link></p>
                            </div>
                        </div>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default connect(
    state => ({}),
    dispatch => channingActions({}, dispatch, bindLoadingActions, bindToastNotificationActions)
  )(PageSMS)