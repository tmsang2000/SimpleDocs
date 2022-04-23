// React basic and bootstrap
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config'
import { Container, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap';
import './scss/order.scss';
import Typist from 'react-typist';
import Modal from 'react-awesome-modal';
import DatePicker from "react-datepicker";
import { listPrinter } from './data-example';

import Printer from '../../SimpleDocs.images/Customer/Order/3d-printer.svg';
import Photo from '../../SimpleDocs.images/Customer/Order/photo.svg';
import Document from '../../SimpleDocs.images/Customer/Order/document.svg';
import Paper from '../../SimpleDocs.images/Customer/Order/paper.svg';
import UploadFile from '../../SimpleDocs.images/Customer/Order/upload-file.svg';
import UploadFinish from '../../SimpleDocs.images/Customer/Order/finish-upload.svg';

import RightArrow from '../../SimpleDocs.images/Customer/Order/Arrow-Right.svg';
import DisableArrow from '../../SimpleDocs.images/Customer/Order/DisabledArrowRight.svg';
import Star from '../../SimpleDocs.images/Customer/Order/star.svg';
import PrinterImg from '../../SimpleDocs.images/Customer/Order/PrinterImg.svg';
import LeftArrow from '../../SimpleDocs.images/Customer/Order/Arrow-Left.svg';
import UpArrow from '../../SimpleDocs.images/Customer/Order/Arrow-up.svg';
import DownArrow from '../../SimpleDocs.images/Customer/Order/Arrow-down.svg';
import RightArrow2 from '../../SimpleDocs.images/Customer/Order/Arrow-Right-2.svg';
import LeftArrow2 from '../../SimpleDocs.images/Customer/Order/Arrow-Left-2.svg';
import Payment from '../../SimpleDocs.images/Customer/Order/payment.jpg';
import Momo from '../../SimpleDocs.images/Customer/Order/momo.svg';
import PaymentSuc from '../../SimpleDocs.images/Customer/Order/pay-suc.svg';
import Choose1 from '../../SimpleDocs.images/Customer/Order/choose1.svg';
import ChooseT from '../../SimpleDocs.images/Customer/Order/chooset.svg';
import Discount from '../../SimpleDocs.images/Customer/Order/discount.svg';
import SamplePDF from '../../SimpleDocs.images/Customer/Order/sample.png';
import RightA from '../../SimpleDocs.images/Customer/Order/right-a.svg';
import LeftA from '../../SimpleDocs.images/Customer/Order/left-a.svg';
import { bindDocumentActions } from '../../redux/actions/document';
import { connect } from 'react-redux'
import {channingActions} from '../../lib/helper'
import { bindPrinterActions } from '../../redux/actions/printer';
import { bindToastNotificationActions } from '../../redux/actions/notification';
import { bindLoadingActions } from '../../redux/actions/loading';
import { bindSwitchingActions } from '../../redux/actions/customer';
import loading from '../../redux/reducers/loading';
import Home from './Home';

const time = new Date()

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose: "document",
            state: 1,
            properties: {
                size: 1,
                TwoSide: false,
                Color: false,   
            },
            picker: "size",
            size: ["A0","A4","A5","A6"],
            fileData: null,
            filePath: "",
            fileSource: "",
            hour1: time.toString()[16],
            hour2: time.toString()[17],
            minute1: time.toString()[19],
            minute2: time.toString()[20],
            date1: time.toString()[8],
            date2: time.toString()[9],
            month1: this.getFormattedDate()[0],
            month2: this.getFormattedDate()[1],
            printer: null,
            document: null,
            printerType: "location",
            printerLocation: "university",
            lat: '',
            lng: '',
        }
    }

    componentDidMount() {
        this.getLocation();
    }

    getFormattedDate = () => {
        let date = time;
        var year = date.getFullYear();

        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        return month + '/' + day + '/' + year;
    }

    convertToMiliseconds = () => {
        const { date1, date2, month1, month2, hour1, hour2, minute1, minute2} = this.state;
        const str = date1 + date2 + "/" + month1 + month2 + "/2020" + " " + hour1 + hour2 + ":" + minute1 + minute2;
        const changedDate = str.replace(/(..)\/(..)\/(....) (..):(..)/, '$3-$2-$1 $4:$5')
        const date = new Date(changedDate)
        return date.getTime();
    }

    getLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.geoSuccess, () => {alert("Geocoder failed.")});
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    geoSuccess = (position) => {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        this.setState({
            lat: lat,
            lng: lng,
        })
    }

    onFileChange = (event) => { 
        // Update the state
        const fileData = event.target.files[0];
        this.setState({fileData: event.target.files[0], filePath: fileData.name }); 
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

    renderOrder1 = () => {
        const {choose} = this.state;
        return (
            <div id="order1-cont">
                <div className="middle-1">
                    <div className="choose-text">
                        <p>Choose your product</p>
                    </div> 
                    <div className="img-wrapper">
                        <img src={choose == "photo" ? Photo : choose == "document" ? Document : Printer} className={choose == "photo" ? "in-active-img" : choose == "document" ? "" : "in-active-img"}/>
                        {choose == "photo" || choose == "3dprint" ? (
                            <div className="comming-soon">
                                <p>Comming soon</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="choose">
                        <Button onClick = {() => this.setState({choose: "photo"})} className={choose == "photo" ? "in-active in-available item" : "in-available item" }>
                            <p>PHOTO</p>
                        </Button>
                        <Button onClick = {() => this.setState({choose: "document"})} className={choose == "document" ? "active available item" : "available item" }>
                            <p>DOCUMENT</p>
                        </Button>
                        <Button onClick = {() => this.setState({choose: "3dprint"})} className={choose == "3dprint" ? "in-active in-available item" : "in-available item" }>
                            <p>3D PRINT</p>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    renderOrder2 = () => {
        const {properties, size, picker} = this.state;
        return (
            <div id="order2-cont">
                <div className="middle-2">
                    <div className="left-2">
                        <div className="choose-text">
                            <p>Choose properties</p>
                        </div>
                        <div className="image-2"><img src={Paper}></img></div>
                        <div className = "choose-type">
                            <div className="arrow left-arrow">
                                <img src={LeftArrow2} onClick = {() => {
                                    if (picker == "color") {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            Color: !prevState.properties.Color
                                        }}))
                                        return;
                                    }
                                    if (picker == "2side") {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            TwoSide: !prevState.properties.TwoSide
                                        }}))
                                        return;
                                    }
                                    if (properties.size == 0) {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            size: (size.length - 1)
                                        }}))
                                        return;
                                    }
                                    this.setState(prevState => ({properties: {
                                    ...prevState.properties,
                                    size: prevState.properties.size - 1
                                }}))}} className="left-arrow" />

                            </div>
                            <div className ="middle">
                                <p>{(picker == "2side") ? (properties.TwoSide ? "YES" : "NO") : (picker == "color") ? (properties.Color ? "YES" : "NO") : size[properties.size]}</p>
                            </div>
                            <div className="arrow right-arrow">
                                <img src={RightArrow2} onClick = {() => {
                                    if (picker == "color") {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            Color: !prevState.properties.Color
                                        }}))
                                        return;
                                    }
                                    if (picker == "2side") {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            TwoSide: !prevState.properties.TwoSide
                                        }}))
                                        return;
                                    }
                                    if (properties.size == size.length - 1) {
                                        this.setState(prevState => ({properties: {
                                            ...prevState.properties,
                                            size: 0
                                        }}))
                                        return;
                                    }
                                    this.setState(prevState => ({properties: {
                                        ...prevState.properties,
                                        size: prevState.properties.size + 1
                                    }}))}
                                } />                                                
                            </div>
                        </div>
                    </div>
                    <div className="right-2">
                        <div className="img-wrapper">
                            <img src={UpArrow} />
                        </div>
                        <div className="choose">
                            <div className="option-wrapper">
                                <Button onClick = {() => this.setState({picker: "size"})} className="type" >
                                    <p>SIZE</p>
                                </Button>
                                {picker == "size" ? (
                                    <div className="option">
                                        <p> {size[properties.size]} </p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="option-wrapper">
                                <Button onClick = {() => this.setState({picker: "2side"})} className="type" >
                                    <p>2-SIDED</p>
                                </Button>
                                {picker == "2side" ? (
                                    <div className="option">
                                        <p> {properties.TwoSide ? "YES" : "NO"} </p>
                                    </div>
                                ) : null}
                            </div>
                            <div className="option-wrapper">
                                <Button onClick = {() => this.setState({picker: "color"})} className="type" >
                                    <p>COLOR</p>
                                </Button>
                                {picker == "color" ? (
                                    <div className="option">
                                        <p>{properties.Color ? "YES" : "NO"}</p>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="img-wrapper">
                            <img src={DownArrow} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderOrder3 = () => {
        
        const {me} = this.props;
        const {state} = this.state;
        console.log(this.props);
        return (
            <div id="order3-cont">
                { state == 4 ? (
                    <div className="middle-32">
                        <div className="title">
                            <p>Preview file</p>
                        </div>
                        <div className="pdf-wrapper">
                            <embed src={this.state.fileSource} className="pdf-view"/>
                        </div>
                        {/* <div className="choose">
                            <div className="arrow-wrapper left-arrow">
                                <img src={LeftA}></img>
                            </div>
                            <div className="page-wrapper">
                                <p>Page 1 of 10</p>
                            </div>
                            <div className="arrow-wrapper right-arrow">
                                <img src={RightA}></img>
                            </div>
                        </div> */}
                    </div>
                ) : state == 3 ? (
                    <div className="middle-3">
                        <div className="title">
                            <p>Upload your files</p>
                        </div>
                        <div className="img-wrapper">
                            <input type="file" onChange={this.onFileChange} className="file-wrapper" id="#filechooser" />
                            {this.state.filePath == "" ? (
                                <img src={UploadFile} />
                            ) : (
                                <img src={UploadFinish} />
                            )}
                        </div>
                        <div className="notify-wrapper">
                            {this.state.filePath == "" ? (
                                <p>UPLOAD FILE</p>
                            ) : (
                            <p>{this.state.filePath}</p>
                            )}
                        </div>
                        <div className="choose">
                            <p>Wait too long? Upload PDF Files for faster processing</p>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }

    onChangeHour1 = (event) => {
        if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "") {
            event.target.value = "2";
        } else {
            if (this.state.date1 == time.toString()[8] && this.state.date2 == time.toString()[9] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1]) {
                if (event.target.value < time.toString()[16] && event.target.value != "") {
                    event.target.value = time.toString()[16];
                }
            }
        }
        if (event.target.value == 2 && this.state.hour2 > "3") {
            this.setState({
                hour2: "3"
            })
        }
        this.setState({
            hour1: event.target.value
        })
    }

    onChangeHour2 = (event) => {
        if (this.state.hour1 == "2") {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "") {
                event.target.value = "3";
            } else {
                if (this.state.date1 == time.toString()[8] && this.state.date2 == time.toString()[9] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1] && this.state.hour1 == time.toString()[16]) {
                    if (event.target.value < time.toString()[17] && event.target.value != "") {
                        event.target.value = time.toString()[17];
                    }
                }
            }
        } else {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "4" && event.target.value != "5" && event.target.value != "6" && event.target.value != "7" && event.target.value != "8" && event.target.value != "9" && event.target.value != "") {
                event.target.value = "9";
            } else {
                if (this.state.date1 == time.toString()[8] && this.state.date2 == time.toString()[9] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1] && this.state.hour1 == time.toString()[16]) {
                    if (event.target.value < time.toString()[17] && event.target.value != "") {
                        event.target.value = time.toString()[17];
                    }
                }
            }
        }
        this.setState({
            hour2: event.target.value
        })
    }

    onChangeMinute1 = (event) => {
        if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "4" && event.target.value != "5" && event.target.value != "6" && event.target.value != "") {
            event.target.value = "6";
        } else {
            if (this.state.date1 == time.toString()[8] && this.state.date2 == time.toString()[9] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1] && this.state.hour1 == time.toString()[16] && this.state.hour2 == time.toString()[17]) {
                if (event.target.value < time.toString()[19] && event.target.value != "") {
                    event.target.value = time.toString()[19];
                }
            }
        }
        if (event.target.value == "6") {
            this.setState({
                minute2: "0"
            })
        }
        this.setState({
            minute1: event.target.value
        })
    }

    onChangeMinute2 = (event) => {
        if (this.state.minute1 == "6") {
            if (event.target.value != "0" && event.target.value != "") {
                event.target.value = "0"
            }
        } else {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "4" && event.target.value != "5" && event.target.value != "6" && event.target.value != "7" && event.target.value != "8" && event.target.value != "9" && event.target.value != "") {
                event.target.value = "9";
            } else {
                if (this.state.date1 == time.toString()[8] && this.state.date2 == time.toString()[9] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1] && this.state.hour1 == time.toString()[16] && this.state.hour2 == time.toString()[17] && this.state.minute1 == time.toString()[19]) {
                    if (event.target.value < time.toString()[20] && event.target.value != "") {
                        event.target.value = time.toString()[20];
                    }
                }
            }
        }
        this.setState({
            minute2: event.target.value
        })
    }

    onChangeDate1 = (event) => {
        if (this.state.month1 + this.state.month2 == "02") {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "") {
                event.target.value = "2";
            } else {
                if (this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1]) {
                    if (event.target.value < time.toString()[8] && event.target.value != "") {
                        event.target.value = time.toString()[8];
                    }
                }
            }
        } else {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "") {
                event.target.value = "3";
            } else {
                if (this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1]) {
                    if (event.target.value < time.toString()[8] && event.target.value != "") {
                        event.target.value = time.toString()[8];
                    }
                }
            }
        }
        if (event.target.value == "3") {
            if (this.state.month1 + this.state.month2 == "01" || this.state.month1 + this.state.month2 == "03" || this.state.month1 + this.state.month2 == "05" || this.state.month1 + this.state.month2 == "07" || this.state.month1 + this.state.month2 == "08" || this.state.month1 + this.state.month2 == "10" || this.state.month1 + this.state.month2 == "12" &&  this.state.date2 > 1) {
                this.setState({
                    date2: "1"
                })
            } else {
                this.setState({
                    date2: "0"
                })
            }
        } else if (event.target.value == time.toString()[8] && this.state.month1 == this.getFormattedDate()[0] && this.state.month2 == this.getFormattedDate()[1] && this.state.date2 < time.toString()[9]) {
            this.setState({
                date2: time.toString()[9]
            })
        }
        this.setState({
            date1: event.target.value
        })
    }

    onChangeDate2 = (event) => {
        if (this.state.date1 == "3") {
            if (this.state.month1 + this.state.month2 == "01" || this.state.month1 + this.state.month2 == "03" || this.state.month1 + this.state.month2 == "05" || this.state.month1 + this.state.month2 == "07" || this.state.month1 + this.state.month2 == "08" || this.state.month1 + this.state.month2 == "10" || this.state.month1 + this.state.month2 == "12"){
                if (event.target.value != "1" && event.target.value != "0" && event.target.value != "") {
                    event.target.value = "1";
                } else {
                    if (this.state.month1 + this.state.month2 == this.getFormattedDate()[0] + this.getFormattedDate()[1] && this.state.date1 == time.toString()[8]) {
                        if (event.target.value < time.toString()[9] && event.target.value != "") {
                            event.target.value = time.toString()[9]
                        }
                    }
                }
            } else {
                if (event.target.value != "0" && event.target.value != "") {
                    event.target.value = "0";
                } else {
                    if (this.state.month1 + this.state.month2 == this.getFormattedDate()[0] + this.getFormattedDate()[1] && this.state.date1 == time.toString()[8]) {
                        if (event.target.value < time.toString()[9] && event.target.value != "") {
                            event.target.value = time.toString()[9]
                        }
                    }
                }
            }
        } else {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "4" && event.target.value != "5" && event.target.value != "6" && event.target.value != "7" && event.target.value != "8" && event.target.value != "9" && event.target.value != "") {
                event.target.value = "9";
            } else {
                if (this.state.month1 + this.state.month2 == this.getFormattedDate()[0] + this.getFormattedDate()[1] && this.state.date1 == time.toString()[8]) {
                    if (event.target.value < time.toString()[9] && event.target.value != "") {
                        event.target.value = time.toString()[9]
                    }
                }
            }
        }
        this.setState({
            date2: event.target.value
        })
    }

    onChangeMonth1 = (event) => {
        if (event.target.value != "1" && event.target.value != "0" && event.target.value != "") {
            event.target.value = "1";
        } else {
            if (event.target.value < this.state.month1 && event.target.value != "") {
                event.target.value = "1";
            }
        }
        if (event.target.value == "1" && this.state.month2 > "2") {
            this.setState({
                month2: "2"
            })
        } else if (event.target.value == "0" && this.state.month2 < this.getFormattedDate()[1]) {
            this.setState({
                month2: this.getFormattedDate()[1]
            })
        }
        this.setState({
            month1: event.target.value
        })
    }

    onChangeMonth2 = (event) => {
        if (this.state.month1 == "0") {
            if (event.target.value != "1" && event.target.value != "0" && event.target.value != "2" && event.target.value != "3" && event.target.value != "4" && event.target.value != "5" && event.target.value != "6" && event.target.value != "7" && event.target.value != "8" && event.target.value != "9" && event.target.value != "") {
                event.target.value = "9";
            } else {
                if (event.target.value < this.getFormattedDate()[1] && event.target.value != "") {
                    event.target.value = this.getFormattedDate()[1];
                }
            }
        } else if (this.state.month1 == "1") {
            if (event.target.value != "1" && event.target.value != "2"  && event.target.value != "") {
                    event.target.value = "2";
            } else {
                if (this.state.month1 == this.getFormattedDate()[0]) {
                    if (event.target.value < this.getFormattedDate()[1] && event.target.value != "") {
                        event.target.value = this.getFormattedDate()[1];
                    }
                }
            }
        }
        this.setState({
            month2: event.target.value
        })
    }

    finish = () => {
        const {documentActions, notificationActions, switchingActions, loadingActions} = this.props;
        loadingActions.show();
        documentActions.confirmPDF(this.state.printer, this.state.document).then(res => {
            loadingActions.hide()
            notificationActions.show("Hi there, thank you for choosing SimpleDoc.", "Your ordering is done!");
            switchingActions.home()
        }).catch(rej => {
            console.log("Confirm PDF error")
        })
    }

    renderOrder4 = () => {
        const {state} = this.state;
        const {printer} = this.props;
        console.log("Available printer: ", printer)
        return (
            <div id="order4-cont">
                { state == 5 ? (
                    <div className="middle-4">
                        <div className="title">
                            <p>Choose time to get</p>
                        </div>
                        <div className="time-wrapper">
                            <form className="wrapper time">
                                <div className="text-wrapper">
                                    <p>at</p>
                                </div>
                                <input id="hour1" type="text" value={this.state.hour1} onChange={this.onChangeHour1 } maxLength={1}/>
                                <input id="hour2" type="text" value={this.state.hour2} onChange={this.onChangeHour2} maxLength={1}/>
                                <div className="symbol-wrapper">
                                    <p>:</p>
                                </div>
                                <input id="minute1" type="text" value={this.state.minute1} onChange={this.onChangeMinute1} maxLength={1}/>
                                <input id="minute2" type="text" value={this.state.minute2} onChange={this.onChangeMinute2} maxLength={1}/>
                            </form>
                            <form className="wrapper">
                                <div className="text-wrapper">
                                    <p>on</p>
                                </div>
                                <input id="date1" type="text" value={this.state.date1} onChange={this.onChangeDate1} maxLength={1}/>
                                <input id="date2" type="text" value={this.state.date2} onChange={this.onChangeDate2} maxLength={1}/>
                                <div className="symbol-wrapper">
                                    <p>/</p>
                                </div>
                                <input id="month1" type="text" value={this.state.month1} onChange={this.onChangeMonth1} maxLength={1}/>
                                <input id="month2" type="text" value={this.state.month2} onChange={this.onChangeMonth2} maxLength={1}/>
                            </form>
                        </div>
                    </div>
                ) : state == 6 ? (
                    <div className="middle-4">
                        <div className="title">
                            <p>Choose your printer</p>
                        </div>
                        <div className="printer-option-wrapper">
                            <div className="category-wrapper">
                                <div className="category">
                                    <p>Sort with</p>
                                </div>
                                <div onClick={() => this.setState({printerType: "location"})} className={this.state.printerType == "location" ? "category chosen" : "category"}>
                                    <p>LOCATION</p>
                                </div>
                                <div onClick={() => this.setState({printerType: "price"})} className={this.state.printerType == "price" ? "category chosen" : "category"}>
                                    <p>PRICE</p>
                                </div>
                                <div onClick={() => this.setState({printerType: "stars"})} className={this.state.printerType == "stars" ? "category chosen" : "category"}>
                                    <p>STARS</p>
                                </div>
                            </div>
                            <div className="option-wrapper">
                                {
                                    printer.availablePrinter.availableStation.map((option) => {
                                        return (
                                            <div onClick={() => {
                                                this.setState({printer: option._id, document: printer.availablePrinter.documentId})
                                            }} className={this.state.printer == option._id ? "printer-wrapper chosen" : "printer-wrapper"}>
                                                <div className="img-wrapper">
                                                    <img src={PrinterImg} />
                                                </div>
                                                <div className="content-wrapper">
                                                    <div className="name-wrapper">
                                                        <div className={this.state.printer == option ? "name chosen" : "name"}>
                                                            <p>{option.name}</p>
                                                        </div>
                                                        <div className="star">
                                                            <img src={Star} />
                                                            <div className={this.state.printer == option ? "number chosen" : "number"}>
                                                                <p>5</p>
                                                            </div>
                                                        </div>
                                                        <div className="price">
                                                            <p> {
                                                                printer.availablePrinter.cost
                                                            } <span className="unit"> vnđ</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="address-wrapper">
                                                        <div className={this.state.printer == option ? "address chosen" : "address"}>
                                                            <p>{option.address}</p>
                                                        </div>
                                                        <div className={this.state.printer == option ? "distance chosen" : "distance"}>
                                                            <p>{option.dist.calculated < 1000 ? option.dist.calculated + " " + "m" : Math.round(option.dist.calculated/1000) + " " + "km"}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="location-wrapper">
                                <div className="location">
                                    <p>Near</p>
                                </div>
                                <div onClick={() => this.setState({printerLocation: "university"})} className={this.state.printerLocation == "university" ? "location chosen" : "location"}>
                                    <p>UNIVERSITY</p>
                                </div>
                                <div onClick={() => this.setState({printerLocation: "home"})} className={this.state.printerLocation == "home" ? "location chosen" : "location"}>
                                    <p>HOME</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}   
            </div>
        )
    }

    renderOrder5 = () => {
        console.log("Printer: ", this.state.printer)
        console.log("Document: ", this.state.document)
        const {state} = this.state
        return (
            <div id="order5-cont">
                {state == 7 ? (
                    <div className="middle-5">
                        <div className="title">
                            <p>Discount Code</p>
                        </div>
                        <div className="discount-button">
                            <input type="button" value="none" />
                        </div>
                        <div className="get-one">
                            <p>Get one here</p>
                        </div>
                        <div className="last-step">
                            <p>That's it, the last step</p>
                        </div>
                    </div>
                ) : state == 8 ? (
                        <div className="middle-5">
                            <div className="title">
                                <p>Online Payment for <span className="cost">3.200 <span className="unit">vnđ</span></span></p>
                            </div>
                            <div className="qr-wrapper">
                                <div className="code">
                                    <img src={Payment}></img>
                                </div>
                                <div className="momo">
                                    <img src={Momo}></img>
                                </div>
                            </div>
                            <div className="last-step">
                                <p>That's it, the last step</p>
                            </div>
                        </div>
                    ) : null}
            </div>
        )
    }

    renderRightArrow = () => {
        const {document, documentActions, printerActions, loadingActions} = this.props;
        const {state, filePath, fileData, printer} = this.state;
        if (state == 3) {
            if (filePath == "") {
                return (
                    <img src={DisableArrow} className="img"/>
                )
            }
            return (
                <img src={RightArrow} onClick = {() => {
                    documentActions.uploadPDF(fileData).then(res => {
                        console.log("Upload success")
                        this.setState({
                            fileSource: API_URL + res.message.path
                        })
                        console.log(this.state.fileSource)
                        this.setState({state: state + 1})
                    }).catch(rej => {
                        console.log("Upload fail")
                    })
                }} className="img"></img>
            )
        } else if (state == 5) {
            if (this.state.month1 == "" || this.state.month2 == "" || this.state.date1 == "" || this.state.date2 == "" || this.state.hour1 == "" || this.state.hour2 == "" || this.state.minute1 == "" || this.state.minute2 == "") return <img src={DisableArrow} className="img"/>
            if (this.convertToMiliseconds() < time.getTime()) return <img src={DisableArrow} className="img"/>
            else {
                return (
                    <img src={RightArrow} onClick = {() => {
                        loadingActions.show();
                        printerActions.getAvailablePrinter(fileData, this.state.lng, this.state.lat, this.convertToMiliseconds()).then(res => {
                            console.log("Get available Printer success")
                            loadingActions.hide()
                            this.setState({state: state + 1})
                        }).catch(rej => {
                            console.log("Get available printer error")
                        })

                    }} className="img"></img>
                )
            }
        } else if (state == 6) {
            if (printer == null) return <img src={DisableArrow} className="img"/>
        }
        if (state < 8) {
            return (
                <img src={RightArrow} onClick = {() => {this.setState({state: state + 1})}} className="img"></img>
            )
        } else {
            return null;
        }
    }

    render() {
        console.log(this.props)
        console.log(this.state.lng, " and ", this.state.lat);
        const {document, documentActions, printerActions} = this.props;
        const {state, choose, filePath, fileData} = this.state;
        if (state == 8) setTimeout(() => this.setState({state: state + 1}), 5000);
        return (
            <div className="container" id= "orderscreen"  >
                <Modal  styles= {{backgroundColor: 'rgba(0,0,0,0)', boxShadow:'rgba(0,0,0,0)'}} className ="success" id = "model" visible={this.state.visible} width="60%" height="60%" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <img id="success-img" src={PaymentSuc}></img>
                </Modal>
                <div className="title">
                    <p className="wrapper">
                        Simple<span className="doc">Doc</span>.<span className="customer">customer</span>
                    </p>
                </div>
                <div className="main">
                    <div className = "section-1">
                        <div className="arrow">
                            {state != 1 ? (
                                <div className="btn">
                                    <img src={LeftArrow} onClick = {() => {this.setState({state: state - 1})}} className="img"></img>
                                </div>
                            ) : null}
                        </div>
                        <div className="center">
                            {state == 1 ? this.renderOrder1() : null}
                            {state == 2 ? this.renderOrder2() : null}
                            {(state == 3 || state == 4) ? this.renderOrder3() : null}
                            {(state == 5 || state == 6) ? this.renderOrder4() : null}
                            {(state == 7 || state == 8) ? this.renderOrder5() : null}
                            {state == 9 ? this.finish() : null}
                        </div>
                        <div className="arrow">
                            {choose == "document" ? (
                                <div disabled={true} className="btn">
                                    {this.renderRightArrow()}
                                </div>
                            ) : <img src={DisableArrow} />} 
                        </div>
                    </div>
                    <div className = "section-2">
                        <div className="nav">
                            <div className={state == 1 ? "item active" : "item in-active"}></div>
                            <div className={state == 2 ? "item active" : "item in-active"}></div>
                            <div className={(state == 3 || state == 4) ? "item active" : "item in-active"}></div>
                            <div className={(state == 5 || state == 6) ? "item active" : "item in-active"}></div>
                            <div className={(state == 7 || state == 8) ? "item active" : "item in-active"}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({document: state.document, me: state.me, printer: state.printer}),
    dispatch => channingActions({}, dispatch, bindSwitchingActions, bindDocumentActions, bindPrinterActions, bindToastNotificationActions, bindLoadingActions)
  )(Order)
