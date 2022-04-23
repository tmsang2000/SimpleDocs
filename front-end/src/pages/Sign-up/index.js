// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import './scss/signup.scss'
import { withRouter } from 'react-router-dom';
import PageSMS from './SMS'
import PageContract from './contract'
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindMeActions } from '../../redux/actions/me';
import { bindToastNotificationActions } from '../../redux/actions/notification';

// import images
import imgBackground from '../../SimpleDocs.images/Signup/Signup-Info/background.svg';
import connectLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-logo.svg'
import connectTopLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-top.svg'
import connectBottomLogo from '../../SimpleDocs.images/Signup/Signup-Info/connect-bottom.svg'
import checked from '../../SimpleDocs.images/Signup/Signup-Info/Checked.svg'

class PageSignup extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          passwordHidden: true,
          confirmHidden: true,
          username: "",
          password: "",
          confirm: "",
          sms: false,
          contract: false,
        };
    }

    changeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    changePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    changeConfirm = (event) => {
        this.setState({
            confirm: event.target.value
        })
    }

    changeConfirmPassword = (event) => {
        this.setState({
            confirm: event.target.value
        })
    }

    onValidSignup = () => {
        const { meActions } = this.props
        if (this.state.password == this.state.confirm && this.state.username != "" && this.state.password != "") {
            meActions.signUp(this.state.username).then(res => {
                console.log("Sign up success");
                this.setState({
                    contract: true
                })
            }).catch(rej => {
                console.log("Signup Actions fail")
            })
            
        }
    }

    onValidContract = () => {
        this.setState({
            sms: true
        })
    }

    togglePassword = () => {
        this.setState({ passwordHidden: !this.state.passwordHidden });
    }

    toggleConfirm = () => {
        this.setState({ confirmHidden: !this.state.confirmHidden });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.sms == false ? 
                    <section>
                        <Container id="signup-cont">
                            <div className="signup-leftbg">   
                                <img src={imgBackground} className="img-signup" alt=""/>
                                <div className="img-connect">
                                    <img src={connectLogo} className="img-connect-middle" alt=""/>
                                    <img src={connectTopLogo} className="img-connect-top" alt=""/>
                                    <div className ="white-area"></div>
                                    <img src={connectBottomLogo} className="img-connect-bottom" alt=""/>
                                </div>
                            </div>
                            {this.state.contract == false 
                            ? 
                                <div className="signup-form">
                                    <div className ="signup-wrapper">
                                        <div className="signup-logo">
                                            <p className="wrapper">
                                                <Link to="/index">
                                                    Simple<span className="doc">Doc</span>.customer
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="middle-signup-wrapper">
                                            <AvForm className = "input-wrapper">
                                                <p className= "custom-text">Create account</p>
                                                <AvGroup className="group-wrapper-1">
                                                    <div className="field-wrapper">
                                                        <Label className="label" for="username">VN</Label>
                                                        <AvInput onChange={this.changeUsername} name="username" id="username" placeholder="Phone number" required
                                                            errorMessage=""
                                                            validate={{
                                                                // required: {value: true, errorMessage: "Please enter your Phone number / Email"},
                                                                pattern: {value: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$'},
                                                            }}
                                                            className="field"
                                                        />
                                                        {this.state.username != "" && this.state.username.search('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$') == 0 ? <div className={"check"} ><img src={checked} className="check-img"/></div> : null}
                                                        <AvFeedback className="invalid-feedback" for="username">Invalid Phone number</AvFeedback>
                                                    </div>
                                                </AvGroup>
                                                <AvGroup className="group-wrapper-2">
                                                    <div className="field-wrapper">
                                                        <AvInput onChange={this.changePassword} type={this.state.passwordHidden ? "password" : "text"} name="password" id="password" placeholder="Password" required
                                                            errorMessage=""
                                                            validate={{
                                                                pattern: {value: '^(?=.*[0-9]).{6,16}$'}
                                                            }}
                                                            className="field"
                                                        />
                                                        {this.state.password != "" && this.state.password.search('^(?=.*[0-9]).{6,16}$') == 0 ? <div className={"check"} ><img src={checked} className="check-img"/></div> : null}
                                                        <button className="hide-show-btn" onClick={this.togglePassword}>{this.state.passwordHidden ? "Show" : "Hide"}</button>
                                                        <AvFeedback className="invalid-feedback">Please enter your password</AvFeedback>
                                                    </div>
                                                </AvGroup>
                                                {this.state.password != "" && this.state.password.search('^(?=.*[0-9]).{6,16}$') == 0 
                                                ? <AvGroup className="group-wrapper-2">
                                                        <div className="field-wrapper">
                                                            <AvInput onChange={this.changeConfirm} type={this.state.confirmHidden ? "password" : "text"} name="confirm" id="confirm" placeholder="Confirm Password" required
                                                                errorMessage=""
                                                                validate={{
                                                                    pattern: {value: '^(?=.*[0-9]).{6,16}$'}
                                                                }}
                                                                className="field"
                                                            />
                                                            {this.state.confirm != "" && this.state.confirm.search('^(?=.*[0-9]).{6,16}$') == 0 ? <div className={"check"} ><img src={checked} className="check-img"/></div> : null}
                                                            <button className="hide-show-btn" onClick={this.toggleConfirm}>{this.state.confirmHidden ? "Show" : "Hide"}</button>
                                                            <AvFeedback className="invalid-feedback">Please confirm your password</AvFeedback>
                                                        </div>
                                                    </AvGroup> 
                                                : null}
                                                <div className="submit-wrapper">     
                                                    <Button className="signup-btn" onClick={this.onValidSignup}>  SIGN UP </Button>
                                                </div>
                                            </AvForm>
                                        </div>
                                        <p className="already-have-account">Already have an account?&nbsp;&nbsp;<Link to="/page-login" >Login here</Link></p>
                                    </div>
                                </div>
                            : 
                                <div className="contract-rightside">
                                    <div className ="contract-wrapper">
                                        <div className="contract-logo">
                                            <p className="wrapper">
                                                <Link to="/index">
                                                    Simple<span className="doc">Doc</span>.customer
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="middle-contract-wrapper">
                                            <div className="custom-text">
                                                Before started, please read carefully <br /> our Terms and Conditions
                                            </div>
                                            <div className="doc">
                                                <div className="wrapper">
                                                    <PageContract />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="submit-wrapper">
                                            <div className="wrapper">
                                                <p className="already-have-account">Already have an account?&nbsp;&nbsp;<Link to="/page-login" className="custome-text">Login here</Link></p>
                                            </div>
                                            <div className="agree-wrapper">
                                                <Button className="agree-btn" onClick={this.onValidContract}>  ACCEPT </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Container>
                    </section>
                : <PageSMS history={this.props.history}/>}
            </React.Fragment>
        );
    }
}

export default connect(
    state => ({me: state.me}),
    dispatch => channingActions({}, dispatch, bindMeActions, bindToastNotificationActions)
)(withRouter(PageSignup))