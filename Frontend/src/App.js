import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublinRoute";
import { GetLocalStorageItem } from "./common/LocalStorageHelper";

// Importing pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Otp from "./pages/otp/Otp";
import Dashboard from "./pages/dashboard/Dashboard";
import Inventory from "./pages/inventory/Inventory";
import AddInventory from "./pages/inventory/AddInventory";
import UpdateInventory from "./pages/inventory/UpdateInventory";
import ComingSoon from "./pages/coming-soon/ComingSoon";


function App() {
  function persistLocalStorageValues(){
    const properties = localStorage.getItem("properties");
    if(properties){
      const primaryColor = GetLocalStorageItem("--clr-pr");
      const primaryColorLight = GetLocalStorageItem("--clr-pr-light");
      const secondaryColor = GetLocalStorageItem("--clr-sc");
      const secondaryColorLight = GetLocalStorageItem("--clr-sc-light");
      const theme = GetLocalStorageItem("theme");
      const html = document.querySelector("html");
      if(html){
        html.style.setProperty("--clr-pr", primaryColor);
        html.style.setProperty("--clr-pr-light", primaryColorLight);
        html.style.setProperty("--clr-sc", secondaryColor);
        html.style.setProperty("--clr-sc-light", secondaryColorLight);
        html.classList.add(theme);
      }
    }
    else{
      const properties = {
        "--clr-pr":"#ff69eb",
        "--clr-sc":"#a955f7",
        "theme":"light",
        "sideBarActiveLink":"dashboard"
      }
      localStorage.setItem("properties", JSON.stringify(properties))
    }
  }
  useEffect(()=>{
    persistLocalStorageValues();
  },)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/" element={<AdminRoute/>}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/inventory" element={<Inventory />}/>
          <Route path="/addinventory" element={<AddInventory />}/>
          <Route path="/getinventory/:inventoryId" element={<UpdateInventory />}/>
          <Route path="/comingsoon" element={<ComingSoon />}/>
        </Route>
        <Route path="" element={<PublicRoute/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
