// // React Basic and Bootstrap
// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
// import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
// import './customer.scss';

// // import images

// import Home from './Home';
// import OrderScreen from './Order';

// import Sample from '../../SimpleDocs.images/Customer/sampleavt.svg'
// import Order from '../../SimpleDocs.images/Customer/order-icon.svg'
// import Earn from '../../SimpleDocs.images/Customer/earn-icon.svg'
// import Discount from '../../SimpleDocs.images/Customer/discount.svg'
// import Event from '../../SimpleDocs.images/Customer/event.svg'
// import Add from '../../SimpleDocs.images/Customer/add.svg'
// import Logo from '../../SimpleDocs.images/Customer/logo.svg'
// import Dashboard from '../../SimpleDocs.images/Customer/Order/dashboard.svg'
// import DashboardN from '../../SimpleDocs.images/Customer/Order/dashboard-n.svg'
// import OrderC from '../../SimpleDocs.images/Customer/Order/order-color.svg'
// import OrderN from '../../SimpleDocs.images/Customer/Order/order-n.svg'
// import Setting from '../../SimpleDocs.images/Customer/Order/setting.svg'
// import Message from '../../SimpleDocs.images/Customer/Order/message.svg'


// class PageSignup extends Component {
//     constructor(props) {
//         super(props);
    
//         this.state = {
//           hidden: true,
//           dashboard: true,
//           order: false,
//           process: 1,
//         };
//         this.toggleShow = this.toggleShow.bind(this);
//       }
//     toggleShow() {
//         this.setState({ hidden: !this.state.hidden });
//       }
//     render() {
//         const {dashboard, order, process} = this.state;
//         return (
//             <React.Fragment>
//                 <div className = "cus-cont">
//                     <div className ="left-menu-cont">
//                         <div className="sec1">
//                             <img src={Logo} className="cus-logo"/>
//                         </div>
//                         <div className="sec2">
//                                 <div onClick = {() => {this.setState({dashboard: true, order: false})}} className={dashboard ? "item" : "item-un"}><img src={dashboard ? Dashboard : DashboardN}/><p>Dashboard</p></div>
//                                 <div onClick = {() => {this.setState({dashboard: false, order: true})}} className={order ? "item" : "item-un"}><img src={order ? OrderN : OrderC}/><p>Orders</p></div>
//                                 <div className="item-un"><img src={Message}/><p>Messages</p></div>
//                                 <div className="item-un"><img src={Setting}/><p>Settings</p></div>

//                         </div>
//                     </div>
//                     <div className = "middle-cont">
//                         {dashboard == true ? (<Home></Home>) :
//                             <OrderScreen></OrderScreen>}
//                     </div>
//                     <div className = "right-menu-cont">
//                         <div className = "sec1">
//                             <div className="avatar">
//                                 <img src={Sample} className="cus-logo"/>
//                             </div>
//                             <div className="info">
//                                 <h1>Đặng Việt Trung Nhân</h1>
//                                 <p>Ho Chi Minh City, Viet Nam</p>
//                             </div>
//                         </div>
//                         <div className = "sec2">
//                             <div className="order">
//                                 <div className="icon">
//                                     <img src={Order}></img>
//                                 </div>
//                                 <div className="content">
//                                     <p>Ordering Times</p>
//                                     <h1>12</h1>
//                                 </div>
//                             </div>
//                             <div className="ex"></div>
//                             <div className="earn">
//                                 <div className="icon">
//                                     <img src={Earn}></img>
//                                 </div>
//                                 <div className="content">
//                                     <p>Earnings Report</p>
//                                     <h1>92,000 vnđ</h1>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className = "sec3">
//                             {/* <div className="title">
//                                 <p>Best deal for you</p>
//                             </div>
//                             <div className="promo-wrapper">
//                                 <div className = "promotion">
//                                     <div className="img">
//                                         <img src={Discount}></img>
//                                     </div>
//                                     <div className="content">
//                                         <p>Newbie Discount</p>
//                                     </div>

//                                 </div>
//                                 <div className = "promotion">
//                                     <div className="img">
//                                         <img src={Event}></img>
//                                     </div>
//                                     <div className="content">
//                                         <p>Weekly Event</p>
//                                     </div>
//                                 </div>
//                                 <div className = "promotion">
//                                     <div className="img">
//                                         <img src={Add}></img>
//                                     </div>
//                                     <div className="content">
//                                         <p>More deals</p>
//                                     </div>
//                                 </div>
//                             </div> */}
//                         </div>
//                     </div>
//                 </div>
//             </React.Fragment>
//         );
//     }
// }
// export default PageSignup;