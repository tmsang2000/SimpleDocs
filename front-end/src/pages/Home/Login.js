// React Basic and Bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import './scss/login.scss';
import { withRouter } from 'react-router-dom';

// import images
import imgBackground from '../../SimpleDocs.images/Login/background.svg';
import Logo from '../../SimpleDocs.images/Home/Introduction/Logo.svg'
import googleIcon from '../../SimpleDocs.images/Login/google-icon.svg';
import AvFeedback from 'availity-reactstrap-validation/lib/AvFeedback';
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindMeActions } from '../../redux/actions/me';
import { bindLoadingActions } from '../../redux/actions/loading';

class PageLogin extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hidden: true,
          username: "abc",
          password: "123",
        };
        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }

    onValidSubmit = () => {
        const {meActions, loadingActions} = this.props;
        const {username} = this.state;
        meActions.login(username).then(res => {
            console.log("Log in success")
            //console.log(this.props)
            this.setState({username: '', password: ''})   
            this.props.history.push("./customer") 
        }).catch(err => {
            console.log("Err: ", err)
            console.log("Loading Fail")
        })
    }

    changeUsername(event) {
        this.setState({
            username: event.target.value
        })
    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    // componentDidUpdate() {
    //     console.log(this);
    // }

    render() {
        let username = this.state.username;
        let password = this.state.password;
        return (
            <div id="login-cont">
                <div className="login-leftbg">   
                    <img src={imgBackground} className="img-login" alt=""/>
                </div>
                <div className="login-form">
                    <div className ="login-wrapper">
                        <div className="login-logo-wrapper">
                            <Link className="login-logo" to="/index"><img src={Logo}/></Link>
                        </div>
                        <AvForm className="input-wrapper" onValidSubmit={this.onValidSubmit}>
                            <AvGroup className="group-wrapper-1">
                                <div className="field-wrapper">
                                    <Label className="label">VN</Label>
                                    <AvInput onChange={this.changeUsername.bind(this)} type="text" name="username" id="username" placeholder="Phone number / Email" required
                                        errorMessage=""
                                        validate={{
                                            required: {value: true, errorMessage: "Please enter your Phone number / Email"},
                                            // pattern: {value: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$', errorMessage: 'E-Mail is not valid!'},
                                        }}
                                        className="field"
                                    />
                                    <AvFeedback className="invalid-feedback">Please enter your Phone number / Email</AvFeedback>
                                </div>
                            </AvGroup>
                            <AvGroup className="group-wrapper-2">
                                <div className="field-wrapper">
                                    <AvInput onChange={this.changePassword.bind(this)} type={this.state.hidden ? "password" : "text"} name="password" id="password" placeholder="Password" required
                                        errorMessage=""
                                        validate={{
                                            required: {value: true, errorMessage: "Please enter Password"},
                                            minLength: {value: 6, errorMessage: 'Your password must be between 6 and 8 characters'},
                                            maxLength: {value: 16, errorMessage: 'Your password must be between 6 and 8 characters'}
                                        }}
                                        className="field"
                                    />
                                    <button className="hide-show-btn" onClick={this.toggleShow}>{this.state.hidden ? "Show" : "Hide"}</button>
                                    <AvFeedback className="invalid-feedback">Please enter your password</AvFeedback>
                                </div>
                            </AvGroup>
                            <div className="submit-wrapper">     
                                <p className="forgot-pw"><Link to="/page-login" >forgot password</Link></p>
                                <Button className="login-btn">  LOGIN </Button>
                            </div>
                        </AvForm>
                        <div className="bottom-wrapper">
                            <div className="google-login">
                                <p className="text"> 
                                    or login with 
                                </p>
                                <img src={googleIcon} className="google-icon"/> 
                                <p className="google-text">
                                    Google
                                </p>
                            </div>
                        </div>    
                    </div>
                </div>      
            </div>
        );
    }
}
export default connect(
    state => ({me: state.me}),
    dispatch => channingActions({}, dispatch, bindMeActions, bindLoadingActions)
  )(withRouter(PageLogin))