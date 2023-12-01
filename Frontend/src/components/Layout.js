import React from "react";
import "./Layout.css"
import Sidebar from "./Sidebar";
import Main from "./Main";

function Layout(props){
    return(
        <div className="layout">
            <Sidebar/>
            <Main>
                {props.children}
            </Main>
        </div>
    )
}

export default Layout;