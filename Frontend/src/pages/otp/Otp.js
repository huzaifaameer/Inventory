import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import Service from "../../Api";
import Loader from "../../components/Loader";
import Swal from "sweetalert2";

function Otp(){
    const [ otp, setOtp ] = useState("");
    const [ isLoader, setIsLoader ] = useState(false);

    const [redirectToProvider, setRedirectToProvider] = useState(false);
    const email = localStorage.getItem("email");
    const handleSubmit = e => {
        e.preventDefault();
        const payload = {
            email:email,
            otp:otp
        }
        setIsLoader(true);
        Service.verifyOtp(payload).then(res=>{

            console.log(res);
            setIsLoader(false);
            if(res.statusCode === 200){
                localStorage.removeItem("email");
                localStorage.setItem("auth", res.data.authToken);
                // Redirect to dashboard because user is now signed in
                setRedirectToProvider(true);
            }
            else{
                Swal.fire(
                    "Error",
                    "Invalid OTP",
                    "error"
                );
            }

        }).catch(err=>{
            setIsLoader(false);
            Swal.fire(
                "Error",
                "Invalid OTP",
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
                redirectToProvider &&(
                    <Navigate to="/dashboard"/>
                )
            }
            <div className="container screen-center">
                <div class="card m-width" style={{textAlign:"center"}}>
                    <div className="card-body">
                        <h5 class="mb-3 normal">We have sent an OTP to your email.</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <input style={{textAlign:"center", width:"50%"}} type="text" placeholder="Enter OTP here" className="form-control" onChange={e=>setOtp(e.target.value)}/>
                            </div>
                            <div className="form-group mb-2">
                                <button className="btn btn-pr" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default Otp;