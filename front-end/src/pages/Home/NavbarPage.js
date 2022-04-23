import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-awesome-modal';

import { Container } from "reactstrap";
import ScrollspyNav from "./scrollSpy";
import Logo from '../../SimpleDocs.images/Home/Introduction/Logo.svg'
import Login from './Login'

class NavbarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            navItems : [
                { id: 1 , idnm : "introduction", navheading: "Introduction" },
                { id: 2 , idnm : "features", navheading: "Features" },
                { id: 2 , idnm : "contact", navheading: "Become a Partner" },

                ],
                isOpen : false, 
                visible : false
        };
        this.toggleLine = this.toggleLine.bind(this);
    }

    toggleLine() {
        this.setState(prevState => ({  isOpen: !prevState.isOpen }));
    }
    
    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }
    render() {
        //Store all Navigationbar Id into TargetID variable(Used for Scrollspy)
        console.log("Nav: ", this.props)
        
        let targetId = this.state.navItems.map((item) => {
            return(
                item.idnm
            )
        });
        return (

            <React.Fragment>
                <Modal visible={this.state.visible} position="absolute" width="60%" height="60%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <Login/>
                </Modal>
                <header id="topnav">
                    <Link className="logo-wrapper" to="/index"><img src={Logo}/></Link>
                    <ScrollspyNav
                        scrollTargetIds={targetId}
                        scrollDuration="800"
                        headerBackground="false"
                        activeNavClass="active"
                        className="navigation"
                    >
                        <ul className="navigation-menu">
                            {this.state.navItems.map((item, key) => (
                                <li key={key} className="has-submenu">
                                    <a href={"#" + item.idnm} > {item.navheading}</a>
                                </li>
                            ))} 
                        </ul>
                    </ScrollspyNav>

                    <div className="button" >
                        <Link onClick = {() => this.openModal()} className="btn-login">LOGIN</Link>
                        <Link to="/signup" className="btn-signup">
                            SIGN UP
                        </Link>
                    </div>    
                </header>
            </React.Fragment>
        );
    }
}

export default NavbarPage;