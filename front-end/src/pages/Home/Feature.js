// React basic and bootstrap
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import './scss/feature.scss';

import Avatar from '../../SimpleDocs.images/Home/Feature/Avatar.svg'
import Logo from '../../SimpleDocs.images/Home/Feature/Symbol.svg'

class Feature extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <div id= "featurecomp" name="feature"  data-aos="fade-up" data-aos-duration="1000" >
                    <div className = "main-table">
                        <div className="paper-background"></div>
                        <div className = "sub-table">
                            <img src={Avatar} className="avatar"  data-aos="fade-up" data-aos-duration="1000"/> 

                            <h1 className="main-title"  data-aos="fade-up" data-aos-duration="1000">Customer</h1>
                            <div className="line"  data-aos="fade-up" data-aos-duration="1000"></div>
                            <h1 className="content"  data-aos="fade-up" data-aos-duration="1000">TIME SAVING</h1>
                            <h1 className="content"  data-aos="fade-up" data-aos-duration="1000">PRINTING COST</h1>
                            <h1 className="content"  data-aos="fade-up" data-aos-duration="1000">DATA SAFETY</h1>

                        </div>
                        <div className="paper-table">
                            <div className="feature-section-1">
                                <h1 className="feature-title" data-aos="fade-up" data-aos-duration="500">FEATURES</h1>
                            </div>
                            <div className="paper">
                                <div className="wrapper" data-aos="fade-up" data-aos-duration="1000">
                                    <div className="logo-wrapper">
                                        <h1 className="text-wrapper" data-aos="fade-up" data-aos-duration="1800">be inspired.</h1>
                                        <img src={Logo} className="paper-logo"/> 
                                    </div>
                                    <h1 className="normal-text">Hi there,</h1>
                                    <h1 className="normal-text">Thank you for passing our website.</h1>
                                    <h1 className="normal-text">Now just need to stay in one place, take a cup of tea, click on the screen and listen to our story, and get deliver to your destination as simplest as possible.</h1>
                                    <h1 className="normal-text">After all of the hard-working days, the real question is: </h1>
                                    <div className="question-text-wrapper">
                                        <h1 className="question-text">What are we helping you?</h1>
                                    </div>
                                    <h1 className="normal-text">Sincerely,</h1>
                                    <div>
                                        <h1 className="normal-text">(signed)</h1>
                                        <h1 className="normal-text">SimpleDoc.</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = "sub-table">
                            <img src={Avatar} className="avatar"  data-aos="fade-up" data-aos-duration="1000"/> 
                            <h1 className="main-title"  data-aos="fade-up" data-aos-duration="1000">Partner</h1>
                            <div className="line" data-aos="fade-up" data-aos-duration="1000"></div>
                            <h1 className="content" data-aos="fade-up" data-aos-duration="1000">MARKET</h1>
                            <h1 className="content" data-aos="fade-up" data-aos-duration="1000">JOB STIMULATION</h1>
                            <h1 className="content" data-aos="fade-up" data-aos-duration="1000">UNIFORM LABOR</h1>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Feature;
