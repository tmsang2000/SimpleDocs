// React basic and bootstrap
import React, { Component } from 'react';
import AOS from 'aos'; 
import '../../../node_modules/aos/dist/aos.css'; 

// Scroll up button
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";

// Import css
// import './scss/demo.scss';

// Import sub components
import Introduction from './Introduction';
// import Demo from './Demo';
import Feature from './Feature';
import Contact from './Contact';
import Footer from './Footer';
import {ClientEventSystem} from '../../client-events/index'

class IndexRoot extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        AOS.init(); 
    }

    componentDidCatch() {
        console.log("Catch");
    }

    componentWillMount() {
        console.log("Catch");
    }

    componentDidMount() {
        console.log("Catch");
    }

    componentDidMount() {
        //Refresh Aos Animation whenever components will render
        ClientEventSystem.connectToServer("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVlYjE0Y2E1NmZmNDYzMjRlNDE4NGYzZiIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE1OTA5MzkwMzgsImV4cCI6MTU5OTU3OTAzOH0.T35ZhEtbVpv7q0Kv-ClBgJoIxsfYNA7v9KKQqcpez1Y");


        AOS.refresh(); 

        document.body.classList = "";
        window.addEventListener("scroll", this.scrollNavigation, true);

        var elements=document.getElementsByName("contact");
        for(var j=0; j<elements.length; j++){
            elements[j].setAttribute("data-aos", "fade-up");
            elements[j].setAttribute("data-aos-duration", "1800");
        }

        elements=document.getElementsByName("feature");
        for(var j=0; j<elements.length; j++){
            elements[j].setAttribute("data-aos", "fade-up");
            elements[j].setAttribute("data-aos-duration", "1800");
        }

      }

    // componentDidMount() {
    //     document.getElementById("pageLoader").style.display = "block";
    //     setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 1000);
    // }
    componentWillUnmount() {
        window.removeEventListener("scroll",this.scrollNavigation, true);
     }
  
      scrollNavigation = () => {
          var doc = document.documentElement;
          var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
          if(top > 80)
          {
               document.getElementById('topnav').classList.add('nav-sticky');
          }
          else
          {
            document.getElementById('topnav').classList.remove('nav-sticky');
          }
      }

    render() {
        return (
            <React.Fragment>

                <div id="introduction">

                <Introduction />

                </div>
                <div id="features">
                    <Feature />

                </div>
                <div id="contact">

                <Contact />
                </div>
                {/* <Footer /> */}

                {/* <ScrollUpButton ContainerClassName="back-to-top rounded text-center"  /> */}

                <div id="bottomIcon">
                    <ScrollUpButton className="bottomIcon"/>
                </div>


            </React.Fragment>
        );
    }
}

export default IndexRoot;




