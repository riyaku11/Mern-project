import React from "react";

// import { ReactDOM } from "react";
import {CSSTransition} from 'react-transition-group'
import "./SideDrawer.css"

const SideDrawer = (props) =>{

    return(<CSSTransition in={props.show} timeout={200} classNames='slide-in-left' mountOnEnter unmountOnExit>
        <aside className="side-drawer" onClick={props.onClick}>
           {props.children}
       </aside>
       </CSSTransition>); 
    // return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));

}

export default SideDrawer;