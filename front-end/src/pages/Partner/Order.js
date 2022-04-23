// // React basic and bootstrap
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
// import './scss/order.scss';
// import Typist from 'react-typist';
// import Modal from 'react-awesome-modal';
// import DatePicker from "react-datepicker";

// import Printer from '../../SimpleDocs.images/Customer/Order/3d-printer.svg';
// import Photo from '../../SimpleDocs.images/Customer/Order/photo.svg';
// import Document from '../../SimpleDocs.images/Customer/Order/document.svg';
// import Paper from '../../SimpleDocs.images/Customer/Order/paper.svg';
// import UploadFile from '../../SimpleDocs.images/Customer/Order/upload-file.svg';
// import Waiting from '../../SimpleDocs.images/Customer/Order/waiting.svg';
// import UploadFinish from '../../SimpleDocs.images/Customer/Order/finish-upload.svg';

// import RightArrow from '../../SimpleDocs.images/Customer/Order/Arrow-Right.svg';
// import LeftArrow from '../../SimpleDocs.images/Customer/Order/Arrow-Left.svg';
// import UpArrow from '../../SimpleDocs.images/Customer/Order/Arrow-up.svg';
// import DownArrow from '../../SimpleDocs.images/Customer/Order/Arrow-down.svg';
// import RightArrow2 from '../../SimpleDocs.images/Customer/Order/Arrow-Right-2.svg';
// import LeftArrow2 from '../../SimpleDocs.images/Customer/Order/Arrow-Left-2.svg';
// import Logo from '../../SimpleDocs.images/Customer/Order/logo.svg';
// import Wait from '../../SimpleDocs.images/Customer/Order/wait.svg';
// import Payment from '../../SimpleDocs.images/Customer/Order/payment.jpg';
// import Momo from '../../SimpleDocs.images/Customer/Order/momo.svg';
// import PaymentSuc from '../../SimpleDocs.images/Customer/Order/pay-suc.svg';
// import Choose1 from '../../SimpleDocs.images/Customer/Order/choose1.svg';
// import Choose2 from '../../SimpleDocs.images/Customer/Order/choose2.svg';
// import ChooseT from '../../SimpleDocs.images/Customer/Order/chooset.svg';
// import Discount from '../../SimpleDocs.images/Customer/Order/discount.svg';


// class Order extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             choose: "document",
//             state: 4,
//             properties: {
//                 size: 1,
//                 TwoSide: false,
//                 Color: false,
//             },
//             picker: "size",
//             size: ["A0","A4","A5","A6"],
//             stateUpload: 1,
//             selectedFile: null,
//             count : -1,
//             loadingP: 0,
//             isChoose: 0,
//         }
//     }

//     onFileChange = event => { 
     
//         // Update the state 
//         this.setState({ selectedFile: 1, count: 0, loadingP: 1, stateUpload: 2 }); 
//         console.log("Onchange", this.state);
//       }; 
//       openModal() {
//         this.setState({
//             visible : true
//         });
//     }

//     closeModal() {
//         this.setState({
//             visible : false
//         });
//     }

//     render() {
//         const {choose, state, properties, size, picker, stateUpload, isChoose} = this.state;
//         return (
//             <div className="container" id= "orderscreen"  >
//                 <div className="title">
//                     <img src={Logo}></img>
//                 </div>
//                 <div className="main">
//                     <div className = "section-1">
//                     </div>
//                     <div className = "section-2">
                        
//                         <div className="right">
//                             {state != 1 ? (<div onClick = {() => {this.setState({state: state - 1})}} className="btn">
//                                 <img src={LeftArrow}></img>
//                             </div>) : null}

//                         </div>
//                         {state == 1 ? (<div className="middle-1">
//                             <p>Choose your product</p>
//                             <img src={choose == "photo" ? Photo : choose == "document" ? Document :Printer}></img>
//                             <div className="choose">
//                                 <Button onClick = {() => this.setState({choose: "photo"})} className={choose == "photo" ? "item-active" : "item" }>
//                                     <p>PHOTO</p>
//                                 </Button>
//                                 <Button onClick = {() => this.setState({choose: "document"})} className={choose == "document" ? "item-active" : "item" }>
//                                     <p>DOCUMENT</p>
//                                 </Button>
//                                 <Button onClick = {() => this.setState({choose: "3dprint"})} className={choose == "3dprint" ? "item-active" : "item" }>
//                                     <p>3D PRINT</p>
//                                 </Button>
//                             </div>
//                         </div>) : null}
//                         {state == 2 ? (
//                             <div className="middle-2">
//                                 <div className="left-2">
//                                     <p>Choose properties</p>
//                                     <div className="image-2"><img src={Paper}></img></div>
//                                     <div className = "choose-type">
//                                         <div className="right">
//                                             <div onClick = {() => {
//                                                 if (picker == "color") {
//                                                     this.setState(prevState => ({properties: {
//                                                         ...prevState.properties,
//                                                         Color: !prevState.properties.Color
//                                                     }}))
//                                                     return;
//                                                 }
//                                                 if (picker == "twoside") {
//                                                     this.setState(prevState => ({properties: {
//                                                         ...prevState.properties,
//                                                         TwoSide: !prevState.properties.TwoSide
//                                                     }}))
//                                                     return;
//                                                 }
//                                                 if (properties.size == 0) {
//                                                     this.setState(prevState => ({properties: {
//                                                         ...prevState.properties,
//                                                         size: (size.length - 1)
//                                                     }}))
//                                                     return;
//                                                 }
//                                                 this.setState(prevState => ({properties: {
//                                                 ...prevState.properties,
//                                                 size: prevState.properties.size - 1
//                                             }}))}} className="btn">
//                                                 <img src={LeftArrow2}></img>
//                                             </div>

//                                         </div>
//                                         <div className ="middle">
//                                             <p>{picker == "twoside" ? (properties.TwoSide ? "YES" : "NO") : picker == "color" ? (properties.Color ? "YES" : "NO") : size[properties.size]}</p>
//                                         </div>
//                                         <div className="right">
//                                         <div onClick = {() => {
//                                              if (picker == "color") {
//                                                 this.setState(prevState => ({properties: {
//                                                     ...prevState.properties,
//                                                     Color: !prevState.properties.Color
//                                                 }}))
//                                                 return;
//                                             }
//                                             if (picker == "twoside") {
//                                                 this.setState(prevState => ({properties: {
//                                                     ...prevState.properties,
//                                                     TwoSide: !prevState.properties.TwoSide
//                                                 }}))
//                                                 return;
//                                             }
//                                             if (properties.size == size.length - 1) {
//                                                 this.setState(prevState => ({properties: {
//                                                     ...prevState.properties,
//                                                     size: 0
//                                                 }}))
//                                                 return;
//                                             }
//                                             this.setState(prevState => ({properties: {
//                                                 ...prevState.properties,
//                                                 size: prevState.properties.size + 1
//                                             }}))}} className="btn">                                                
//                                             <img src={RightArrow2}></img>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="right-2">
//                                     <div className="choose">
//                                         <img src={UpArrow}></img>
//                                         <div className="wrapper">
//                                             <Button onClick = {() => this.setState({picker: "size"})} className="item" >
//                                                 <p>SIZE</p>
//                                             </Button>
//                                             <div className="value">
//                                                     {size[properties.size]}
//                                             </div>
//                                         </div>
//                                         <div className="wrapper">
//                                             <Button onClick = {() => this.setState({picker: "twoside"})} className="item" >
//                                                 <p>2-SIDED</p>
//                                             </Button>
//                                             <div className="value">
//                                                     {properties.TwoSide ? "YES" : "NO"}
//                                             </div>
//                                         </div>
//                                         <div className="wrapper">
//                                             <Button onClick = {() => this.setState({picker: "color"})} className="item" >
//                                                 <p>COLOR</p>
//                                             </Button>
//                                             <div className="value">
//                                                 <p>{properties.Color ? "YES" : "NO"}</p>
//                                             </div>
//                                         </div>
//                                         <img src={DownArrow}></img>

//                                     </div>
//                                 </div>
//                             </div>) 
//                         : null}
//                         {
//                             state == 3 ? (
//                             <div className="middle-3">
//                                 <p>Upload your files</p>
//                                 <img onClick = {() => {this.setState({stateUpload:stateUpload+1})}} src={stateUpload == 1 ? UploadFile : stateUpload == 2 ? Waiting :UploadFinish}></img>
//                                 <input type="file" onChange={() => this.onFileChange()}></input>
                            
//                                 {this.state.selectedFile == null ? <p className = "state">UPLOAD FILE</p> : null }
//                                 {this.state.loadingP == 0 ? null : this.state.count > 80 ? this.setState({count: 100, loadingP : 0, stateUpload: 3}) : this.state.count % 2 ? (<Typist cursor={{element: ""}} avgTypingDelay={40} onTypingDone={() => this.setState(prev => ({count: prev.count + 7}))}>
//                                     <p className = "state">CONVERSE INTO PDF...</p></Typist>) : this.setState(prev => ({count: prev.count + 9})) }
//                                 {this.state.count == -1 ? null : <p className="state">{this.state.count}%</p>}
//                                 {this.state.stateUpload != 3 ? null : <p className="state">COMPLETED</p>}

//                                 <div className="choose">

//                                     <img src={Wait}></img>
//                                 </div>
//                             </div>
//                             ) : null
//                         }
//                         {
//                             state == 4 ? (
//                                 isChoose == 2 ? 
//                                     (
//                                     <div className="middle-4">
//                                     <p>Choose time to get</p>
//                                     <div className="choose-1">
//                                         <div className="wrapper" onClick = {() => this.openDatePicker()}>
//                                             <p>at</p>
//                                             <div className ="item"><p>0</p></div>
//                                             <div className ="item"><p>9</p></div>
//                                             <p>:</p>
//                                             <div className ="item"><p>0</p></div>
//                                             <div className ="item"><p>0</p></div>
//                                         </div>
//                                         <div className="wrapper">
//                                             <p>on</p>
//                                             <div className ="item"><p>3</p></div>
//                                             <div className ="item"><p>0</p></div>
//                                             <p>/</p>
//                                             <div className ="item"><p>0</p></div>
//                                             <div className ="item"><p>5</p></div>

//                                         </div>
//                                     </div></div>) :
//                                 (
//                                     <div className="middle-4">
//                                 <p>Choose your partner</p>
//                                 <div className="choose">
//                                     <img onClick={() => this.setState({isChoose: isChoose + 1})} src={isChoose ? Choose2 : Choose1}></img>
//                                 </div>
//                                 </div>)
//                             ) : null
//                         }
//                         {
//                             state == 5 ? (
//                             <div className="middle-5">
//                                 <div className="choose">
//                                     <img src={Payment}></img>
//                                     <img onClick={()=>this.openModal()} src={Momo}></img>
//                                 </div>
//                                 <Modal  styles= {{backgroundColor: 'rgba(0,0,0,0)', boxShadow:'rgba(0,0,0,0)'}} className ="success" id = "model"visible={this.state.visible} width="60%" height="60%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
//                                     <img id="success-img" src={PaymentSuc}></img>
//                                 </Modal>
//                             </div>
//                             ) : null
//                         }
//                         <div className="right">
//                             <div onClick = {() => {this.setState({state: state + 1})}} className="btn">
//                                 <img src={RightArrow}></img>
//                             </div>
//                         </div>
                      
//                     </div>
//                     <div className = "section-3">
//                         <div className="nav">
//                             <div className={state == 1 ? "item-active" : "item"}></div>
//                             <div className={state == 2 ? "item-active" : "item"}></div>
//                             <div className={state == 3 ? "item-active" : "item"}></div>
//                             <div className={state == 4 ? "item-active" : "item"}></div>
//                             <div className={state == 5 ? "item-active" : "item"}></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
// export default Order;
