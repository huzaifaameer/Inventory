import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import { isLogged } from "../common/Auth";

const  AdminRoute = () => {
    const auth = isLogged();
    if(auth){
        return <Layout className="Test classname"><Outlet/></Layout>
    }
    else{
        Swal.fire(
            "Permission error",
            "You need admin privilege to view this page.",
            "error"
        )
        return <Navigate to="/login"/>
    }
}

export default AdminRoute;