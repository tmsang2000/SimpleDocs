import React, { Component } from "react";
import Logo from "../../SimpleDocs.images/Home/Contact/Logo.svg";
import Home from "../../SimpleDocs.images/Home/Contact/home.svg";
import Mobile from "../../SimpleDocs.images/Home/Contact/Mobile.svg";
import Email from "../../SimpleDocs.images/Home/Contact/email.svg";
import { Link } from "react-router-dom";

import "./scss/contact.scss";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      telephone: "",
      email: "",
      message: "",
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onTelephoneChange = this.onTelephoneChange.bind(this);
    this.onMailChange = this.onMailChange.bind(this);
    this.onMessageChange = this.onMessageChange.bind(this);
    this.onValidSubmit = this.onValidSubmit.bind(this);
  }

  onNameChange(event) {
    this.setState({
      firstName: event.target.value,
    })
  }

  onTelephoneChange(event) {
    this.setState({
      telephone: event.target.value,
    })
  }

  onMailChange(event) {
    this.setState({
      email: event.target.value,
    })
  }

  onMessageChange(event) {
    this.setState({
      message: event.target.value,
    })
  }

  onValidSubmit(event) {
    event.preventDefault();
    console.log("Contact state: " + this.state.message);
  }

  render() {
    return (
      <React.Fragment>
        <div id="contactcomp">
          <div className="contact-table">
            <div className ="upperside">
              <div className="slogan">
                <h1>Let's get in touch</h1>
              </div>
            </div>
            <div className="lowerside">
              <div className="wrapper">
                  <div className="logo-wrapper">
                    <img src={Logo} className="contact-logo" />
                  </div>
                  <div className="middle-wrapper">
                    <h1>Apparently we had reached a great height in the atmosphere</h1>
                  </div>
                  <div className="bottom-wrapper">
                    <h1>Privacy Policy</h1>
                    <h1>Terms & Conditions</h1>
                    <h2>@ 2020 SimpleDoc.vn</h2>
                  </div>
              </div>
            </div> 
            <div className="box">
              <div className="wrapper">
                <div className="left-wrapper">
                    <div className="title-wrapper">
                      <h2 className="left-title"> 
                        Want to be a <br/>partner?
                      </h2>
                    </div>
                    <div className="content-wrapper">
                      <div className="left-content">
                        <img src={Home} className="left-address-symbol" />
                        <h4 className="left-subtitle">ADDRESS</h4>
                        <p className="left-subcontent">
                          268 Ly Thuong Kiet St., Dist.10, <br /> Ho Chi Minh City, Vietnam
                        </p>
                      </div>
                      <div className="left-content">
                        <img src={Mobile} className="left-phone-symbol" />
                        <h4 className="left-subtitle">MOBILE</h4>
                        <p className="left-subcontent">(+84)8585858585</p>
                      </div>
                      <div className="left-content">
                        <img src={Email} className="left-mail-symbol" />
                        <h4 className="left-subtitle">EMAIL</h4>
                        <p className="left-subcontent">simpledocvn@gmail.com</p>
                      </div>
                    </div>
                    <div className="blank-wrapper"></div>
                </div>
                <div className="right-wrapper">
                  <div className="title-wrapper">
                    <h2 className="title">Send us a message</h2>
                  </div>
                  <form onClick={this.onValidSubmit} className="content-wrapper">
                    <div className="subtitle-wrapper">
                      <div className="input-wrapper">
                        <label for="name" className="subtitle"> First name:</label><br/>
                        <input onChange={this.onNameChange} type="text" value={this.state.firstName} id="name" className="input-text" placeholder="Your first name here"/> <br/>
                      </div>
                      <div className="input-wrapper">
                      <label for="telephone" className="subtitle">Telephone:</label><br/>
                      <input onChange={this.onTelephoneChange} type="text" id="telephone" className="input-text" placeholder="Place your phone here"/> <br/>
                      </div>
                      <div className="input-wrapper">
                      <label for="email" className="subtitle">Email:</label><br/>
                      <input onChange={this.onMailChange} type="text" id="email" className="input-text" placeholder="Your mail here"/><br/>
                      </div>
                      <div className="text-area-wrapper">
                        <label for="message" className="subtitle">Message:</label><br/>
                        <textarea onChange={this.onMessageChange} rows="3" cols="21" placeholder="I want to be a partner" className="text-area"/><br/>
                      </div>
                    </div>
                    <div className="last-column">
                      <input type="submit" value="Submit" className="submit-button"/>
                      <p className="notice">don't worry your <br/> data is safe with us </p>
                    </div>
                  </form> 
                  <div className="blank-wrapper"></div>      
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Contact;