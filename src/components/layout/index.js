import React from 'react';
import SideBar from './sideBar';
import TopBar from './topBar';
import './style.css';

const Layout = ({children}) => {
    return (
        <div className="layout">
            <TopBar />
            <div className="d-flex container-fluid p-0">
            {/* <div className="sidebarContainer"> */}
            <SideBar />
            {/* </div> */}
            <div className="wrapper">
            {children}
            </div>
            </div>
        </div>
    );
}

export default Layout;
