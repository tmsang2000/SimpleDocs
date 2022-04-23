// React basic and bootstrap
import React, { Component } from 'react';
import { Row } from 'reactstrap';
import Typist from 'react-typist';
import { Link } from 'react-router-dom';
import './scss/introduction.scss';

// Import  Images 
import User from '../../SimpleDocs.images/Home/Introduction/User.svg';
import GreenRocket from '../../SimpleDocs.images/Home/Introduction/GreenRocket.svg'
import IneedPrinting from '../../SimpleDocs.images/Home/Introduction/IneedPrinting.svg'
import OrangeRocket from '../../SimpleDocs.images/Home/Introduction/OrangeRocket.svg'
import Partner from '../../SimpleDocs.images/Home/Introduction/Partner.svg'
import Symbol from '../../SimpleDocs.images/Home/Introduction/Symbol.svg'
import Tree from '../../SimpleDocs.images/Home/Introduction/Tree.svg'
import WhitePaper from '../../SimpleDocs.images/Home/Introduction/WhitePaper.svg'
import YellowPaper from '../../SimpleDocs.images/Home/Introduction/YellowPaper.svg'
import Subtract from '../../SimpleDocs.images/Home/Introduction/Subtract.svg'

class Introduction extends Component {

    constructor(props) {
        super(props);
        this.state = {
            count : 1
        }
    }

    render() {
        return (
            <React.Fragment>
                <div id="introductioncomp" >
                    <div className="left-wrapper">
                        <h1 className="title">
                            {this.state.count ? (<Typist avgTypingDelay={100} onTypingDone={() => this.setState({count: 0})}>
                                PRINTING <br /> 
                                HADN'T <br />
                                BEEN <br /> 
                                THAT&nbsp;
                                <span className="text-custom">EASY!</span> 
                                <Typist.Delay ms={3000} />
                            </Typist>) : this.setState({count: 1}) }
                        </h1>
                    </div>
                    <div className="right-wrapper">
                        <div className="image-wrapper"> 
                            <div className="user">
                                <img src={User} className="userImage"/> 
                                <img src={Tree} className="tree"/> 
                                <img src={IneedPrinting} className="iNeedPrinting"/>    
                            </div>
                            <div className="partner">
                                <img src={Partner} className="partnerImage"/> 
                            </div>
                            <div className ="rectangle">
                                <div className="blueRectangle"/>
                                <div className="whiteRectangle"/>
                                <img src={Symbol} className="symbol"/> 
                            </div>

                            <div className="subtract">
                                <img src={Subtract} className="subtractImage"/>
                                <div className="paper1">
                                    <img src={WhitePaper} className="whitePaper1"/>  
                                    <img src={YellowPaper} className="yellowPaper1"/>  
                                </div>
                                <div className="paper2">
                                    <img src={WhitePaper} className="whitePaper2"/>  
                                    <img src={YellowPaper} className="yellowPaper2"/>  
                                </div>
                                <img src={OrangeRocket} className="orangeRocket"/>
                                <img src={GreenRocket} className="greenRocket"/> 
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Introduction;

