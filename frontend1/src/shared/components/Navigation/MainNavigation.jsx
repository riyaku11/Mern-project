import React from "react";

import Backdrop from "../UIelements/Backdrop";
import SideDrawer from "./SideDrawer";
import Navlinks from "./Navlinks";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
import MainHeader from "./MainHeader"
import { useState } from "react";

const MainNavigation = (props) =>{

    const [drawerIsOpen, setdrawerIsOpen] = useState(false);
    const openDrawerHandler=()=>{
        setdrawerIsOpen(true);
    }
    const closeDrawerHandler=()=>{
setdrawerIsOpen(false);

    }

return (
    <>
{drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>}    
<SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
<nav className="main-navigation__drawer-nav">
    <Navlinks/>
</nav>
</SideDrawer> 

<MainHeader>
<button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
    <span/>
    <span/>
    <span/>
</button>
<h1 className="main-navigation__title">
   <Link to="/"> Your Places</Link>
</h1>
<nav className="main-navigation__header-nav"> 
<Navlinks/>

</nav>
</MainHeader>
</>
);

}

export default MainNavigation;