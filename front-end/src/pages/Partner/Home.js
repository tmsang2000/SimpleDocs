// // React basic and bootstrap
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
// // import { Document, Page } from "react-pdf";

// import './scss/home.scss';

// import CusLogo from '../../SimpleDocs.images/Customer/cus-logo.svg'
// import Process from '../../SimpleDocs.images/Customer/Order/process-s.svg'
// import Complete from '../../SimpleDocs.images/Customer/Order/complete.svg'

// class Home extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             process: 1,
//             numPages: null, 
//             pageNumber: 1 
//         }
//     }
//     onDocumentLoadSuccess = ({ numPages }) => {
//         this.setState({ numPages });
//       };
    
//       goToPrevPage = () =>
//         this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
//       goToNextPage = () =>
//         this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    
//     render() {
//         const {process} = this.state;
//         const { pageNumber, numPages } = this.state;

//         return (
//             <div className="container" id= "customerhome"  >
//                 <div className = "section-1">
//                     <div className = "sc1">
//                         <img src={CusLogo} className="cus-logo"/>
//                     </div>
//                     <div className = "sc2">
//                         <p>Available Orders</p>
//                         <div className ="order-n">
//                             <img src={Process} className="discuss-i"/>
//                             <Button onClick = {() => {
//                                 this.setState(prev => ({process: prev.process+1}))
//                                 if(process == 3) {

//                                 }
//                                 }} className="login-btn" >{process == 1 ? "Order Now" : process == 2 ? "PRINT NOW" : "COMPELTE"}</Button>
                
//                         </div>
//                     </div>
//                 </div>
//                 <div className = "section-2">
//                     <img src={Complete} className="discuss-i"/>
//                 </div>
//             </div>
//         );
//     }
// }
// export default Home;
