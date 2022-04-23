import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router-dom';

// Layout Components
import Topbar from './Topbar';

// Scroll up button
import { TinyButton as ScrollUpButton } from "react-scroll-up-button";
const NavbarPage = React.lazy(() => import('../../pages/Home/NavbarPage'));

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    // document.getElementById("pageLoader").style.display = "block";
    // setTimeout(function () { document.getElementById("pageLoader").style.display = "none"; }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <Suspense>
          <NavbarPage/>
          {this.props.children}
        
        </Suspense>
      </React.Fragment>
    );
  }
}

export default withRouter(Layout);
