import React, { useState } from "react";
import Swal from "sweetalert2";
import Service from "../../Api";
import { Navigate } from "react-router-dom";
import Loader from "../../components/Loader";

function Login(){

    const [ email, setEmail ] = useState("huzaifaameer1@gmail.com");
    const [ password, setPassword ] = useState("Test@123");
    const [redirectToProvider, setRedirectToProvider] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            email:email,
            password:password
        }
        setIsLoader(true);
        Service.login(payload).then(res=>{
            setIsLoader(false);
            if(res.statusCode === 200){
                localStorage.setItem("email", res.data.email);
                setRedirectToProvider(true);
            }
            else{
                Swal.fire(
                    "Error",
                    "User does not exist",
                    "error"
                );
            }
        }).catch(err=>{
            setIsLoader(false);
            Swal.fire(
                "Error",
                "User does not exist",
                "error"
            );
        })
    }
    return(
        <>
        {
            isLoader && (
                <Loader/>
            )
        }
        {
            redirectToProvider ? <Navigate to="/otp"/>
            :
            <div className="container screen-center">
                <div class="card m-width" style={{textAlign:"center"}}>
                    <div className="card-body">
                        <h5 class="mb-3 normal">Log in</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <input style={{width:"50%"}} type="text" placeholder="Email" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="form-group mb-2">
                                <input style={{width:"50%"}} type="password" placeholder="Password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="form-group mb-2">
                                <button className="btn btn-pr" onClick={handleSubmit}>Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        }
        </>
    );
}

export default Login;