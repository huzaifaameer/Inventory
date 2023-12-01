import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { isLogged } from "../common/Auth";

const  PublicRoute = () => {
    const auth = isLogged();
    return auth ?  <Navigate to="/dashboard"/> : <Outlet/>
}

export default PublicRoute;