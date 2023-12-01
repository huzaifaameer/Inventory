import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { GetLocalStorageItem, SetLocalStorageItem } from "../common/LocalStorageHelper";

function Sidebar(){
    const [ activeLink, setActiveLink ] = useState("");
    useEffect(()=>{
        persistLocalStorageValues();
    },[])

    function persistLocalStorageValues(){
        const activeLink = GetLocalStorageItem("sideBarActiveLink");
        setActiveLink(activeLink);
    }
    const changeColor = type => e => {
        e.preventDefault();
        SetLocalStorageItem(type, e.target.style.color);
        const html = document.querySelector("html");
        if(html){
            html.style.setProperty(type, e.target.style.color)
        }
    }
    const changeTheme = () => {
        const currentTheme = GetLocalStorageItem("theme");
        if(currentTheme === "light"){
            SetLocalStorageItem("theme", "dark");
            const html = document.querySelector("html");
            if(html){
                html.classList.remove("light");
                html.classList.add("dark");
            }
        }
        else if(currentTheme === "dark"){
            SetLocalStorageItem("theme", "light");
            const html = document.querySelector("html");
            if(html){
                html.classList.remove("dark");
                html.classList.add("light");
            }
        }
    }
    const linkHandler = value => e => {
        SetLocalStorageItem("sideBarActiveLink", value);
        setActiveLink(value);
    }
    return(
        <div className="sidebar">
            <div className="sidebar-logo">
                <h3 className="light">Inventory</h3>
            </div>
            <ul className="sidebar-links">
                <li>
                    <Link to="/dashboard" className={`sidebar-link ${activeLink === "dashboard" ? "active" : ""}`} onClick={linkHandler("dashboard")}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/inventory" className={`sidebar-link ${activeLink === "inventory" ? "active" : ""}`} onClick={linkHandler("inventory")}>Inventory</Link>
                </li>
                <li>
                    <Link to="/addinventory" className={`sidebar-link ${activeLink === "addinventory" ? "active" : ""}`} onClick={linkHandler("addinventory")}>Add Inventory</Link>
                </li>
                <li>
                    <Link to="/comingsoon" className={`sidebar-link ${activeLink === "comingsoon" ? "active" : ""}`} onClick={linkHandler("comingsoon")}>Coming soon</Link>
                </li>
                <li>
                    <Link to="/comingsoon" className={`sidebar-link ${activeLink === "comingsoon" ? "active" : ""}`} onClick={linkHandler("comingsoon")}>Reports</Link>
                </li>
                <li>
                    <Link to="/comingsoon" className={`sidebar-link ${activeLink === "comingsoon" ? "active" : ""}`} onClick={linkHandler("comingsoon")}>Sales</Link>
                </li>
                <li>
                    <Link to="/login" className={`sidebar-link ${activeLink === "login" ? "active" : ""}`} onClick={linkHandler("login")}>Users</Link>
                </li>
            </ul>
            <div className="sidebar-theme-colors-wrap">
                <div className="sidebar-theme-colors mb-2">
                    <div className="theme-switch-key">Mode</div>
                    <button className={`theme-switcher ${GetLocalStorageItem("theme")}`} onClick={changeTheme}>
                        <span className="material-symbols-outlined dark">dark_mode</span>
                        <span className="material-symbols-outlined light">light_mode</span>
                    </button>
                </div>
                <div className="sidebar-theme-colors">
                    <div className="theme-switch-key">Primary</div>
                    <button className="theme-switch-value" style={{color:"#FF69EB"}} onClick={changeColor("--clr-pr")}></button>
                    <button className="theme-switch-value" style={{color:"#a955f7"}} onClick={changeColor("--clr-pr")}></button>
                    <button className="theme-switch-value" style={{color:"#d80707"}} onClick={changeColor("--clr-pr")}></button>
                    <button className="theme-switch-value" style={{color:"#d8d807"}} onClick={changeColor("--clr-pr")}></button>
                    <button className="theme-switch-value" style={{color:"#3dd807"}} onClick={changeColor("--clr-pr")}></button>
                    <button className="theme-switch-value" style={{color:"#07d8ab"}} onClick={changeColor("--clr-pr")}></button>
                </div>
                <div className="sidebar-theme-colors">
                    <div className="theme-switch-key">Primary light</div>
                    <button className="theme-switch-value" style={{color:"#ff9df2"}} onClick={changeColor("--clr-pr-light")}></button>
                    <button className="theme-switch-value" style={{color:"#cd96ff"}} onClick={changeColor("--clr-pr-light")}></button>
                    <button className="theme-switch-value" style={{color:"#ff5b5b"}} onClick={changeColor("--clr-pr-light")}></button>
                    <button className="theme-switch-value" style={{color:"#ffff9d"}} onClick={changeColor("--clr-pr-light")}></button>
                    <button className="theme-switch-value" style={{color:"#b5ff9c"}} onClick={changeColor("--clr-pr-light")}></button>
                    <button className="theme-switch-value" style={{color:"#9bffe9"}} onClick={changeColor("--clr-pr-light")}></button>
                </div>
                <div className="sidebar-theme-colors">
                    <div className="theme-switch-key">Secondary</div>
                    <button className="theme-switch-value" style={{color:"#FF69EB"}} onClick={changeColor("--clr-sc")}></button>
                    <button className="theme-switch-value" style={{color:"#a955f7"}} onClick={changeColor("--clr-sc")}></button>
                    <button className="theme-switch-value" style={{color:"#d80707"}} onClick={changeColor("--clr-sc")}></button>
                    <button className="theme-switch-value" style={{color:"#d8d807"}} onClick={changeColor("--clr-sc")}></button>
                    <button className="theme-switch-value" style={{color:"#3dd807"}} onClick={changeColor("--clr-sc")}></button>
                    <button className="theme-switch-value" style={{color:"#07d8ab"}} onClick={changeColor("--clr-sc")}></button>
                </div>
                <div className="sidebar-theme-colors">
                    <div className="theme-switch-key">Secondary light</div>
                    <button className="theme-switch-value" style={{color:"#ff9df2"}} onClick={changeColor("--clr-sc-light")}></button>
                    <button className="theme-switch-value" style={{color:"#cd96ff"}} onClick={changeColor("--clr-sc-light")}></button>
                    <button className="theme-switch-value" style={{color:"#ff5b5b"}} onClick={changeColor("--clr-sc-light")}></button>
                    <button className="theme-switch-value" style={{color:"#ffff9d"}} onClick={changeColor("--clr-sc-light")}></button>
                    <button className="theme-switch-value" style={{color:"#b5ff9c"}} onClick={changeColor("--clr-sc-light")}></button>
                    <button className="theme-switch-value" style={{color:"#9bffe9"}} onClick={changeColor("--clr-sc-light")}></button>
                </div>
            </div>
        </div>
    )
}
export default Sidebar;